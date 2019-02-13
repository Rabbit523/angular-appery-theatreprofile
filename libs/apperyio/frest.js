define( [ 'require', 'lodash', 'x2js' ], function( require, _ ) {

    var merge = _.merge,
        isUndefined = _.isUndefined,
        each = _.each,
        isFunction = _.isFunction,
        isArray = _.isArray;

    return function( $http, $timeout, Apperyio ) {
        var RESTClass = function() {
            var $$request = {};
            var $$default_options = {};
            var x2js = require( 'x2js' );
            var inst = new x2js();
            var xml_str2json = inst.xml_str2json.bind( inst );

            function merge_requests( defaults, request ) {
                return merge( {}, defaults, request, function( a, b ) {
                    if ( isUndefined( b ) ) {
                        return a;
                    }
                } );
            };

            /**
             * Check is there any files for upload
             * @param  {Object} request Request object
             *
             * @return {Boolean}         Result of checking. `True` if request contain files.
             */
            function filesInRequest( request ) {
                var result = request.aio_config && request.aio_config.requestType && request.aio_config
                    .requestType.toLowerCase() == 'data';
                var data = request.data || {};
                if ( isArray( data ) ) {
                    for ( var i = 0, l = data.length; i < l; i++ ) {
                        result = data[ i ] instanceof Blob;
                        if ( result ) break;
                    }
                } else {
                    result = data instanceof Blob || data instanceof FormData;
                }
                return result;
            };

            /**
             * Add File to FormData variable
             *
             * @param  {FormData} formData FormData instance
             * @param  {File|FileList} item File instance or FileList
             */
            function appendItem( formData, item ) {
                if ( item ) {
                    if ( item instanceof FileList ) {
                        for ( var i = 0; i < item.length; i++ ) {
                            appendItem( formData, item[ i ] );
                        }
                        return;
                    }
                    var name;
                    if ( item.name ) {
                        name = item.name;
                    }
                    formData.append( name, item );
                }
            };

            /**
             * Adjust request for uploading files.
             * For multiple files, also set (define) Content-Type to undefined
             *
             * @param  {Object} r request object (method modify argument)
             */
            function adjustRequest4Files( r ) {
                if ( r.data instanceof FormData ) {
                    // If Content-Type was set, then use it, otherwise init property with undefined
                    r.headers[ 'Content-Type' ] = r.headers[ 'Content-Type' ];
                    return;
                }

                var formData = new FormData();

                if ( isArray( r.data ) || r.data instanceof FileList ) {
                    r.headers[ 'Content-Type' ] = undefined;
                    for ( var i = 0, l = r.data.length; i < l; i++ ) {
                        appendItem( formData, r.data[ i ] );
                    }
                } else {
                    r.headers[ 'Content-Type' ] = r.headers[ 'Content-Type' ] || r.data.type;
                    appendItem( formData, r.data );
                }
                r.data = formData;
            }

            return {
                setDefaults: function() {
                    var slice = Array.prototype.slice;
                    var options = slice.call( arguments, 0 );
                    $$default_options = options[ 0 ];
                    return this;
                },
                execute: function( exec_request ) {
                    var request = {},
                        aioConfig = false;

                    if ( exec_request === undefined ) {
                        request = $$default_options;
                    } else {
                        request = merge_requests( $$default_options, exec_request );
                    }
                    $$request = Apperyio.params_parse( request, request );

                    var url = request.url;
                    if ( request.hasOwnProperty( 'headers' ) && request.headers.hasOwnProperty('appery-proxy-url') ) {
                        url = request.headers['appery-proxy-url'];
                    }
                    if ( request.hasOwnProperty( 'data' ) ) {
                        $$request = Apperyio.params_parse( $$request, request.data );
                        each( request.data, function( v, k ) {
                            if ( url.indexOf( '{' + k + '}' ) > -1 ) {
                                delete $$request.data[ k ];
                            }
                        } );
                    }
                    if ( request.hasOwnProperty( 'params' ) ) {
                        each( request.params, function( v, k ) {
                            if ( url.indexOf( '{' + k + '}' ) > -1 ) {
                                delete $$request.params[ k ];
                            }
                        } );
                        $$request = Apperyio.params_parse( $$request, request.params );
                    }
                    if ( request.hasOwnProperty( 'query' ) ) {
                        each( request.query, function( v, k ) {
                            if ( url.indexOf( '{' + k + '}' ) > -1 ) {
                                delete $$request.query[ k ];
                            }
                        } );
                        $$request = Apperyio.params_parse( $$request, request.query );
                    }

                    if ( filesInRequest( $$request ) ) {
                        adjustRequest4Files( $$request );
                    }

                    if ($$request.hasOwnProperty( 'data' ) && $$request.data instanceof ArrayBuffer) {
                        // Angular's default transformRequest doesn't handle ArrayBuffer data that is why we override it
                        $$request.transformRequest = function(req) {
                            return req;
                        };
                    }

                    if ( request.hasOwnProperty( 'aio_config' ) ) {
                        aioConfig = request.aio_config;

                        if ( aioConfig.responseType.toLowerCase() == 'jsonp' ) {
                            $$request.params.callback = 'JSON_CALLBACK';
                        }
                    }

                    if ( request.hasOwnProperty( 'echo' ) ) {
                        var deferred = Apperyio.get( '$q' ).defer();
                        var echo_data = request.echo;

                        if ( aioConfig ) {
                            if ( aioConfig.responseType && aioConfig.responseType.toLowerCase() ==
                                'xml' ) {
                                echo_data = xml_str2json( request.echo );
                                if ( aioConfig.serviceName ) {
                                    echo_data = Apperyio.EntityAPI( aioConfig.serviceName +
                                        '.response.body', echo_data );
                                }
                            }
                            if ( aioConfig.responseType && aioConfig.responseType.toLowerCase() ==
                                'json' ) {
                                echo_data = JSON.parse( request.echo );
                            }
                        }

                        if ( request.hasOwnProperty( 'transformResponse' ) && isFunction( request.transformResponse ) ) {
                            echo_data = request.transformResponse.call( null, echo_data ) ||
                                echo_data;
                        }

                        $timeout( function() {
                            deferred.resolve( {
                                data: echo_data
                            } );
                        }, 0 );
                        return deferred.promise;
                    } else {
                        return $http( $$request );
                    }
                }
            }
        };
        return RESTClass;
    }
} );
