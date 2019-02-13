define( [ 'require', 'lodash', 'angular', 'angular-mocks', 'mocks' ], function( require, _, angular ) {

    var mocks = require('mocks');
    beforeEach( module(window.__APPLICATION_NAME) );

    describe( "fconfig test", function() {

        var parse, configInst;
        beforeEach( inject( ['Apperyio.Config', function( Config ) {
            configInst = Config;
            configInst.init( mocks.configTest.context );
        }] ) );

        it( "result should be undefined", function() {
            expect( configInst.get( mocks.configTest.expression.exp1 ) ).not.toBeDefined();
        } );

        it( "getter should work", function() {
            expect( configInst.get( mocks.configTest.expression.exp ) ).toEqual( mocks.configTest
                .context.right );
        } );

        it( "should change a value", function() {
            configInst.add( mocks.configTest.expression.exp, mocks.configTest.expression.changeExp );
            expect( configInst.get( mocks.configTest.expression.exp ) ).toEqual( mocks.configTest
                .expression.changeExp );
        } );

        it( "should add key,value", function() {
            configInst.add( mocks.configTest.expression.addExp, mocks.configTest.expression.addValue );
            expect( configInst.get( mocks.configTest.expression.addExp ) ).toEqual( mocks.configTest
                .expression.addValue );
        } );

        it( "should response config", function() {
            expect( configInst.all() ).toEqual( mocks.configTest.context );
        } );

        it( "should remove value", function() {
            configInst.remove( mocks.configTest.expression.exp );
            expect( configInst.get( mocks.configTest.expression.exp ) ).not.toBeDefined();
        } );
    } );

} );
