define( [ 'require' ], function( require ){

    return [{
        type: 'directive',
        name: 'navigateTo',
        deps: ['Apperyio', directive_navigateTo]
    }];

    function directive_navigateTo (Apperyio) {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                el.bind('click', function(){
                    var arg, options = {};
                    for ( var key in attrs ) {
                        if ( key.indexOf('navigateTo') == 0 && key.length > 'navigateTo'.length ){
                            arg = key.replace( 'navigateTo', '' );
                            options[arg] = attrs[key];
                        }
                    }
                    scope.$apply( function(){
                        Apperyio.navigateTo( attrs.navigateTo, options );
                    } );
                });
            }
        };
    }

});
