define( [ 'require', 'lodash', 'angular-mocks', 'mocks' ], function( require ) {
    var mocks = require( 'mocks' );

    beforeEach( module(window.__APPLICATION_NAME) );

    describe( "frest test", function() {
        var f;

        beforeEach( inject( function( _$q_, _$http_, _$timeout_, REST ) {
            f = REST();
        } ) );

        it( "promise should be defined", function() {
            f.setDefaults( mocks.RESTService );
            expect( f.execute().then ).toBeDefined();
        } );

        it( "promise should be defined (another definition)", function() {
            expect( f.execute( mocks.RESTService).then ).toBeDefined();
        } );

        it( "frest.execute was called", function() {
            spyOn( f, 'execute' );
            f.execute( mocks.RESTService );
            expect( f.execute ).toHaveBeenCalled();
            expect( f.execute ).toHaveBeenCalledWith( mocks.RESTService );
        } );

        it( "frest.execute was called with mocks", function() {
            spyOn( f, 'execute' );
            f.execute( mocks.RESTService2 );
            expect( f.execute ).toHaveBeenCalledWith( mocks.RESTService2 );
        } );
    } );
} );
