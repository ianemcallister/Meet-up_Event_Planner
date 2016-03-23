angular
    .module('meetUpEventApp')
    .controller('NewUserSignUpController', NewUserSignUpController);

NewUserSignUpController.$inject = ['$scope', '$log', 'validation'];

/* @ngInject */
function NewUserSignUpController($scope, $log, validation) {
	var vm = this;

	//define vm input variables
	vm.inputs = {
		newName: '',
		newEmail: '',
		newPassword: '',
		allFieldsDefined: false
	}
	vm.errors = {
		name: '',
		email: '',
		password: '',
		passesAllTests: false
	}

	//define required field constraints
	var signupValidation = validation;

	//define controller methods
	function verifyRequirnments() {
		if(vm.errors.name == '' && vm.errors.email == '' && vm.errors.password == '') vm.errors.passesAllTests = true;
		else vm.errors.passesAllTests = false;

		if( angular.isDefined(vm.inputs.newName) && 
			angular.isDefined(vm.inputs.newEmail) && 
			angular.isDefined(vm.inputs.newPassword)) vm.inputs.allFieldsDefined = true;
		else vm.inputs.allFieldsDefined = false;
	}

	//define vm accessible methods
	vm.checkNewName = function() {
		//local variable
		var errors = [];
		var hasName = signupValidation.required(vm.inputs.newName);
		var longEnough = signupValidation.minLength(vm.inputs.newName)
		
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

		
		verifyRequirnments();
	}

	vm.createNewUser = function () {
		$log.info('creating a new user');
	}
	
	//run time actions

}
