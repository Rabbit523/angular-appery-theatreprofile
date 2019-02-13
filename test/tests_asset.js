define( [ 'require', "angular-mocks", 'jasmine_f/boot' ], function(require){
    require( [
        'specs/entityapi.spec',
        'specs/fconfig.spec',
        'specs/fhelper.spec',
        'specs/slogin.spec',
        'specs/frest.spec'
    ], function() {
        window.onload();
    } );
} );
