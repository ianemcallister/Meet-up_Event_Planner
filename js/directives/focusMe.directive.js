/* focusMe.directive.js */

/**
* @desc displays a list of all guests invited to an event this user is hosting.
* @example <input type="text" focus-me="shouldBeOpen">
*/

angular
	.module('meetUpEventApp')
	.directive('focusMe', focusMe);

focusMe.$inject = ['$timeout', '$parse', '$log'];

/* @ngInject */
function focusMe($timeout, $parse, $log) {
	var focusMeDirective = {
		//
		link: function(scope, element, attrs) {
			var model = $parse(attrs.focusMe);
			
			scope.$watch(model, function(value) {
				//$log.info('value=',value);
				if(value === true) {
					$timeout(function() {
						element[0].focus();
					})
				}

			});
			element.bind('blur',function() {
				//$log.info('blur');
				//scope.$apply(model.assign(scope, false));
			});
		}
	}

	return focusMeDirective;
}