define( [ 'require', 'angular', 'lodash' ], function( require, angular, _ ) {

    return function( $templateCache, Apperyio ) {
        var $http = Apperyio.get( '$http' );
        var $modal = Apperyio.get( "$ionicModal" );
        var $q = Apperyio.get( '$q' );
        var func = {
            dependencyResolver: function( conf ) {
                var deferred = $q.defer();
                if ( $templateCache.get( conf.templateUrl ) === undefined ) {
                    var ctrlUrl = conf.controllerUrl;
                    var tplUrl = 'text!' + conf.templateUrl;
                    require( [ tplUrl, ctrlUrl ], function( template ) {
                        deferred.resolve( {
                            template: template,
                            NotCached: true
                        } );
                    }, function( error ) {
                        deferred.reject( error );
                    } );
                } else {
                    deferred.resolve( {
                        NotCached: false
                    } );
                }
                return deferred.promise;
            },
            registerTemplate: function( curr_obj, conf ) {
                if ( curr_obj.NotCached ) {
                    var el = angular.element( curr_obj.template );
                    var content = el.html();
                    $templateCache.put( conf.templateUrl, content );
                }
            }
        };
        var ModalClass = function( conf ) {
            var deferred = $q.defer();
            var modalScope = Apperyio.get( '$rootScope' ).$new();
            var obj = {};
            obj.open = function( options ) {
                return $modal.fromTemplateUrl( conf.templateUrl, _.extend( {
                    scope: modalScope
                }, options ) );
            };
            obj.scope = modalScope;
            func.dependencyResolver( conf ).then(
                function( template ) {
                    func.registerTemplate( template, conf );
                    deferred.resolve( obj );
                },
                function( error ) {
                    deferred.reject( error );
                }
            );

            return deferred.promise;
        };
        return {
            loadModal: function( modalName ) {
                return ModalClass( {
                    templateUrl: '$Modals/' + modalName + '/' + modalName + 'Template.html',
                    controllerUrl: '$Modals/' + modalName + '/' + modalName + 'Controller',
                    controllerName: modalName + 'Controller'
                } );
            }
        }
    }
} );
