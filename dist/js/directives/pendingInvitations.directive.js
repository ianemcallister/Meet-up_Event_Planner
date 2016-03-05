angular
    .module('meetUpEventApp')
    .directive('pendingInvitations', pendingInvitations);

function pendingInvitations() {
	var directive = {
		restrict: 'E',
		templateUrl: '../views/directives/pendingInvitations.htm',
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