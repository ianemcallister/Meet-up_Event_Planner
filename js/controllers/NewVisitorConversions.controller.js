angular
    .module('meetUpEventApp')
    .controller('NewVisitorConversionsController', NewVisitorConversionsController);

NewVisitorConversionsController.$inject = ['$log', '$location', 'userAuthentication'];

function NewVisitorConversionsController($log, $location, userAuthentication) {
	//local variables
	var vm = this;
	vm.aUserAccess = userAuthentication;

	vm.newUserEmail = '';
	vm.newUserPassword = '';
	vm.userEmail = '';
	vm.userPassword = '';

	//controller methods
	vm.createNewUser = function() {
		vm.aUserAccess.createNewUser(vm.newUserEmail, vm.newUserPassword);

	}

	vm.authenticateUser = function() {
		var ref = new Firebase('https://meetupplanner.firebaseio.com');

		ref.authWithPassword({
			email    : existingUserEmail,
			password : existingUserPassword
		}, function(error, authData) {
			if (error) {
			    alert("Login Failed!" + error);
			} else {
			  alert("Authenticated successfully with payload:" + authData);
			  //load user data
			  
			}

		});
	}

	vm.redirect = function() {
		$log.info('redirecting');
		$location.path('/user/12');
	}
}