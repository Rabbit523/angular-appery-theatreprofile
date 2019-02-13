module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            before: {
                src: ["build", "temp_app"]
            },
            unused: {
                src: []
            },
            after: {
                src: ["**", "!build/**", "!node/**", "!node_modules/**"]
            },
            finalClean: {
                src: ['build']
            }
        },

        copy: {
            tmpApp: {
                expand: true,
                src: ["**", "!node_modules/**",

                "!libs/jasmine/**", "!**/*.map", "!libs/**/*.md", "!libs/**/index.js", "!libs/**/package.json", "!libs/**/bower.json", "!libs/**/examples/**", "!libs/angular/angular.js", "!libs/angular-touch/angular-touch.js", "!libs/angular-route/angular-route.js", "!libs/angular-animate/angular-animate.js", "!libs/lodash/dist/lodash.js", "!libs/lodash/dist/lodash.compat.js", "!libs/lodash/dist/lodash.compat.min.js", "!libs/lodash/dist/lodash.underscore.js", "!libs/lodash/dist/lodash.underscore.min.js", "!libs/angular-google-maps/angular-google-maps.js", "!libs/x2js/xml2json.min.js", "!libs/ionic/ionic.bundle.min.js", "!libs/angular/angular.min.js.gzip",

                "!test/**", "!node/**", "!tests.html", "!Gruntfile.js", "!package.json"],
                dest: "temp_app/www"
            },
            restoreAngular: {
                expand: false,
                src: ["temp_app/www/libs/angular/angular.min.js", ],
                dest: "build/www/libs/angular/angular.min.js"
            },
            restoreStructure: {
                expand: true,
                cwd: 'build/www',
                src: '**',
                dest: './'
            }
        },

        replace: {
            buildindex: {
                src: 'build/www/index.html',
                overwrite: true,
                replacements: [{
                    from: 'data-main="app/bootstrap"',
                    to: 'data-main="app/app"'
                }]
            },
            buildWithoutTests: {
                src: "temp_app/www/app/bootstrap.js",
                overwrite: true,
                replacements: [{
                    from: "require([\"require\", \"angular\", \"app\", '../test/tests_asset'], function() {});",
                    to: ''
                }]
            }
        },

        requirejs: {
            compile: {
                options: {
                    appDir: "temp_app/www",
                    mainConfigFile: "temp_app/www/app/bootstrap.js",
                    baseUrl: "app",
                    dir: "build/www",
                    removeCombined: true,
                    modules: [{
                        name: "app",
                        exclude: ["cordova"]
                    }],
                    optimize: "uglify2",
                    uglify2: {
                        compress: {
                            conditionals: false
                        },
                        warnings: true,
                        mangle: true
                    },
                    wrapShim: true,
                    skipModuleInsertion: false
                }
            }
        },
        cssmin: {
            build: {
                expand: true,
                src: 'build/**/*.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['clean:before', 'copy:tmpApp', 'replace:buildWithoutTests', 'requirejs:compile', 'cssmin:build', 'copy:restoreAngular', 'clean:unused', 'replace:buildindex']);

    // be careful next task will replace all source code by builded version of application
    grunt.registerTask('build_release_and_clean', ['clean:before', 'copy:tmpApp', 'replace:buildWithoutTests', 'requirejs:compile', 'cssmin:build', 'copy:restoreAngular', 'clean:unused', 'replace:buildindex', 'clean:after', 'copy:restoreStructure', 'clean:finalClean']);
};