meetUpEventApp.controller('NewUserSignUpController', NewUserSignUpController);

NewUserSignUpController.$inject = ['$scope', '$log', 'validation', 'backendServices', 'trafficValet', 'userData'];

/* @ngInject */
function NewUserSignUpController($scope, $log, validation, backendServices, trafficValet, userData) {
	var vm = this;	
	var signupValidation = validation;

	//define local variables

	//define vm input variables
	vm.name = signupValidation.generateTestableObject('name');
	vm.email = signupValidation.generateTestableObject('email');
	vm.pass = signupValidation.generateTestableObject('pass');

	vm.createNewUser = function () {
		//declare local variables
		var newUserSherpa = trafficValet;

		//confirm all fields are valid
		if(vm.name.passesAllReqs && vm.email.passesAllReqs && vm.pass.passesAllReqs) {
			
			//declare local variables
			var createNewUser = backendServices;
			var newUserData = userData;
			var thisUID;

			//create the new user in the database
			createNewUser.createNewUser(vm.email.value, vm.pass.value)
			.then(function(dbUserData) {
				
				//maintain local values to speed up user experience
				newUserData.setPrimariesLocally(vm.email.value, vm.name.value, dbUserData.uid);

				//create a user profile in the database
				createNewUser.addNewUserToDatabase(dbUserData.uid, vm.name.value, vm.email.value)
				.then(function(message) {

					$log.info(message);

					//add this user to the list of registered users
					createNewUser.addNewUserToRegUsersList(dbUserData.uid, vm.email.value)
					.then(function(message) {

						//redirect using the uid
						
						//redirect to the next page 
						newUserSherpa.redirectTo('/userInformation', dbUserData.uid);
						 
						$log.info(message); 
					})
					.catch(function(message) { $log.info(message); })
				})
				.catch(function(message) { $log.info(message); })
			})
			.catch(function(message) { $log.info(message); })
			
		}

	}
	
	//run time actions

}
