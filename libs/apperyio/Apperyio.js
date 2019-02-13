define(['require', 'angular', 'angular-touch', '$App/fmodals', '$App/fhelper', '$App/fconfig', "appery-ui", "angular-route", '$App/crouterconfig', '$App/crestinterrupt', '$App/frest', '$App/slogin', '$App/sentity'], function(require, angular) {
    /**
     * Main module for all modules
     */
    return angular.module('ApperyioModule', ['ngTouch', 'ngRoute', 'ui.appery'])

    .factory('Apperyio.Config', ['$parse', require('$App/fconfig')])

    .service('EntityAPI', [require('$App/sentity')])

    .service('Apperyio', ['$rootScope', "$location", "$injector", '$q', '$parse', '$timeout', 'Apperyio.Config', 'EntityAPI', require('$App/fhelper')]).factory('Modals', ['$templateCache', 'Apperyio', require('$App/fmodals')])

    .factory('REST', ['$http', '$timeout', 'Apperyio', require('$App/frest')])

    .service('User', ['$q', 'REST', require('$App/slogin')])

    .config(["$provide", "$httpProvider", require('$App/crestinterrupt')])

    /**
     * Run actions
     */
    .run(["$rootScope", run_code]);

    function run_code($rootScope) {
        /**
         * Checking and reaction for online and offline states
         */
        $rootScope.online = navigator.onLine ? 'online' : 'offline';
        $rootScope.$apply();
        if (window.addEventListener) {
            window.addEventListener("online", goOnline, true);
            window.addEventListener("offline", goOffline, true);
        } else {
            document.body.ononline = goOnline;
            document.body.onoffline = goOffline;
        }

        function goOnline() {
            $rootScope.online = true;
            $rootScope.$apply();
        };

        function goOffline() {
            $rootScope.online = false;
            $rootScope.$apply();
        };
    };
});