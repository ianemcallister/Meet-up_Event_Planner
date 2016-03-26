angular
    .module('meetUpEventApp')
    .controller('RegUserLoginController', RegUserLoginController);

RegUserLoginController.$inject = ['$log', '$document', 'backendServices', 'trafficValet', 'userData'];

/* @ngInject */
function RegUserLoginController($log, $document, backendServices, trafficValet, userData) {
	var vm = this;

	//define vm input variables
	vm.inputs = {
		email: '',
		password: '',
		requiredFieldsDefined: false
	}
	vm.errors = {
		message: '',
		passesAllTests: true
	}
	vm.unclockUserLoginBtn = {
		'usable':false, 
		'class':'btn btn-warning',
		message: 'Need Email & Pass'
	}

	//methods
	function openUserLoginBtn() {
		//check that there is an email and there is a password
		if(	angular.isDefined(vm.inputs.email) && vm.inputs.email !== '' &&
			angular.isDefined(vm.inputs.password) && vm.inputs.password !== '') 
		{
			vm.inputs.requiredFieldsDefined = true;
			vm.unclockUserLoginBtn.class = 'btn btn-success';
			vm.unclockUserLoginBtn.message = 'Login';
			vm.unclockUserLoginBtn.usable = true;
		} else {
			vm.inputs.requiredFieldsDefined = false;
			vm.unclockUserLoginBtn.class = 'btn btn-warning';
			vm.unclockUserLoginBtn.message = 'Need Email & Pass';
			vm.unclockUserLoginBtn.usable = false;
		}

	}

	//view model methods
	vm.update = function() {
		//set values
		vm.inputs.email = $document.find('#userEmail')[0].value;
		vm.inputs.password = $document.find('#userPassword')[0].value;
		
		openUserLoginBtn();
	}

	vm.loginRegisteredUser = function() {
		//declare local variables
		var registeredUserSherpa = trafficValet;

		//confirm all fields are valid
		if(true) {
			//declare local variables
			var database = backendServices;
			var registeredUserData = userData;

			//maintain local values to speed up user experience
			registeredUserData.loadPrimaries(vm.inputs.email);

			//verify users credentials
			database.LoginRegisteredUser(vm.inputs.email, vm.inputs.password)
			.then(function(userCredentials) {
				//if no trouble logging in update error object
				vm.errors.passesAllTests = true;

				//use uid to collect user bio
				database.getUserBio(userCredentials.uid)
				.then(function(userBio) {
					//update userData model with userBio
					registeredUserData.updateBio(userBio);

					//load user events
					database.getUserEvents(userCredentials.uid)
					.then(function(allEventsForThisUser) {
						//update userData model with userEvents
						registeredUserData.updateAllUserEvents(allEventsForThisUser);
					})
					.catch(function(message) { $log.info(message); })

				})
				.catch(function(message) { $log.info(message); })

			})
			.catch(function(message) { 
				//if there was an error logging in, let the user know
				vm.errors.message = message;
				vm.errors.passesAllTests = false;
			})

			//redirect to the next page 
			registeredUserSherpa.redirectTo('/userInformation', '2389473');
		}

	}

	//run commands
}