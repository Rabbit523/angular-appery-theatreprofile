define( [ 'require', 'lodash', 'angular', 'angular-mocks', 'mocks' ], function( require, _ ) {

    var _ = require( 'lodash' ),
        mocks = require( 'mocks' );

    beforeEach( module(window.__APPLICATION_NAME) );

    describe( "Unit tests for helper", function() {
        var $rootScope, $location, $injector, $q, _AConfig, $parse, helperInst, configInst, $timeout;
        beforeEach( inject( function( Apperyio, _$timeout_ ) {
            helperInst = Apperyio;
            $timeout = _$timeout_;
        } ) );

        it( "Apperyio.url() should execute function", function() {
            var testFn = function() {
                return mocks.helperTest.templates.result;
            };
            expect( helperInst.url( testFn ) ).toEqual( mocks.helperTest.templates.result );
        } );

        it( "Apperyio.url() should return template", function() {
            var template = "template";
            expect( helperInst.url( template ) ).toEqual( template );

            expect( helperInst.url( mocks.helperTest.templates.template_with_not_existed_keys ) ).toEqual(
                mocks.helperTest.templates.template_with_not_existed_keys );
        } );

        it( "Apperyio.url() should return value", function() {
            helperInst.Config.add( 'right', mocks.helperTest.context.right );
            expect( helperInst.url( mocks.helperTest.templates.template ) ).toEqual(
                mocks.helperTest.context.right );
        } );

        it( "Apperyio.params_parse() should parse object", function() {
            expect( helperInst.params_parse( mocks.configTest.context ) ).toEqual(
                mocks.configTest.context );
            var res = helperInst.params_parse( mocks.params_parse_mock, mocks.params_parse_mock );
            expect( res.c.d ).toBe( res.a.b );
            expect( res.c.d1 ).toBe( '{b}' );
            expect( res.c.g1 ).toBe( res.g );
            expect( res.d2.d3.d5 ).toBe( '{b}' );
            expect( res.d2.d3.d7 ).toBe( res.g + '+' + res.g );
            expect( res.d2.d3.d4 ).toBe( res.c.d );
            expect( res.e ).toBe( res.d2.d3.d6 );
            expect( res.f ).toBe( res.c.f1 );
            expect( res.f ).not.toBe( res.c.f1 + '' );
            expect( res.c.f2 ).toBe( res.f + '+' + res.a.b + '-' + res.c.f1 );
        } );

        it( "Apperyio.defer_get() should return promise", function() {
            var promise = helperInst.defer_get( "$parse" );
            expect( promise ).toBeDefined();
        } );

        it( "should contain Config obejct", function() {
            expect( helperInst.Config ).toBeDefined();
        } );

        it( "shouldn't contain deprecated list of Config methods", function() {
            expect( helperInst.config ).toBeUndefined();
            expect( helperInst.configAdd ).toBeUndefined();
            expect( helperInst.getAll ).toBeUndefined();
            expect( helperInst.remove ).toBeUndefined();
            expect( helperInst.init ).toBeUndefined();
        } );
    } );

} );
