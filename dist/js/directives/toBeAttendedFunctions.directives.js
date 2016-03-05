angular
    .module('meetUpEventApp')
    .directive('toBeAttendedFunctions', toBeAttendedFunctions);

function toBeAttendedFunctions() {
	var directive = {
		restrict: 'E',
		templateUrl: '../views/directives/toBeAttendedFunctions.htm',
		replace: true,
		scope: {
			anEvent: '='
		},
		controller: UserEventsController,
		controllerAs: 'vm',
		bindToController: true
	};

	return directive;
}