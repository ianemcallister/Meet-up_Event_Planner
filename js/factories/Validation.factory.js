angular
    .module('meetUpEventApp')
    .factory('validation', validation);

validation.$inject = ['$log'];

/* @ngInject */
function validation($log) {
	//declare local variables
	var minimumNameLength = 3;
	var minimumPassLength = 6;
	var maximumPassLength = 100;

	var allValidations = {
		required: required,						//new User validations
		minNameLength: minNameLength,
		minPassLength: minPassLength,
		maxPassLength: maxPassLength,
		atLeastOneSymbol: atLeastOneSymbol,
		atLeastOneNumber: atLeastOneNumber,
		atLeastOneLowercase: atLeastOneLowercase,
		atLeastOneUppercase: atLeastOneUppercase,
		illegalCharacter: illegalCharacter,
		email: email,
		dateOfBirth: dateOfBirth,

		generateEventRequirnments: generateEventRequirnments,		//event requirnments 
		updateEventReqStatus: updateEventReqStatus,
		updateEventReqAddressed: updateEventReqAddressed,
		updateEventReqClass: updateEventReqClass
	};

	function required(value) {
		if(angular.isUndefined(value)) {
			return 'This is a required field';
		} 
	}

	function minNameLength(value) {
		if(angular.isDefined(value)) {
			if(value.length < minimumNameLength) return ('Name should be at least ' + minimumNameLength + ' characters');
		} 
	}

	function minPassLength(value) {
		if(angular.isDefined(value)) {
			if(!(value.length < minimumPassLength)) return true;
		}
		return false;
	}

	function maxPassLength(value) {
		if(angular.isDefined(value)) {
			if(!(value.length > maximumPassLength)) return true;
		} 
		return false;
	}

	function atLeastOneSymbol(value) {
		if(angular.isDefined(value)) {
			// build regex
			var constraint = new RegExp("[\!\@\#\$\%\^\&\*]");

			//check constratint
			if(constraint.test(value)) {
				//success: at least one special character found
				return true;
			} else {
				//failure: didn't find any spcial characters
				return false;
			}

		}
		return false;
	}

	function atLeastOneNumber(value) {
		if(angular.isDefined(value)) {
			// build regex
			var constraint = new RegExp("[0-9]", "");

			//check constratint
			if(constraint.test(value)) {
				//success: at least one special character found
				return true;
			} else {
				//failure: didn't find any spcial characters
				return false;
			}

		}
		return false;
	}

    function atLeastOneLowercase(value) {
    	if(angular.isDefined(value)) {
			// build regex
			var constraint = new RegExp("[a-z]", "");

			//check constratint
			if(constraint.test(value)) {
				//success: at least one special character found
				return true;
			} else {
				//failure: didn't find any spcial characters
				return false;
			}

		}
		return false;
    }

    function atLeastOneUppercase(value) {
    	if(angular.isDefined(value)) {
			// build regex
			var constraint = new RegExp("[A-Z]", "");

			//check constratint
			if(constraint.test(value)) {
				//success: at least one special character found
				return true;
			} else {
				//failure: didn't find any spcial characters
				return false;
			}

		}
		return false;
    }

    function illegalCharacter(value) {
    	if(angular.isDefined(value)) {
			// build regex
			var constraint = new RegExp("[^A-z0-9\!\@\#\$\%\^\&\*]", "");

			//check constratint
			if(constraint.test(value)) {
				//success: at least one special character found
				return false;
			} else {
				//failure: didn't find any spcial characters
				return true;
			}

		}
		return false;
    }
    
    function email(value) {
    	//define constraints
    	var EMAIL_REGEXP = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    	var constraint = new RegExp(EMAIL_REGEXP);



    	$log.info('this is an email?: ' + constraint.test(value));

    	if(angular.isDefined(value)) {
    		//check if it passes constraint
    		
    		//if(!constraint.test(value)) {
    			return 'value was defined';
    		//}
    	} else {
    		return 'Not a valid email';
    	}
    	//if(!constraint.test(value)) return 'Not a valid e-mail address'
    	
    }

    function dateOfBirth(value) {}

    function generateEventRequirnments() {
    	//build the object and return it
    	var eventValidations = {
    		eventName: { 
    			completed :false, 
    			addressed:false, 
    			row: {
    				class: {
    					'col-xs-12': true,
    					'col-sm-12': true,
    					'form-group': true,
    					'has-success': false,
    					'has-error': false
    				}
    			},
    			label: {
    				class: {
    					'control-label': true
    				}
    			},
    			input: {
    				class: {
    					'form-control': true
    				}
    			}
    		},
			eventHost: { completed :false, addressed:false, row: { class: {'col-xs-12': true, 'col-sm-12': true, 'form-group': true, 'has-success': false, 'has-error': false } }, label: { class: { 'control-label': true } }, input: { class: { 'form-control': true } } },
			eventType: { completed :false, addressed:false, row: { class: {'col-xs-12': true, 'col-sm-12': true, 'form-group': true, 'has-success': false, 'has-error': false } }, label: { class: { 'control-label': true } }, input: { class: { 'form-control': true } } },
			eventStart: { completed :false, addressed:false, row: { class: {'col-xs-12': true, 'col-sm-12': true, 'form-group': true, 'has-success': false, 'has-error': false } }, label: { class: { 'control-label': true } }, input: { class: { 'form-control': true } } },
			eventEnd: { completed :false, addressed:false, row: { class: {'col-xs-12': true, 'col-sm-12': true, 'form-group': true, 'has-success': false, 'has-error': false } }, label: { class: { 'control-label': true } }, input: { class: { 'form-control': true } } },
			eventStreet01: { completed :false, addressed:false, row: { class: {'col-xs-12': true, 'col-sm-12': true, 'form-group': true, 'has-success': false, 'has-error': false } }, label: { class: { 'control-label': true } }, input: { class: { 'form-control': true } } },
			eventCity: { completed :false, addressed:false, row: { class: {'col-xs-12': true, 'col-sm-12': true, 'form-group': true, 'has-success': false, 'has-error': false } }, label: { class: { 'control-label': true } }, input: { class: { 'form-control': true } } },
			eventState: { completed :false, addressed:false, row: { class: {'col-xs-12': true, 'col-sm-12': true, 'form-group': true, 'has-success': false, 'has-error': false } }, label: { class: { 'control-label': true } }, input: { class: { 'form-control': true } } },
			eventZip: { completed :false, addressed:false, row: { class: {'col-xs-12': true, 'col-sm-12': true, 'form-group': true, 'has-success': false, 'has-error': false } }, label: { class: { 'control-label': true } }, input: { class: { 'form-control': true } } },
			eventGuest: { completed :false, addressed:false, row: { class: {'col-xs-12': true, 'col-sm-12': true, 'form-group': true, 'has-success': false, 'has-error': false } }, label: { class: { 'control-label': true } }, input: { class: { 'form-control': true } } }
    	}

    	return eventValidations;
    }

	function updateEventReqStatus() {}
	function updateEventReqAddressed() {} 
	function updateEventReqClass() {}

	return allValidations;
}