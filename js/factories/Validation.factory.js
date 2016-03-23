angular
    .module('meetUpEventApp')
    .factory('validation', validation);

validation.$inject = ['$log'];

/* @ngInject */
function validation($log) {
	//declare local variables
	
	var allValidations = {
		required: required,
		minLength: minLength,
		maxLength: maxLength,
		atLeastOneSymbol: atLeastOneSymbol,
		atLeastOneNumber: atLeastOneNumber,
		atLeastOneLowercase: atLeastOneLowercase,
		atLeastOneUppercase: atLeastOneUppercase,
		illegalCharacter: illegalCharacter,
		email: email,
		dateOfBirth: dateOfBirth
	};

	function required(value) {
		if(angular.isUndefined(value)) {
			return 'This is a required field';
		}
	}
	function minLength(value) {
		if(angular.isDefined(value)) {
			if(value.length < 3) return 'Name should be at least 3 characters';
		}
	}

	function maxLength(value) {}
	function atLeastOneSymbol(value) {}
	function atLeastOneNumber(value) {}
    function atLeastOneLowercase(value) {}
    function atLeastOneUppercase(value) {}
    function illegalCharacter(value) {}
    
    function email(value) {
    	//define constraints
    	var constraint = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", "");

    	if(!constraint.test(value)) return 'Not a valid e-mail address'
    }

    function dateOfBirth(value) {}

	return allValidations;
}