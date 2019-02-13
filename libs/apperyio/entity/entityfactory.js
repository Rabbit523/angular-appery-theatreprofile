define( [
    'require', 'lodash', '$App/entity/typenotfounderror', '$App/entity/nomodelerror'
], function( require, _ ) {
    "use strict";

    /**
     * General algorithm: create hash object where
     *  - Key is any path inside model
     *  - Value isolated function which returns already prepared entity
     *
     * This implementation avalible inside app as `Apperyio.EntityAPI('{ModelName.path}')`
     *
     * Instance exdends `Apperyio` instance in `Apperyio.js`
     *     by implement integration interface in `sentity.js with app/services/model.js`
     *
     * User documentation: https://docs.appery.io/docs/appbuilder-ionic-model#section-model-api
     */

    function _type( model ) {
        return model && ( model.type || model.$ref );
    }

    var extend = _.extend, // older versions of lodash
        clone = _.clone,
        isArray = _.isArray,
        each = _.each,
        keys = _.keys,
        union = _.union,
        last = _.last,
        map = _.map,
        isObject = _.isObject,
        isFunction = _.isFunction,
        TypeNotFoundError = require( '$App/entity/typenotfounderror' ),
        NoModelError = require( '$App/entity/nomodelerror' ),

        // we supporting two syntaxes: `model.[i].property` and `model.[2].property`
        ARRAY_PATH_regex = /\[(i|\d+)\]/;

    /**
     * EntityFactory base constructor for Instances of Model provided as argument
     * @param {Object} models Models description
     */
    function EntityFactory( models ) {
        this.default_undefined = false;
        this.models = models || [];

        /**
         * Base types
         * @type {Object}
         */
        this._types = {
            "string": function( model ) {
                return ( model && model.default ) || ( this.default_undefined ? undefined : "" );
            },
            "data": function( model ) {
                return ( model && model.default ) || ( this.default_undefined ? undefined : "" );
            },
            "number": function( model ) {
                return parseInt((model && model.default) || 0, 10) || (this.default_undefined ? undefined : 0);

            },
            "boolean": function( model ) {
                var result = ( model && _.isBoolean(model.default) ) ? model.default : ( this.default_undefined ? undefined : false );
                if ( typeof result == "string" ) {
                    result = ( result.toLowerCase === "true" ) || ( result === "1" ) || ( parseInt(
                        result, 10 ) > 0 );
                } else if ( typeof result == "number" ) {
                    result = result > 0;
                }
                return result;
            },
            "object": function( model ) {
                var result = {};
                if ( model && model.properties ) {
                    for ( var key in model.properties ) {
                        result[ key ] = this._get( model.properties[ key ].type || model.properties[
                            key ].$ref, model.properties[ key ] );
                    }
                }
                return result;
            },
            "array": function( model ) {
                if ( !model ) {
                    return [];
                }

                var result = model[ 'default' ] || [];

                if ( isArray( model.items ) ) { // v2 version -- items is array
                    each( model.items, function( item ) {
                       if (typeof item.index == "number") {
                            // special model for item with concrete index
                            result[item.index] = this._get(_type(item) || 'string', item);
                        } else {
                            // general or default item in array,
                            // this model will be applied to all array items, except special indexed items
                            result.__entity = this._get.bind(this, (_type(item) || 'string'), item);
                        }
                    }, this );

                    // in case when we for some reason don't have general model for items
                    // we set it as `undefined`
                    if ( !result.__entity ) {
                        result.__entity = function() {
                            return undefined;
                        };
                    }
                } else if ( isObject( model.items ) ) { // v1 format - simple object for describing one model for items
                    // pregenerate type
                    this._get( _type( model.items ), model.items );

                    // create method for generating array items,
                    // useful on merge step with given defaults
                    result.__entity = this._get.bind( this, ( _type( model.items ) || 'string' ), model.items );
                }

                return result;
            },
            "null": function( model ) {
                return null;
            }
        };
    }

    EntityFactory.prototype = {
        /**
         * Retrieve instance of model specified by Name
         * @param  {String} name              Name of Model or Path to Model part
         * @param  {Object} defaults          Plain-object which will be merged to the instance
         * @param  {boolean} default_undefined If true, then any property in generated entity
         *                                     will be initialized by `undefined`, otherwise, by
         *                                     type specific empty value (0, "", false, {})
         * @param {boolean} skip_empty_objects  If true, then any empty property (empty arrays and objects 
         *                                      without properties that differs from `undefined`) 
         *                                      in generated entity will be set to `undefined`.
         * @return {Object}                   Instance of Model/Model part
         */
        get: function(name, defaults, default_undefined, skip_empty_objects) {
            var result = null;
            this.default_undefined = default_undefined || false;
            var isObjectDefaults = Object.prototype.toString.call( defaults ) === "[object Object]";
            if ( typeof defaults !== typeof undefined && !isObjectDefaults) {
                 result = defaults;
            } else {
                result = this._get( name );
                if ( isObjectDefaults ) {
                    result = this.__special_merge( result, defaults );
                }
                if (skip_empty_objects) {
                    result = this._skip_empty_objects(_.cloneDeep(result));
                }
            }
            return clone( result, true, function( v ) {
                if ( isArray( v ) ) {
                    var r = v.concat();
                    r.__entity = v.__entity;
                    return r;
                }
            }, this );
        },
        /**
         * Recursive merge default value to Model Instance considering case with One Item in Array from XML
         * @privat
         * @param  {Object} from_model
         * @param  {Object} defaults
         * @return {Object}
         */
        __special_merge: function( from_model, defaults ) {
            function merge( a, b ) {
                var result, tmp;
                if ( isObject( b ) ) {
                    each( union( keys( a ), keys( b ) ), function( k ) {
                        result = result || {};
                        if ( b.hasOwnProperty( k ) ) {
                            // restoring array items
                            if ( isArray( a[ k ] ) && a[ k ].hasOwnProperty( '__entity' ) ) {
                                result[ k ] = [];
                                var b_k = b[ k ];
                                // now we restoring array items,
                                // but if given default value is not an Array?
                                // We should wrap it into Array
                                if ( !isArray( b_k ) ) {
                                    b_k = [ b_k ];
                                }
                                // Process each item in array one by one for Arrays with specific model for some items
                                for ( var b_i = 0, b_len = b_k.length; b_i < b_len; b_i++ ) {
                                    tmp = a[ k ][ b_i ] === undefined ? a[ k ].__entity( b_i ) : clone( a[ k ][ b_i ] );
                                    if ( isArray( b_k[ b_i ] ) ) {
                                        result[ k ][ b_i ] = map( b_k[ b_i ], merge.bind( null, tmp ) );
                                    } else {
                                        result[ k ][ b_i ] = merge( tmp, b_k[ b_i ] );
                                    }
                                }

                            } else if ( isObject( a[ k ] ) ) {
                                result[ k ] = merge( a[ k ], b[ k ] );
                            } else {
                                result[ k ] = b[ k ];
                            }
                        } else {
                            result[ k ] = a[ k ];
                        }
                    } );
                }
                result = result || b;
                return result;
            }
            return merge( from_model, defaults );
        },

        /**
         * Recursive check if object/array has no nonempty values then change it to "undefined"
         * @privat
         * @param  {Object} model
         * @return {Object}
         */
        _skip_empty_objects: function( model ) {
            function isEmptyOblect( obj ) {
                if ( Object.prototype.toString.call( obj ) === "[object Object]" ) {
                    for ( var key in obj ) {
                        if (_.has( obj, key ) && obj[ key ] !== undefined && !isFunction( obj[ key ] )) {
                            return false;
                        }
                    }
                } else if ( isArray( obj ) ) {
                    for ( var i = 0, len = obj.length; i < len; i++ ) {
                        if (obj[ i ] !== undefined) {
                            return false;
                        }
                    }
                }
                return true;
            }
            var filterEmpty = function filterEmpty(data) {
                var objKeys = keys(data);
                for (var i = 0; i < objKeys.length; i++) {
                    if (isObject(data[objKeys[i]])) {
                        data[objKeys[i]] = filterEmpty(data[objKeys[i]]);
                    }
                }
                if (isObject(data) && isEmptyOblect(data)) {
                    return undefined;
                }
                return data;
            };
            return filterEmpty(model);
        },

        /**
         * Get hash name for specified name and get params
         * @privat
         * @param  {String} name Name of type
         * @return {Object}
         */
        _get_hash_name: function( name ) {
            return name + "/" + (!!this.default_undefined).toString();
        },

        /**
         * Internal retrieving Instance of Model
         * @privat
         * @param  {String} name Model name
         * @return {Object}
         */
        _get: function( name ) {
            var hashName = this._get_hash_name(name);
            if ( typeof this._types[ hashName ] == "function" ) {
                return this._types[ hashName ].apply( this, Array.prototype.slice.call( arguments, 1 ) );
            } if ( typeof this._types[ name ] == "function" ) {
                return this._types[ name ].apply( this, Array.prototype.slice.call( arguments, 1 ) );
            } else {
                try {
                    this._add( name );
                } catch ( e ) {
                    if ( e instanceof NoModelError ) {
                        throw new TypeNotFoundError( e.message );
                    }
                    throw e;
                }
                return this._types[ hashName ].apply( this, Array.prototype.slice.call( arguments, 1 ) );
            }
        },

        /**
         * Expand user dot-path to internal path format for part of Model
         * @privat
         * @param  {String} name Path or Name of Model
         * @return {Array}      internal formatted path
         */
        _expand_path: function( name ) {
            var new_path = [],
                m,
                path = name.split( '.' );
            new_path = [ path.shift() ];
            for ( var i = 0, l = path.length; i < l; i++ ) {
                m = ARRAY_PATH_regex.exec( path[ i ] );
                if ( isArray( m ) ) {
                    new_path.push( [ 'items', m[ 1 ] ] );
                } else {
                    new_path.push( 'properties' );
                    new_path.push( path[ i ] );
                }
            }
            return new_path;
        },

        /**
         * Internal method for adding new Models
         * @privat
         * @param {String} name Model name
         */
        _add: function( name ) {
            var path = [],
                model;
            if ( this.models[ name ] == undefined ) {
                if ( name.indexOf( '.' ) > -1 ) {
                    path = this._expand_path( name );
                    model = clone( this.models[ path.shift() ] );
                    var l = path.length;
                    var i = 0;
                    while ( i < l ) {
                        var item = path[ i ], j, jl;
                        if ( isArray( item ) && isArray( model.items ) ) { // new format of model

                            if ( parseInt( item[ 1 ], 10 ) == item[ 1 ] ) { // array index is number
                                for ( j = 0, jl = model.items.length; j < jl; j++ ) {
                                    if ( model.items[ j ].index == item[ 1 ] ) {
                                        model = model.items[ j ];
                                        i++;
                                        break;
                                    }
                                }
                            } else if ( item[ 1 ] == "i" ) { //searching for first element without `index` property
                                for ( j = 0, jl = model.items.length; j < jl; j++ ) {
                                    if ( !model.items[ j ].hasOwnProperty( 'index' ) ) {
                                        model = model.items[ j ];
                                        i++;
                                        break;
                                    }
                                }
                            }

                        } else {
                            if ( isArray( item ) ) { // old array format (as object) but after new path-converter
                                item = "items";
                            }
                            if ( model.hasOwnProperty( item ) ) {
                                model = model[ item ];
                                i++;
                            } else {
                                model = this.models[ _type( model ) ];
                                if ( typeof model == 'undefined' ) {
                                    throw new NoModelError( _type( model ) + ' not found' );
                                }
                            }
                        }
                    }
                } else {
                    throw new NoModelError( "Can't found `" + name + "` model" );
                }
            } else {
                model = this.models[ name ];
            }

            this.__add( name, model );
        },

        /**
         * Compile and add new Model
         * @privat
         * @param  {String} name  Model name
         * @param  {Object} model Model description
         */
        __add: function( name, model ) {
            this._types[ this._get_hash_name(name) ] = ( function( self, key, md ) {
                var result = null,
                    res = null;
                try {
                    result = ( function( v ) {
                        return function() {
                            return v;
                        };
                    } )( self._get( _type( md ), md ) );
                } catch ( e ) {
                    if ( e instanceof NoModelError ) {
                        result = self._add( key );
                    } else {
                        throw e;
                    }
                }
                return result;
            } )( this, name, model );
        }
    };

    return EntityFactory;
} );