angular.module('meetUpEventApp', [])
	.directive('registeredUserLoginForm', function() {
		return {
			scope: {
				registeredUser: '='
			},
			templateUrl: '../views/directives/registeredUserLoginForm.htm',
			teplace: true,
			controller: 'LoginController',
			controllerAs: 'ctrl'
		};
	});