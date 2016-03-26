angular
    .module('meetUpEventApp')
    .controller('NewUserSignUpController', NewUserSignUpController);

NewUserSignUpController.$inject = ['$scope', '$log', 'validation', 'backendServices', 'trafficValet', 'userData'];

/* @ngInject */
function NewUserSignUpController($scope, $log, validation, backendServices, trafficValet, userData) {
	var vm = this;

	//define vm input variables
	vm.inputs = {
		newName: '',
		newEmail: '',
		newPassword: '',
		requiredFieldsDefined: false
	}
	vm.errors = {
		name: '',
		email: '',
		password: false,
		passesAllTests: false
	}
	vm.passReqs = {
		0: { id:'', req:'Is at least 16 characters long', fulfilled:false, 'style':{color:'red'}},
		1: { id:'', req:'Is no longer than 100 characters', fulfilled:false, 'style':{color:'red'} },
		2: { id:'', req:'Contains at least one lowercase letter', fulfilled:false, 'style':{color:'red'} },
		3: { id:'', req:'Contains at least one uppercase letter', fulfilled:false, 'style':{color:'red'} },
		4: { id:'', req:'Contains at least one number', fulfilled:false, 'style':{color:'red'} },
		5: { id:'', req:'Contains at least one required symbol (\!\@\#\$\%\^\&\*)', fulfilled:false, 'style':{color:'red'} },
		6: { id:'', req:"Doesn't have any illegal characters", fulfilled:true, 'style':{color:'red'} }
	}
	vm.showReqsBox = false;

	//define required field constraints
	var signupValidation = validation;

	//define controller methods
	function verifyRequirnments() {
		if(vm.errors.name == '' && vm.errors.email == '' && !vm.errors.password) vm.errors.passesAllTests = true;
		else vm.errors.passesAllTests = false;

		if( angular.isDefined(vm.inputs.newName) && vm.inputs.newName !== '' &&
			angular.isDefined(vm.inputs.newEmail) && vm.inputs.newEmail !== '' &&
			angular.isDefined(vm.inputs.newPassword) && vm.inputs.newPassword !== '') 
				vm.inputs.requiredFieldsDefined = true;
		else vm.inputs.requiredFieldsDefined = false;
	}

	//define vm accessible methods
	vm.checkNewName = function() {
		//local variable
		var errors = [];
		var hasName = signupValidation.required(vm.inputs.newName);
		var longEnough = signupValidation.minNameLength(vm.inputs.newName)
		
		//log errors
		if(angular.isDefined(hasName)) errors.push(hasName);
		if(angular.isDefined(longEnough)) errors.push(longEnough);

		//update the errors model
		if(errors.length > 0) vm.errors.name = errors.join(', ');
		else vm.errors.name = '';

		verifyRequirnments();
	}

	vm.checkNewEmail = function() {
		//local variable
		var errors = [];
		var hasEmail = signupValidation.required(vm.inputs.newEmail);
		var isAnEmail = signupValidation.email(vm.inputs.newEmail);
		
		//log errors
		if(angular.isDefined(hasEmail)) errors.push(hasEmail);
		if(angular.isDefined(isAnEmail)) errors.push(isAnEmail);

		//update the errors model
		if(errors.length > 0) vm.errors.email = errors.join(', ');
		else vm.errors.email = '';

		verifyRequirnments();
	}

	vm.checkNewPassword = function() {
		//flip on reqs box
		vm.showReqsBox = true;

		//local variable
		var errors = [];
		var hasPassword = signupValidation.required(vm.inputs.newPassword);
		var specificReqs = [
			signupValidation.minPassLength(vm.inputs.newPassword),
			signupValidation.maxPassLength(vm.inputs.newPassword),
			signupValidation.atLeastOneLowercase(vm.inputs.newPassword),
			signupValidation.atLeastOneUppercase(vm.inputs.newPassword),
			signupValidation.atLeastOneNumber(vm.inputs.newPassword),
			signupValidation.atLeastOneSymbol(vm.inputs.newPassword),
			signupValidation.illegalCharacter(vm.inputs.newPassword)
		];

		//log errors
		if(angular.isDefined(hasPassword)) errors.push(hasPassword);

		//update the errors model
		if(errors.length > 0) vm.errors.password = errors.join(', ');
		else vm.errors.email = '';

		//update reqs model
		var anyErrors = false;
		for(i=0; i<7; i++) {
			if(specificReqs[i]) {
				vm.passReqs[i].fulfilled = true;
				vm.passReqs[i].style = {color:'green'};
			} else {
				vm.passReqs[i].fulfilled = false;
				vm.passReqs[i].style = {color:'red'};
				anyErrors = true;
			}
		}

		vm.errors.password = anyErrors;
		verifyRequirnments();
	}

	vm.exitPassword = function() {
		vm.checkNewPassword();
		vm.showReqsBox = false;
	}

	vm.createNewUser = function () {
		//declare local variables
		var newUserSherpa = trafficValet;

		//confirm all fields are valid
		if(vm.errors.passesAllTests && vm.inputs.requiredFieldsDefined) {
			
			//declare local variables
			var createNewUser = backendServices;
			var newUserData = userData;

			//maintain local values to speed up user experience
			newUserData.loadPrimaries(vm.inputs.newEmail, vm.inputs.newName);

			//create the new user in the database
			createNewUser.createNewUser(vm.inputs.newEmail, vm.inputs.newPassword)
			.then(function(userData) {
				//create a user profile in the database
				createNewUser.addNewUserToDatabase(userData.uid, vm.inputs.newName, vm.inputs.newEmail)
				.then(function(message) {
					$log.info(message);
					//add this user to the list of registered users
					createNewUser.addNewUserToRegUsersList(userData.uid, vm.inputs.newEmail)
					.then(function(message) { $log.info(message); })
					.catch(function(message) { $log.info(message); })
				})
				.catch(function(message) { $log.info(message); })
			})
			.catch(function(message) { $log.info(message); })
			
			//redirect to the next page 
			newUserSherpa.redirectTo('/userInformation');
		}

	}
	
	//run time actions

}
