define( [ 'require' ], function(  ){
	return [{
        type: 'directive',
        name: 'backButton',
        deps: [directive_backButton]
    }];

	function directive_backButton(){
		return {
			restrict: 'A',
			link: function(scope, el, attrs){
				el.bind('click', function(scope){
					return function(e){
						history.back();
						scope.$apply();
					};
				}(scope));
			}
		};
	}
});
