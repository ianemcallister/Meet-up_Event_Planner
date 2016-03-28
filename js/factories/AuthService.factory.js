angular
    .module('meetUpEventApp')
    .factory('authService', authService);

authService.$inject = ['$log', 'backendServices'];

/* @ngInject */
function authService($log, backendServices) {

	var allAuthServices = {
		isLoggedIn: isLoggedIn
	};

	function isLoggedIn() {
		//check the user authenticaion state
		var dbAuthentication = backendServices;
		
		dbAuthentication.checkLoginStatus()
		.then(function(status) {
			return status;
		})
		.catch(function(status) {
			return status;
		})
	}
	
	return allAuthServices;

}