angular
    .module('meetUpEventApp')
    .directive('pendingInvitations', pendingInvitations);

function pendingInvitations() {
	return {
		restrict: 'E',
		templateUrl: '../views/directives/pendingInvitations.htm',
		replace: true,
		scope: {
			date: "=",
			startTime: "=",
			host: "=",
			type: "="
		}
	}
}