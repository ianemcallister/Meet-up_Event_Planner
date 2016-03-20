angular
    .module('meetUpEventApp')
    .directive('testDirective', testDirective);

testDirective.$inject = [];

function testDirective () {
	var directive = {
		restrict: 'AECM',
		templateUrl: 'views/directives/testDirective.htm',
		replace: true,
		link: link,
		controller: testDirectiveController,
		controllerAs: 'vm',
		bindToController: true
	};

	return directive;

	function link(scope, element, attrs) {
		element.bind('click', function() {
			alert('button Clicked!');
		});
	}
}

function testDirectiveController($log) {

}