'use strict';

(function(window) {

    require.config({
        baseUrl: "app",
        paths: {
            'jasmine_f': '../libs/jasmine/lib/jasmine-core',
            'specs': '../test/specs',
            'angular-mocks': '../libs/angular-mocks/angular-mocks',
            'mocks': '../test/mocks',
            '$Libs': '../libs',
            '$App': '../libs/apperyio',
            '$Screens': 'pages',
            '$Modals': 'modals',
            '$Services': 'services',
            "navigateTo": "services/navigateTo",
            "backButton": "services/backButton",
            "text": "../libs/text",
            "require": "../libs/requirejs/require",
            "angular": "../libs/angular/angular.min",
            "angular-touch": "../libs/angular-touch/angular-touch.min",
            "angular-route": "../libs/angular-route/angular-route.min",
            "ionic": "../libs/ionic/ionic.bundle",
            "appery-ui": "../libs/appery-ui/appery-ui",
            "lodash": "../libs/lodash/dist/lodash.min",
            "gmaps": "../libs/angular-google-maps/angular-google-maps.min",
            "Apperyio": "../libs/apperyio/Apperyio",
            "q": "../libs/ms_sdk_bundle/q/q",
            "localforage": "../libs/ms_sdk_bundle/localforage/dist/localforage",
            "EventEmitter": "../libs/ms_sdk_bundle/EventEmitter.js/EventEmitter",
            "tv4": "../libs/ms_sdk_bundle/tv4/tv4",
            "ms-client-sdk": "../libs/ms_sdk_bundle/client-sdk",
            "CryptoJS": "../libs/ms_sdk_bundle/crypto-js-md5/crypto-js-md5",
            "moment": "../libs/ms_sdk_bundle/moment/moment",
            "cordova": "../libs/cordova",
            "x2js": "../libs/x2js/xml2json",
            "$App/crouterconfig": "../libs/apperyio/crouterconfig",
            "d3": "../libs/d3/d3.min.js?",
            "nvd3": "../libs/nvd3/build/nv.d3.min.js?",
            "angular-nvd3": "../libs/angular-nvd3/dist/angular-nvd3.min.js?",
            "rstudioTPattendanceByShow": "services/rstudioTPattendanceByShow",
            "rstudioTPorganizationsList": "services/rstudioTPorganizationsList",
            "rstudioTPshowAttendanceDetails": "services/rstudioTPshowAttendanceDetails",
            "rstudioTPticketsByZipCode": "services/rstudioTPticketsByZipCode",
            "rstudioTPallCompanies": "services/rstudioTPallCompanies",
            "tooltips": "../libs/angular-tooltips-master/src/angular-tooltips.js?",
            "rstudioTPcompanyShowsPerformance": "services/rstudioTPcompanyShowsPerformance",
            "TheatreProfile_Keys_read_service": "services/TheatreProfile_Keys_read_service",
            "rstudioTPshowEventDetails": "services/rstudioTPshowEventDetails",
            "rstudioTPshowEventGeography": "services/rstudioTPshowEventGeography",
            "Secret_Keys_read_service": "services/Secret_Keys_read_service",
            "rstudioTPshowPeerComparison": "services/rstudioTPshowPeerComparison",
            "TPretrieveUserInformation": "services/TPretrieveUserInformation",
            "TPgetUserIPAddress": "services/TPgetUserIPAddress",
            "rstudioTPcompaniesLinkedUserID": "services/rstudioTPcompaniesLinkedUserID",
            "rstudioTPuserValidCheck": "services/rstudioTPuserValidCheck",
            '$DashboardOrganization': 'pages/DashboardOrganization'
        },
        waitSeconds: 100,
        shim: {
            "angular": {
                exports: "angular"
            },
            "angular-touch": {

                deps: ["angular"]
            },
            "angular-route": {

                deps: ["angular"]
            },
            "ionic": {

                deps: ["angular", "cordova"]
            },
            "appery-ui": {

                deps: ["angular"]
            },
            "lodash": {
                exports: "_"
            },
            "gmaps": {

                deps: ["angular"]
            },
            "CryptoJS": {
                exports: "CryptoJS"
            },
            "x2js": {
                exports: "X2JS"
            },
            "nvd3": {

                deps: ["d3"]
            },
            "angular-nvd3": {

                deps: ["angular", "cordova", "d3", "ionic", "nvd3"]
            },

            'jasmine_f/boot': {
                deps: ['jasmine_f/jasmine-html']
            },
            'jasmine_f/jasmine-html': {
                deps: ['jasmine_f/jasmine']
            },
            'angular-mocks': {
                deps: ['angular', 'jasmine_f/boot']
            }
        }
    });

    define('angular', [], function() {
        return window.angular;
    });

    window.__APPLICATION_NAME = "AppModule_TheatreProfile";

    if (window.location.href.indexOf('tests.html') > -1) {
        require(["require", "angular", "app", '../test/tests_asset'], function() {});
    } else {
        require(["require", "angular", "app", "ionic", "appery-ui"], function(require, angular) {
            // Run APP
            angular.bootstrap(document.documentElement, [window.__APPLICATION_NAME]);
        });
    }
})(this);