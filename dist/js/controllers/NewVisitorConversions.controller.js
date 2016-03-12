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
		vm.aUserAccess.loginExistingUser(vm.userEmail, vm.userPassword, vm.redirect());
	}

	vm.redirect = function() {
		$log.info('redirecting');
		$location.path('/user/12');
	}
}