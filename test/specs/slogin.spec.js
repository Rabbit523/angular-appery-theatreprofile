define( [ 'require', 'lodash', 'angular-mocks', 'mocks', '$App/slogin', '$App/fhelper', '$App/frest', '$App/fconfig' ],
    function( require ) {
        var _ = require( 'lodash' ),
            _REST = require( '$App/frest' ),
            mocks = require( 'mocks' ),
            providers = {
                twitter: {
                    id: "twitter",
                    baseUrl: "https://api.twitter.com/oauth/authenticate"
                },
                facebook: {
                    id: "facebook",
                    baseUrl: "https://www.facebook.com/dialog/oauth"
                },
                google: {
                    id: "google",
                    baseUrl: "https://accounts.google.com/o/oauth2/auth"
                }
            },
            host = "appery.io",
            dbBaseUrl = "https://api." + host + "/rest/1/db/",
            oauthUrl = dbBaseUrl + "oauth/",
            oauthLoginUrl = oauthUrl + "login/",
            oauthTokenUrl = oauthUrl + "token/?appId=<clientId>&callback=<callback>&provider=<twitter>",
            oauthLogout = oauthUrl + "logout?provider=<provider>",
            usersUrl = dbBaseUrl + "users/",
            loginUrl = dbBaseUrl + "login/",
            logoutUrl = dbBaseUrl + "logout/",
            checkLoginUrl = usersUrl + "me/",
            updateUserUrl = usersUrl + "<user_id>",
            STANDARD_HEADERS = {
                "X-Appery-Database-Id": mocks.Login.dbId,
                "Content-Type": "application/json"
            },
            HEADERS_WITH_TOKEN = {
                "X-Appery-Database-Id": mocks.Login.dbId,
                "Content-Type": "application/json",
                "X-Appery-Session-Token": mocks.Login.sessionToken
            },
            loginBody = {
                username: mocks.Login.user.username,
                password: "password"
            },
            expectedLoginURL = loginUrl + "?password=password&username=" + mocks.Login.user.username,
            clientId = "clientId",
            callback = "http://callback.appery.io/";

        function expectHeaders( expectedHeaders ) {
            return function( headers ) {
                for ( var key in expectedHeaders ) {
                    if ( expectedHeaders.hasOwnProperty( key ) ) {
                        if ( headers[ key ] !== expectedHeaders[ key ] ) {
                            return false;
                        }
                    }
                }
                return true;
            };
        }

        function noDatabaseIdHeader( headers ) {
            return !headers[ "X-Appery-Database-Id" ];
        }

        describe( "Social Login test", function() {
            var SLogin, Apperyio, REST, httpBackend;

            function login() {
                expect( SLogin.getStatus(), "unauthorized" );
                httpBackend.expectGET( expectedLoginURL, expectHeaders( STANDARD_HEADERS ) ).respond(
                    function() {
                        return [ 200, mocks.Login.loginResponse, {} ];
                    } );
                SLogin.login( loginBody, mocks.Login.dbId ).then( function() {
                        expect( SLogin.getToken( mocks.Login.dbId ) ).toEqual( mocks.Login.loginResponse
                            .sessionToken );
                        expect( SLogin.getUserId( mocks.Login.dbId ) ).toEqual( mocks.Login.loginResponse
                            ._id );
                        expect( SLogin.getStatus(), "authorized" );
                    },
                    function( error ) {
                        fail( "Expected session token, but get an error: " + JSON.stringify( error ) );
                    } );
                expect( SLogin.getStatus(), "inProgress" );
                httpBackend.flush();
            }

            function logout() {
                httpBackend.expectGET( logoutUrl, expectHeaders( STANDARD_HEADERS ) ).respond( function() {
                    return [ 204, undefined, {} ];
                } );
                SLogin.logout( mocks.Login.dbId ).then( function( result ) {
                        expect( result ).toEqual( undefined );
                        expect( SLogin.getToken( mocks.Login.dbId ) ).toEqual( null );
                        expect( SLogin.getUserId( mocks.Login.dbId ) ).toEqual( null );
                        expect( SLogin.getStatus(), "unauthorized" );
                    },
                    function( error ) {
                        fail( "Expected undefined, but get an error: " + JSON.stringify( error ) );
                    } );
                httpBackend.flush();
            }

            function withoutDbIdTest( method, url, data, loginMethod ) {
                httpBackend.expect( method, url, data, noDatabaseIdHeader ).respond( function() {
                    return [ 400, mocks.Login.dbIdNotFound, {} ];
                } );
                loginMethod().then( function( result ) {
                        fail( "Expected fail because of dbId is required, but get a success: " + JSON.stringify(
                            result ) );
                    },
                    function( error ) {
                        expect( error.status ).toEqual( 400 );
                        expect( error.data ).toEqual( mocks.Login.dbIdNotFound );
                    } );
                httpBackend.flush();
            }

            beforeEach( inject( function( _$rootScope_, _$location_, _$injector_, _$parse_, _$q_,
                                          _$timeout_, _$http_, _$httpBackend_ ) {
                Apperyio = require( '$App/fhelper' );
                Apperyio = Apperyio( _$rootScope_, _$location_, _$injector_, _$q_, _$parse_,
                    _$timeout_ );
                REST = _REST( _$http_, _$timeout_, Apperyio );
                var _sLogin = require( '$App/slogin' );
                SLogin = _sLogin( _$q_, REST );
                httpBackend = _$httpBackend_;
                logout();
            } ) );

            it( "httpBackend exists", function() {
                expect( httpBackend ).toBeDefined();
            } );


            it( "Social Login service exists", function() {
                expect( SLogin ).toBeDefined();
                expect( SLogin.getToken ).toBeDefined();
            } );

            it( "After init getToken should return null", function() {
                expect( SLogin.getToken() ).toBeNull();
                expect( SLogin.getToken( mocks.Login.dbId ) ).toBeNull();
            } );

            it( "After init getUserId should return null", function() {
                expect( SLogin.getUserId() ).toBeNull();
                expect( SLogin.getUserId( mocks.Login.dbId ) ).toBeNull();
            } );

            it( "After init getStatus should return \"unauthorized\"", function() {
                expect( SLogin.getStatus() ).toEqual( "unauthorized" );
                expect( SLogin.getStatus( mocks.Login.dbId ) ).toEqual( "unauthorized" );
            } );

            function createUserTest( dbId ) {
                httpBackend.expectPOST( usersUrl, loginBody, expectHeaders( STANDARD_HEADERS ) ).respond(
                    function() {
                        return [ 200, mocks.Login.user, {} ];
                    } );
                SLogin.createUser( loginBody, dbId ).then( function( result ) {
                        expect( result ).toEqual( mocks.Login.user.sessionToken );
                        expect( SLogin.getToken( dbId ) ).toEqual( mocks.Login.user.sessionToken );
                        expect( SLogin.getUserId( dbId ) ).toEqual( mocks.Login.user._id );
                        expect( SLogin.getStatus(), "authorized" );
                    },
                    function( error ) {
                        fail( "Expected session token, but get an error: " + JSON.stringify( error ) );
                    } );
                httpBackend.flush();
            }

            it( "Create user without setDefaultDB", function() {
                createUserTest( mocks.Login.dbId );
            } );

            it( "Create user with setDefaultDB", function() {
                SLogin.setDefaultDB( mocks.Login.dbId );
                createUserTest( undefined );
                SLogin.setDefaultDB( undefined );
            } );

            it( "Create user without dbId", function() {
                var createUser = function() {
                    return SLogin.createUser( loginBody );
                };
                withoutDbIdTest( "POST", usersUrl, loginBody, createUser );
            } );

            function userLoginTest( dbId ) {
                var spyStart = jasmine.createSpy( 'start' );
                var spyEnd = jasmine.createSpy( 'end' );
                onStartLoginEvent = function( e ) {
                    expect( e.type ).toEqual( "dbloginstart" );
                    spyStart();
                };
                onEndLoginEvent = function( e ) {
                    expect( e.type ).toEqual( "dbloginend" );
                    spyEnd();
                };
                document.addEventListener( "dbloginstart", onStartLoginEvent );
                document.addEventListener( "dbloginend", onEndLoginEvent );
                httpBackend.expectGET( expectedLoginURL, expectHeaders( STANDARD_HEADERS ) ).respond(
                    function() {
                        return [ 200, mocks.Login.loginResponse, {} ];
                    } );
                SLogin.login( loginBody, dbId ).then( function( result ) {
                        expect( result ).toEqual( mocks.Login.loginResponse.sessionToken );
                        expect( SLogin.getToken( dbId ) ).toEqual( mocks.Login.loginResponse.sessionToken );
                        expect( SLogin.getUserId( dbId ) ).toEqual( mocks.Login.loginResponse._id );
                        expect( SLogin.getStatus(), "authorized" );
                        expect( spyStart ).toHaveBeenCalled();
                        expect( spyEnd ).toHaveBeenCalled();
                    },
                    function( error ) {
                        fail( "Expected session token, but get an error: " + JSON.stringify( error ) );
                    } );
                httpBackend.flush();

            }

            it( "User login without setDefaultDB", function() {
                userLoginTest( mocks.Login.dbId );
            } );

            it( "User login with setDefaultDB", function() {
                SLogin.setDefaultDB( mocks.Login.dbId );
                userLoginTest( undefined );
                SLogin.setDefaultDB( undefined );
            } );

            it( "User login without dbId", function() {
                var userLogin = function() {
                    return SLogin.login( loginBody );
                };
                withoutDbIdTest( "GET", expectedLoginURL, undefined, userLogin );
            } );

            function userLogoutTest( dbId ) {
                login();
                httpBackend.expectGET( logoutUrl, expectHeaders( HEADERS_WITH_TOKEN ) ).respond( function() {
                    return [ 204, undefined, {} ];
                } );
                SLogin.logout( dbId ).then( function( result ) {
                        expect( result ).toEqual( undefined );
                        expect( SLogin.getToken( dbId ) ).toEqual( null );
                        expect( SLogin.getUserId( dbId ) ).toEqual( null );
                        expect( SLogin.getStatus(), "unauthorized" );
                    },
                    function( error ) {
                        fail( "Expected undefined, but get an error: " + JSON.stringify( error ) );
                    } );
                httpBackend.flush();
            }


            it( "User logout without setDefaultDB", function() {
                userLogoutTest( mocks.Login.dbId );
            } );

            it( "User logout with setDefaultDB", function() {
                SLogin.setDefaultDB( mocks.Login.dbId );
                userLogoutTest( undefined );
                SLogin.setDefaultDB( undefined );
            } );

            it( "User logout without dbId", function() {
                login();
                var userLogout = function() {
                    return SLogin.logout();
                };
                withoutDbIdTest( "GET", logoutUrl, undefined, userLogout );
            } );

            function findUsersTest( dbId ) {
                login();
                httpBackend.expectGET( usersUrl, expectHeaders( HEADERS_WITH_TOKEN ) ).respond( function() {
                    return [ 200, mocks.Login.users, {} ];
                } );
                SLogin.findUsers( {}, dbId ).then( function( result ) {
                        expect( result ).toEqual( mocks.Login.users );
                    },
                    function( error ) {
                        fail( "Expected list of users, but get an error: " + JSON.stringify( error ) );
                    } );
                httpBackend.flush();
            }

            it( "Get all users without setDefaultDB", function() {
                findUsersTest( mocks.Login.dbId );
            } );

            it( "Get all users with setDefaultDB", function() {
                SLogin.setDefaultDB( mocks.Login.dbId );
                findUsersTest( undefined );
                SLogin.setDefaultDB( undefined );
            } );

            it( "Get all users without dbId", function() {
                login();
                var findUsers = function() {
                    return SLogin.findUsers( {} );
                };
                withoutDbIdTest( "GET", usersUrl, undefined, findUsers );
            } );

            function updateUserTest( dbId ) {
                login();
                httpBackend.expectPUT( updateUserUrl.replace( "<user_id>", mocks.Login.user._id ),
                    loginBody, expectHeaders( HEADERS_WITH_TOKEN ) )
                    .respond( function() {
                        return [ 200, mocks.Login.user, {} ];
                    } );
                SLogin.updateUser( loginBody, dbId ).then( function( result ) {
                        expect( result ).toEqual( mocks.Login.user );
                    },
                    function( error ) {
                        fail( "Expected updated user, but get an error: " + JSON.stringify( error ) );
                    } );
                httpBackend.flush();
            }

            it( "Update user without setDefaultDB", function() {
                updateUserTest( mocks.Login.dbId );
            } );

            it( "Update user with setDefaultDB", function() {
                SLogin.setDefaultDB( mocks.Login.dbId );
                updateUserTest( undefined );
                SLogin.setDefaultDB( undefined );
            } );

            it( "Update user without dbId", function() {
                login();
                var updateUser = function() {
                    return SLogin.updateUser( loginBody );
                };
                withoutDbIdTest( "PUT", updateUserUrl.replace( "<user_id>", null ), loginBody,
                    updateUser );
            } );

            function checkLoginTest( dbId ) {
                login();
                httpBackend.expectGET( checkLoginUrl, expectHeaders( HEADERS_WITH_TOKEN ) ).respond(
                    function() {
                        return [ 200, mocks.Login.user, {} ];
                    } );
                SLogin.isLogged( {}, dbId ).then( function( result ) {
                        expect( result ).toEqual( mocks.Login.user );
                    },
                    function( error ) {
                        fail( "Expected current user, but get an error: " + JSON.stringify( error ) );
                    } );
                httpBackend.flush();
            }

            it( "Check login without setDefaultDB", function() {
                checkLoginTest( mocks.Login.dbId );
            } );

            it( "Check login with setDefaultDB", function() {
                SLogin.setDefaultDB( mocks.Login.dbId );
                checkLoginTest( undefined );
                SLogin.setDefaultDB( undefined );
            } );

            it( "Check login without dbId", function() {
                login();
                var isLogged = function() {
                    return SLogin.isLogged( {} );
                };
                withoutDbIdTest( "GET", checkLoginUrl, undefined, isLogged );
            } );

            function userOauthLogoutTest( dbId ) {
                login();
                httpBackend.expectDELETE( oauthLogout.replace( "<provider>", providers.facebook.id ),
                    expectHeaders( HEADERS_WITH_TOKEN ) ).respond( function() {
                    return [ 200, mocks.Login.user, {} ];
                } );
                SLogin.logoutOauth( providers.facebook.id, dbId ).then( function( result ) {
                        expect( result ).toEqual( mocks.Login.user );
                    },
                    function( error ) {
                        fail( "Expected current user, but get an error: " + JSON.stringify( error ) );
                    } );
                httpBackend.flush();
            }

            it( "User logout oauth without setDefaultDB", function() {
                userOauthLogoutTest( mocks.Login.dbId );
            } );

            it( "User logout oauth with setDefaultDB", function() {
                SLogin.setDefaultDB( mocks.Login.dbId );
                userOauthLogoutTest( undefined );
                SLogin.setDefaultDB( undefined );
            } );

            it( "User logout oauth without dbId", function() {
                login();
                var logoutOauth = function() {
                    return SLogin.logoutOauth( providers.facebook.id );
                };
                withoutDbIdTest( "DELETE", oauthLogout.replace( "<provider>", providers.facebook.id ),
                    undefined, logoutOauth );
            } );

            function invalidateTest( dbId ) {
                expect( SLogin.getToken( dbId ) ).toEqual( null );
                expect( SLogin.getUserId( dbId ) ).toEqual( null );
                expect( SLogin.getStatus(), "unauthorized" );
                login();
                expect( SLogin.getToken( dbId ) ).toEqual( mocks.Login.loginResponse.sessionToken );
                expect( SLogin.getUserId( dbId ) ).toEqual( mocks.Login.loginResponse._id );
                expect( SLogin.getStatus(), "authorized" );
                var result = SLogin.invalidate( dbId );
                expect( result ).toEqual( true );
                expect( SLogin.getToken( dbId ) ).toEqual( null );
                expect( SLogin.getUserId( dbId ) ).toEqual( null );
                expect( SLogin.getStatus(), "unauthorized" );
            }

            it( "Invalidate token without setDefaultDB", function() {
                invalidateTest( mocks.Login.dbId );
            } );

            it( "Invalidate token with setDefaultDB", function() {
                SLogin.setDefaultDB( mocks.Login.dbId );
                invalidateTest( undefined );
                SLogin.setDefaultDB( undefined );
            } );

            it( "Invalidate token without dbId", function() {
                expect( SLogin.getToken( mocks.Login.dbId ) ).toEqual( null );
                expect( SLogin.getUserId( mocks.Login.dbId ) ).toEqual( null );
                expect( SLogin.getStatus(), "unauthorized" );
                login();
                expect( SLogin.getToken( mocks.Login.dbId ) ).toEqual( mocks.Login.loginResponse.sessionToken );
                expect( SLogin.getUserId( mocks.Login.dbId ) ).toEqual( mocks.Login.loginResponse._id );
                expect( SLogin.getStatus(), "authorized" );
                var result = SLogin.invalidate();
                expect( result ).toEqual( false );
                expect( SLogin.getToken( mocks.Login.dbId ) ).toEqual( mocks.Login.loginResponse.sessionToken );
                expect( SLogin.getUserId( mocks.Login.dbId ) ).toEqual( mocks.Login.loginResponse._id );
                expect( SLogin.getStatus(), "unauthorized" );
            } );

            function extractParams( url ) {
                var params = {},
                    search;
                if ( url.indexOf( "?" ) === -1 ) {
                    return params;
                }
                if ( url.indexOf( "#" ) > -1 ) {
                    search = url.slice( url.indexOf( "?" ), url.indexOf( "#" ) );
                } else {
                    search = url.slice( url.indexOf( "?" ) );
                }

                if ( search.length > 1 ) {
                    for ( var pairIndex = 0, pairs = search.substr( 1 ).split( "&" ); pairIndex < pairs.length; pairIndex++ ) {
                        var pair = pairs[ pairIndex ].split( "=" );
                        params[ pair[ 0 ] ] = pair[ 1 ];
                    }
                }
                return params;
            }

            function mockForSocialLogin( windowOpenUrl, callbackURL ) {
                var indexOfOrigin = String.prototype.indexOf;
                //for isPhoneGapApp function
                String.prototype.indexOf = function() {
                    return -1;
                };
                window.open = function( url, windowName, windowFeatures ) {
                    String.prototype.indexOf = indexOfOrigin;
                    var params = extractParams(url),
                        state = params["state"] ? "&state=" + params["state"] : ""; // `state` is a random dynamic parameter so let's extract it from actual url and add to the callbackURL
                    expect( url ).toEqual( windowOpenUrl + state );
                    expect( windowName ).toEqual( "_blank" );
                    expect( windowFeatures ).toEqual( "location=yes" );
                    //opened window emulation
                    return {
                        addEventListener: function( eventName, eventCallback ) {
                            expect( eventName ).toEqual( "loadstart" );
                            var loadstartEventParam = {
                                url: callbackURL + state
                            };
                            eventCallback( loadstartEventParam );
                        },
                        close: function() {}
                    };
                };
            }

            function loginTwitterTest( dbId, headers ) {
                var indexOfOrigin = String.prototype.indexOf;
                var windowOpenOrigin = window.open;

                mockForSocialLogin(
                    providers.twitter.baseUrl + "?oauth_token=" + mocks.Login.oauthRequestToken,
                    callback + "?oauth_token=" + mocks.Login.oauthToken + "&oauth_verifier=" + mocks.Login
                        .oauthVerifier
                );

                var expectedTokenURL = oauthTokenUrl.replace( "<clientId>", clientId )
                    .replace( "<callback>", callback.split( "/" ).join( "%2F" ) )
                    .replace( "<twitter>", providers.twitter.id );
                httpBackend.expectGET( expectedTokenURL, expectHeaders( STANDARD_HEADERS ) ).respond(
                    function() {
                        return [ 200, {
                            token: mocks.Login.oauthRequestToken
                        }, {} ];
                    } );

                var expectedBody = {
                    "verifier": mocks.Login.oauthVerifier,
                    "token": mocks.Login.oauthToken,
                    "provider": providers.twitter.id,
                    "appId": clientId
                };
                httpBackend.expectPOST( oauthLoginUrl, expectedBody, expectHeaders( headers ) ).respond(
                    function() {
                        return [ 200, mocks.Login.user, {} ];
                    } );

                SLogin.loginTwitter( clientId, callback, dbId ).then( function( result ) {
                        expect( result ).toEqual( mocks.Login.sessionToken );
                        expect( SLogin.getStatus(), "authorized" );
                    },
                    function( error ) {
                        fail( "Expected current user, but get an error: " + JSON.stringify( error ) );
                    } );
                httpBackend.flush();

                String.prototype.indexOf = indexOfOrigin;
                window.open = windowOpenOrigin;
            }

            it( "Login twitter without setDefaultDB", function() {
                loginTwitterTest( mocks.Login.dbId, STANDARD_HEADERS );
            } );

            it( "Login twitter with setDefaultDB", function() {
                SLogin.setDefaultDB( mocks.Login.dbId );
                loginTwitterTest( undefined, STANDARD_HEADERS );
                SLogin.setDefaultDB( undefined );
            } );

            it( "Login twitter without dbId", function() {
                var expectedTokenURL = oauthTokenUrl.replace( "<clientId>", clientId )
                    .replace( "<callback>", callback.split( "/" ).join( "%2F" ) )
                    .replace( "<twitter>", providers.twitter.id );
                var loginTwitter = function() {
                    return SLogin.loginTwitter( clientId, callback );
                };
                withoutDbIdTest( "GET", expectedTokenURL, undefined, loginTwitter );
            } );

            function loginOauth2Test( loginMethod, provider, scope ) {
                var indexOfOrigin = String.prototype.indexOf;
                var windowOpenOrigin = window.open;

                mockForSocialLogin(
                    provider.baseUrl + "?client_id=" + clientId + "&redirect_uri=" + callback +
                    "&scope=" + scope + "&response_type=code",
                    callback + "?code=" + mocks.Login.code
                );

                var expectedBody = {
                    "verifier": mocks.Login.code,
                    "token": "",
                    "provider": provider.id,
                    "appId": clientId,
                    "callback": callback
                };
                httpBackend.expectPOST( oauthLoginUrl, expectedBody, expectHeaders( STANDARD_HEADERS ) ).respond(
                    function() {
                        return [ 200, mocks.Login.user, {} ];
                    } );

                loginMethod().then( function( result ) {
                        expect( result ).toEqual( mocks.Login.sessionToken );
                        expect( SLogin.getStatus(), "authorized" );
                    },
                    function( error ) {
                        fail( "Expected current user, but get an error: " + JSON.stringify( error ) );
                    } );
                httpBackend.flush();

                String.prototype.indexOf = indexOfOrigin;
                window.open = windowOpenOrigin;
            }

            it( "Login facebook without setDefaultDB", function() {
                var loginFB = function() {
                    return SLogin.loginFB( clientId, callback, mocks.Login.dbId );
                };
                loginOauth2Test( loginFB, providers.facebook, "" );
            } );

            it( "Login facebook with setDefaultDB", function() {
                var loginFB = function() {
                    return SLogin.loginFB( clientId, callback );
                };
                SLogin.setDefaultDB( mocks.Login.dbId );
                loginOauth2Test( loginFB, providers.facebook, "" );
                SLogin.setDefaultDB( undefined );
            } );

            it( "Login facebook without dbId", function() {
                var indexOfOrigin = String.prototype.indexOf;
                var windowOpenOrigin = window.open;

                mockForSocialLogin(
                    providers.facebook.baseUrl + "?client_id=" + clientId + "&redirect_uri=" +
                    callback + "&scope=" + "" + "&response_type=code",
                    callback + "?code=" + mocks.Login.code
                );
                var expectedBody = {
                    "verifier": mocks.Login.code,
                    "token": "",
                    "provider": providers.facebook.id,
                    "appId": clientId,
                    "callback": callback
                };
                var loginFB = function() {
                    return SLogin.loginFB( clientId, callback );
                };
                withoutDbIdTest( "POST", oauthLoginUrl, expectedBody, loginFB );

                String.prototype.indexOf = indexOfOrigin;
                window.open = windowOpenOrigin;
            } );

            var loginGoogleTest = function() {
                var originalPlugins = window.plugins;
                var indexOfOrigin = String.prototype.indexOf;
                String.prototype.indexOf = function() {
                    return -1;
                };
                window.plugins = {};
                window.plugins.googleplus = {};
                window.plugins.googleplus.login = function (params, successCallback) {
                    var response = {
                        accessToken: "accessToken"
                    };
                    successCallback(response);
                };

                var expectedBody = {
                    "verifier":"",
                    "token":"",
                    "provider":"google",
                    "appId":"clientId",
                    "callback":null,
                    accessToken: "accessToken"
                };
                httpBackend.expectPOST(oauthLoginUrl, expectedBody, expectHeaders(STANDARD_HEADERS)).respond(
                    function() {
                        return [ 200, mocks.Login.user, {} ];
                    });

                SLogin.loginGoogle( clientId, null, null, mocks.Login.dbId ).then( function( result ) {
                        expect( result ).toEqual( mocks.Login.sessionToken );
                        expect( SLogin.getStatus(), "authorized" );
                    },
                    function( error ) {
                        fail( "Expected current user, but get an error: " + JSON.stringify( error ) );
                    });

                httpBackend.flush();
                window.plugins = originalPlugins;
                String.prototype.indexOf = indexOfOrigin;
            };

            it( "Login google without setDefaultDB", function() {
                loginGoogleTest();
            });

            it( "Login google with connect to twitter", function() {
                loginGoogleTest();
                loginTwitterTest( mocks.Login.dbId, HEADERS_WITH_TOKEN );
            } );

            it( "Login google with setDefaultDB", function() {
                SLogin.setDefaultDB( mocks.Login.dbId );
                loginGoogleTest();
                SLogin.setDefaultDB( undefined );
            } );

            it( "Login google without dbId", function() {
                var originalPlugins = window.plugins;
                var indexOfOrigin = String.prototype.indexOf;
                String.prototype.indexOf = function() {
                    return -1;
                };
                window.plugins = {};
                window.plugins.googleplus = {};
                window.plugins.googleplus.login = function (params, successCallback) {
                    var response = {
                        accessToken: "accessToken"
                    };
                    successCallback(response);
                };
                var expectedBody = {
                    "verifier":"",
                    "token":"",
                    "provider":"google",
                    "appId":"clientId",
                    "callback":null,
                    accessToken: "accessToken"
                };
                var loginGoogle = function() {
                    return SLogin.loginGoogle( clientId );
                };
                withoutDbIdTest( "POST", oauthLoginUrl, expectedBody, loginGoogle );

                window.plugins = originalPlugins;
                String.prototype.indexOf = indexOfOrigin;
            } );

        } );

    } );
