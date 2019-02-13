define([
/**
 * System global resources
 */
"require", "angular", "angular-touch", "angular-route", "Apperyio", "cordova", "constants", "routes", "bootstrap", "$App/crouterconfig", '$Screens/indexController',
/**
 * Angular modules
 */
"ionic", "gmaps", "angular-nvd3", "tooltips",

/**
 * Custom global resources
 */
"navigateTo", "backButton", "d3", "nvd3", "rstudioTPattendanceByShow", "rstudioTPorganizationsList", "rstudioTPshowAttendanceDetails", "rstudioTPticketsByZipCode", "rstudioTPallCompanies", "rstudioTPcompanyShowsPerformance", "TheatreProfile_Keys_read_service", "rstudioTPshowEventDetails", "rstudioTPshowEventGeography", "Secret_Keys_read_service", "rstudioTPshowPeerComparison", "TPretrieveUserInformation", "TPgetUserIPAddress", "rstudioTPcompaniesLinkedUserID", "rstudioTPuserValidCheck"], function() {
    var angular = require("angular"),
        _Appery = require("Apperyio"),
        routerConfig = require("$App/crouterconfig");
    var DEPENDENCIES_INDEX = 15;
    var DEPENDENCIES = Array.prototype.slice.call(arguments, DEPENDENCIES_INDEX);

    /**
     * Adding angular modules to the application
     */
    var APP = angular.module(window.__APPLICATION_NAME, ['ApperyioModule', "ionic", "uiGmapgoogle-maps", "nvd3", "tooltips"]).config(["$routeProvider", '$controllerProvider', '$provide', '$locationProvider', '$compileProvider', '$filterProvider', 'uiGmapGoogleMapApiProvider', Configuration]).run(["Apperyio", "User", "$location", "$ionicPlatform", RUN]);

    function Configuration($routeProvider, $controllerProvider, $provide, $locationProvider, $compileProvider, $filterProvider, $uiGmapGoogleMapApiProvider) {

        APP.controller = $controllerProvider.register;
        APP.directive = $compileProvider.directive;
        APP.filter = $filterProvider.register;
        APP.factory = $provide.factory;
        APP.service = $provide.service;
        APP.provider = $provide.provider;
        APP.value = $provide.value;
        APP.constant = $provide.constant;
        APP.decorator = $provide.decorator;

        /**
         * Place for list of pages and routes
         */
        var routes = require('routes');
        APP.defaultRoute = routes['default']['redirectTo'];
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });
        angular.forEach(routes.when, function(route, path) {
            $routeProvider.when(path, routerConfig(route, APP));
        });
        $routeProvider.otherwise(routes.otherwise || routes.
    default);
        /**
         * Global dependencies resolver
         */
        if (DEPENDENCIES.length >= 0) {
            var deps = null;
            for (var i = 0, l = DEPENDENCIES.length; i < l; i++) {
                deps = DEPENDENCIES[i];
                if (angular.isArray(deps) && deps.length > 0 && angular.isArray(deps[0].deps)) {
                    try {
                        for (var j = 0, l2 = deps.length; j < l2; j++) {
                            APP[deps[j].type].call(APP, deps[j].name, deps[j].deps);
                        }
                    } catch (e) {
                        // angular or service level error
                        e.message = 'Error in ' + deps[j].name + "\nMessage: " + e.message;
                        throw new Error(e);
                    }
                }
            }
        }
        APP.controller('indexController', require('$Screens/indexController'));
    }

    function RUN(Apperyio, User, $location, $ionicPlatform) {
        Apperyio.User = User;
        Apperyio.Config.init(require('constants'));
        $ionicPlatform.registerBackButtonAction(function(event) {
            if (APP.defaultRoute === $location.path()) {
                navigator.app.exitApp();
            } else {
                navigator.app.backHistory();
            }
        }, 100);
    }

    return APP;
});