/**
 * ApperyioProvider
 */
define( [ 'require', 'lodash', 'routes' ], function( require, _ ) {
    var routes = require( 'routes' );
    var extend = _.extend,
        clone = _.clone,
        forEach = each = _.each,
        isString = _.isString,
        isFunction = _.isFunction,
        isObject = _.isObject,
        isBoolean = _.isBoolean,
        isArray = _.isArray,
        map = _.map

    function Apperyio( $rootScope, $location, $injector, $q, $parse, $timeout /* other dependencies for extend base object*/ ) {
        function A() {};

        extend( A.prototype, {
           /**
             * Convert route name to URL
             * @param  {String} routeName
             * @param  {Object} options
             * @return {String}           URl for page
             */
            routeName2Url: function( routeName, options ) {
                var route_names = routes.route_names;

                if ( route_names.hasOwnProperty( routeName ) ) {
                    routeName = route_names[ routeName ];
                }
                if ( isObject( options ) ) {
                    each( options, function( v, k ) {
                        routeName = routeName.replace( ':' + k, v.toString() );
                    } );
                }

                routeName = routeName.replace( '*\\/', '/' )
                    .replace( '*\\', '' )
                    .replace( '*', '' )
                    .replace( '?', '' );
                return routeName;
            },

            /**
             * Navigate to route by name
             * @param  {String} routeName    [description]
             * @param  {Object} options [description]
             */
            navigateTo: function( routeName, options ) {
                $location.path( this.routeName2Url( routeName, options ) );
            },

            /**
             * Generate URL after parsing {template.entities} from system settings
             * @param  {String} template URL-template
             * @return {String}          URL-string
             */
            /**
             * Generate URL after running {template.entities} as function
             * @param  {Function} template URL-template function
             * @return {String}          URL-string
             */
            url: function( template /*, options*/ ) {
                var options = clone( arguments[ 1 ] || {}, true ),
                    R = /\{([\w\d_\$\.]+?)\}/,
                    m = [],
                    tmp = '',
                    getter, value;
                if ( this.Config ) {
                    options = extend( options, this.Config.all() );
                }
                if ( isFunction( template ) ) {
                    return template.call( this, options );
                }
                m = template.match( R );
                tmp = template;
                while ( m ) {
                    getter = $parse( m[ 1 ] );
                    if ( !_.isUndefined( value = getter( options ) ) ) {
                        template = template.replace( m[ 0 ], value );
                        tmp = template;
                    } else {
                        tmp = template.replace( m[ 0 ], m[ 0 ].replace( '}', '\t\t}' ) ); // mark processed bad expression
                        template = tmp.concat( '' );
                    }
                    m = tmp.match( R );
                }
                if ( value && value.toString() == template && [ 'number', 'boolean' ].indexOf( typeof value ) > -1 ) {
                    template = value;
                } else if ( typeof template == 'string' ) {
                    template = template.replace( /\t\t\}/g, '}' );
                }

                return template;
            },
            /**
             * Recursive parser for settings-objects. Invoke object properties and expand templates entries in value
             * @param  {Object} obj Settings object
             * @param  {Object} options OPTIONAL argument as additional dictionary for searching replaces
             * @return {Object}     Settings object
             */
            params_parse: function( obj /*, options*/ ) {
                var options = arguments[ 1 ] || {},
                    result = {},
                    that = this;
                if ( isString( obj ) || isFunction( obj ) ) {
                    return this.url( obj, options )
                }
                if ( isBoolean( obj ) || !isObject( obj ) ||
                    obj instanceof File || obj instanceof FileList || obj instanceof FormData ||
                    obj instanceof Blob || obj instanceof ArrayBuffer ) {
                    result = obj;
                } else {
                    if ( isArray( obj ) ) {
                        result = [];
                    }
                    forEach( obj, function( value, key ) {
                        result[ key ] = that.params_parse( value, options )
                    } );
                }
                return result;
            },

            /**
             * Just wrapper, reserved for future use
             *
             */
            log: function() {
                console.log.apply( console, arguments );
            },

            /**
             * Just wrapper, reserved for future use
             *
             */
            warn: function() {
                console.warn.apply( console, arguments );
            },

            /**
             * Deferred injector for external dependencies. Always returns Promise-object.
             * @param  {String} name Can be angular asset name for deferred injection or require asset name
             * @return {Promise}      Promise object
             */
            defer_get: function( name ) {
                var $timeout = this.get( '$timeout' );
                var $injector = this.get( '$injector' );
                return $q(function(resolve, reject){
                    if ( $injector.has( name ) ) {
                        this.log( 'has name ' + name );
                        $timeout( function() {
                            resolve( $injector.get( name ) );
                        }, 0 );
                    } else {
                        this.log( 'try to load ' + name );
                        require( [ name ], function( r ) {
                            this.log( 'loaded ' + name );
                            $timeout( function() {
                                resolve( r );
                            }, 0 );
                        }.bind(this), reject );
                    }
                }.bind(this));
            },
            /**
             * Wrapper for $injector, reserved for future use
             */
            get: function() {
                return $injector.get.apply( $injector, arguments );
            },

            /**
             * Wrapper for `require` function
             */
            getLibrary: function() {
                return require.apply( null, arguments );
            }
        } );

        var result = new A();
        each( arguments, function( item ) {
            if ( item.hasOwnProperty( '$$Apperyio_name' ) ) {
                result[ item.$$Apperyio_name ] = item;
            }
        } );
        each( arguments, function( item ) {
            if ( item.hasOwnProperty( '$$Apperyio_init' ) ) {
                item.$$Apperyio_init( result );
            }
        } );
        return result;
    }

    return Apperyio;
} );
