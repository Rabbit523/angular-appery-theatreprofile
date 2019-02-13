define( [ 'require', 'angular' ], function( require, angular ) {
    function RouterConfig( route, APP ) {
        if ( typeof route.redirectTo !== 'undefined' ) {
            return route;
        }
        var result = {},
            controller = route.c,
            templateUrl = route.t,
            dependencies = route.d || [];

        dependencies.unshift( controller );
        result.templateUrl = require.toUrl( templateUrl );

        result.resolve = {
            resolver: [ '$q', '$rootScope', function( $q, $rootScope ) {
                dependencies.reverse();
                var def = $q.defer();
                require( dependencies, function() {
                    var args_length = arguments.length;
                    if ( args_length > 0 && arguments[ 0 ] !== undefined ) {
                        for ( var i = 0; i < args_length; i++ ) {
                            if (
                                angular.isArray( arguments[ i ] ) && angular.isArray(
                                    arguments[ i ][ 0 ].deps )
                            ) {
                                try {
                                    for ( var j = 0, dep = arguments[ i ].length; j < dep; j++ ) {
                                        APP[ arguments[ i ][ j ].type ].call( APP,
                                            arguments[ i ][ j ].name, arguments[ i ][ j ]
                                            .deps );
                                    }
                                } catch ( e ) {
                                    // angular or service level error
                                    e.message = 'Error in ' + arguments[ i ][ j ].name +
                                        "\nMessage: " + e.message;
                                    throw new Error( e );
                                }
                            }
                        }
                    }
                    $rootScope.$apply( def.resolve );
                } );
                if ( require.specified( controller ) ) return true;
                return def.promise;
            } ]
        };
        return result;
    }

    return RouterConfig;
} );
