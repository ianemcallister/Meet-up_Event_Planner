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

	//validation objects
	var required = {
		met: false,
		errorMessage: 'This field is required',
		test: function(value) {
			//throw the tested flag
			this.tested = true;
			if(angular.isUndefined(value)) {
				return false;
			}
			else if (value == '') {
				return false
			}
			else {
				return true;
			}
		}
	}
	var nameMinLength = {
		met: false,
		errorMessage: 'Too short (3 chars minimum)',
		test: function(value) {
			//throw the tested flag
			this.tested = true;
			if(angular.isDefined(value)) {
				if(value.length >= 3) {
					return true;
				} else return false;
			}
		}
	}

	var isAnEmail = {
    	met: false,
    	errorMessage: 'This is not a valid email',
    	test: function(value) {
    		//define regex
    		var EMAIL_REGEXP = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
	    	var constraint = new RegExp(EMAIL_REGEXP);

	    	if(angular.isDefined(value)) {
	    		//if email is defined
	    		if(constraint.test(value)) {
	    			//if it passes regex
	    			return true;
	    		} else return false;
	    	} else return false;
    	}
    }

    var passMinLength = {
    	met: false,
    	errorMessage: 'Should be at least 6 characters long',
    	test: function(value) {
    		//throw the tested flag
			this.tested = true;
			if(angular.isDefined(value)) {
				if(value.length >= 6) {
					return true;
				} else return false;
			} else return false
    	}
    }
	var passMaxLength = {
    	met: false,
    	errorMessage: 'Should be no more than 100 characters',
    	test: function(value) {
    		//throw the tested flag
			this.tested = true;
			if(angular.isDefined(value)) {
				if(value.length <= 100) {
					return true;
				} else return false;
			} else return false;
    	}
    }

	var hasLowercase = {
    	met: false,
    	errorMessage: 'Should have at least one lowercase letter',
    	test: function(value) {
    		//define regex
    		var constraint = new RegExp("[a-z]");

    		if(angular.isDefined(value)) {
    			//if pass is defined
    			if(constraint.test(value)) {
    				//succes
    				return true;
    			} else return false;
    		} else return false;

    	}
    }

	var hasUppercase = {
    	met: false,
    	errorMessage: 'Should have at least one uppercase letter',
    	test: function(value) {
    		//define regex
    		var constraint = new RegExp("[A-Z]");

    		if(angular.isDefined(value)) {
    			//if pass is defined
    			if(constraint.test(value)) {
    				//succes
    				return true;
    			} else return false;
    		} else return false;
    	}
    }

	var hasANumber = {
    	met: false,
    	errorMessage: 'Should have at least one number letter',
    	test: function(value) {
    		//define regex
    		var constraint = new RegExp("[0-9]");

    		if(angular.isDefined(value)) {
    			//if pass is defined
    			if(constraint.test(value)) {
    				//succes
    				return true;
    			} else return false;
    		} else return false;
    	}
    }

	var hasASymbol = {
    	met: false,
    	errorMessage: 'Should have at least one symbol letter',
    	test: function(value) {
    		//define regex
    		var constraint = new RegExp("[\!\@\#\$\%\^\&\*]");

    		if(angular.isDefined(value)) {
    			//if pass is defined
    			if(constraint.test(value)) {
    				//succes
    				return true;
    			} else return false;
    		} else return false;
    	}
    }

	var noIllegalChars = {
    	met: false,
    	errorMessage: 'Should be at least 6 characters long',
    	test: function(value) {
    		var constraint = new RegExp("[^A-z0-9\!\@\#\$\%\^\&\*]");

    		if(angular.isDefined(value)) {
    			//if pass is defined
    			if(constraint.test(value)) {
    				//succes
    				return false;
    			} else return true;
    		} else return true;
    	}
    }


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
		generateNewUserRequirnemnts: generateNewUserRequirnemnts, 
		updateEventReqStatus: updateEventReqStatus,
		updateEventReqAddressed: updateEventReqAddressed,
		updateEventReqClass: updateEventReqClass,
		generateTestableObject: generateTestableObject
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

    	if(angular.isDefined(value) && !constraint.test(value)) return 'Not a valid email';

    }

    function dateOfBirth(value) {}

    function generateNewUserRequirnemnts() {
    	//declare the object
    	var errorsObject = {
			name: {
				name: {
					status: false,
					message: 'A name is required'
				},
				validLength: {
					status:false,
					message: 'Name must be at least 3 characters long'
				}
			},
			email: {
				email: {
					status: false,
					message: 'An email is required'
				},
				validEmail: {
					status: false,
					message: 'This is not a valid email'
				}
			},
			pass: {
				pass: {
					status: false,
					message: 'A password is required'
				},
				tooShort: {
					status: false,
					message: 'There should be at least 6 characters'
				},
				tooLong: {
					status: false,
					message: 'There should be no more than 100 characters'
				},
				noLowercase: {
					status: false,
					message: 'There should be at least one lowercase letter'
				},
				noUppercase: {
					status: false,
					message: 'There should be at least one uppercase letter'
				},
				noNumber: {
					status: false,
					message: 'There should be at least one number'
				},
				noSymbol: {
					status: false,
					message: 'There should be at least one symbol'
				},
				hasInvalidChar: {
					status: false,
					message: 'There shouldn\'t be any invalid characters'
				}
			},
			changeStatus: function(input, req, status) {
				this[input][req].status = status;
			},
			getErrorMessage: function(input, req) {
				return this[input][req].message;
			},
			allReqsFulfilled: function(input) {
				Object.keys(input).forEach(function(req) {
					if(!input[req].status) return false;
				});
			},
			allInputsPass: function() {
				Object.keys(this).forEach(function(input) {
					if(!this.allReqsFulfilled(input)) return false
				});
			},
			getAllErrors: function() {
				var allErrors = {};
				Object.keys(this).forEach(function(input) {
					//if the value is an object
					if(angular.isObject(this[input])) {

						Object.keys(input).forEach(function(req) {
							
							if(this[input][req].status) {

								allErrors[input] = {};
								allErrors[input][req] = { message: this[input][req].message }
							}

						});

					}
					
				});
				return allErrors;
			}
		}

		return errorsObject;
    }

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
    					'form-control': true,
    					'col-xs-12': true,
    					'col-sm-12':true,
    					'col-md-12': true
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

    function updateClasses() {
    	//check the validity state
    	if(this.passesAllReqs) {
    		this.class.row['has-success'] = true;
    		this.class.row['has-error'] = false;
    		this.style['background-color'] = '#78FA89';
    		this.style['color'] = 'black';
    	} else {
    		this.class.row['has-success'] = false;
    		this.class.row['has-error'] = true;
    		this.style['background-color'] = '#FA787E';
    		this.style['color'] = 'white';
    	}
    }

    function updateReqStyles() {
    	//local variables
    	var requirnments = this.reqs;
    	var reqBox = this.reqBox;
    	//iterate through each req
    	Object.keys(requirnments).forEach(function(key) {

    		if(requirnments[key].met) {
    			reqBox[key].style.color = 'green';
    		} else {
    			reqBox[key].style.color = 'red';
    		}
    	});
    }

    function buildErrorMessage() {
    	//declare local variables
    	var requirnments = this.reqs;
    	var objectErrors = [];

    	//check for failed tests
    	Object.keys(requirnments).forEach(function(test) {
    		//if the test isn't met add the error message to the array of messages
    		if(!requirnments[test].met) objectErrors.push(requirnments[test].errorMessage);
    	});
    	//assemble message
    	this.errorMessage = objectErrors.join(', ');
    	
    }

    function checkForValue() {
    	if(angular.isDefined(this.value) && this.value != '') this.hasValue = true;
    	else this.hasValue = false;
    }

    function checkForErrorMessage() {
		//only unlock error message if tests have been run at least once
		if(this.allReqsTested) {
			//check
			if(angular.isDefined(this.errorMessage) && this.errorMessage != '') this.hasAnErrorMessage = true;
			else this.hasAnErrorMessage = false;
		} 
    }

    function checkAllRequirnments() {
    	//declare local variables
		var requirnments = this.reqs;
		var value = this.value;
    	var allTestsPass = true;
    	
		//run through requirnments
		Object.keys(requirnments).forEach(function(test) {
			
			//pass the value and test the constraint
			if(requirnments[test].test(value)) {
				//if it passes the test update the status
				requirnments[test].met = true; 
				//get the error message
				//allTestsPass = true
			} else {
				requirnments[test].met = false;
				allTestsPass = false; 
			}
		})
		//update the flag
		this.passesAllReqs = allTestsPass;

		if(!allTestsPass) {
			//build the error message
			this.buildErrorMessage();
			//throw it's flag
			this.hasAnErrorMessage = true;

		} else {
			this.hasAnErrorMessage = false;
		}
		//update element classes
		this.updateClasses();
		//update styles if need be
		if(angular.isDefined(this.updateReqStyles)) this.updateReqStyles();
		//throw allReqsTested flag
		this.allReqsTested = true;
    }

    function postFailReqsTest() {
    	//if a complete attempt has occured then check on keystroke
    	if(this.allReqsTested) {
    		this.checkAllRequirnments();
    	}
    }

    function openReqBox() {
    	this.showReqsBox = true;
    }

    function closeReqBox() {
    	this.showReqsBox = false;
    }

    function generateTestableObject(type) {
    	//build objects
    	var testableObjects = {
    		name: {
    			value: '',
    			reqs: {
    				hasOne: required,
    				longEnough: nameMinLength
    			},
    			errorMessage: '',
    			hasValue: false,
    			passesAllReqs: false,
    			allReqsTested: false,
    			hasAnErrorMessage: false,
    			buildErrorMessage: buildErrorMessage,
    			checkForValue: checkForValue,
    			checkForErrorMessage: checkForErrorMessage,
    			checkAllRequirnments: checkAllRequirnments,
    			postFailReqsTest: postFailReqsTest,
    			updateClasses: updateClasses,
    			class: {
    				row: {
    					'col-xs-12': true,
    					'col-sm-12': true,
    					'form-group': true,
    					'has-success': false,
    					'has-error': false
    				},
    				label: {
    					'control-label': true
    				},
    				input: {
    					'col-xs-12': true,
	    				'col-sm-12': true,
	    				'col-md-12': true,
	    				'form-control': true
    				}
    			},
    			style: {
    				'color': 'black'
    			}
    		},
    		email: {
    			value: '',
    			reqs: {
    				hasOne: required,
    				isAnEmail: isAnEmail
    			},
    			errorMessage: '',
    			hasValue: false,
    			passesAllReqs: false,
    			allReqsTested: false,
    			hasAnErrorMessage: false,
    			buildErrorMessage: buildErrorMessage,
    			checkForValue: checkForValue,
    			checkForErrorMessage: checkForErrorMessage,
    			checkAllRequirnments: checkAllRequirnments,
    			postFailReqsTest: postFailReqsTest,
    			updateClasses: updateClasses,
    			class: {
    				row: {
    					'col-xs-12': true,
    					'col-sm-12': true,
    					'form-group': true,
    					'has-success': false,
    					'has-error': false
    				},
    				label: {
    					'control-label': true
    				},
    				input: {
    					'col-xs-12': true,
	    				'col-sm-12': true,
	    				'col-md-12': true,
	    				'form-control': true
    				}
    			},
    			style: {
    				'color': 'black'
    			}
    		},
    		pass: {
    			value: '',
    			reqs: {
    				hasOne: required,
    				longEnough: passMinLength,
    				shortEnough: passMaxLength,
    				hasLowercase: hasLowercase,
    				hasUppercase: hasUppercase,
    				hasANumber: hasANumber,
    				hasASymbol: hasASymbol,
    				noIllegalChars: noIllegalChars
    			},
    			errorMessage: '',
    			hasValue: false,
    			passesAllReqs: false,
    			allReqsTested: false,
    			hasAnErrorMessage: false,
    			showReqsBox: false,
    			buildErrorMessage: buildErrorMessage,
    			checkForValue: checkForValue,
    			checkForErrorMessage: checkForErrorMessage,
    			checkAllRequirnments: checkAllRequirnments,
    			postFailReqsTest: postFailReqsTest,
    			updateClasses: updateClasses,
    			updateReqStyles: updateReqStyles,
    			openReqBox: openReqBox,
    			closeReqBox: closeReqBox,
    			class: {
    				row: {
    					'col-xs-12': true,
    					'col-sm-12': true,
    					'form-group': true,
    					'has-success': false,
    					'has-error': false
    				},
    				label: {
    					'control-label': true
    				},
    				input: {
    					'col-xs-12': true,
	    				'col-sm-12': true,
	    				'col-md-12': true,
	    				'form-control': true
    				}
    			},
    			style: {
    				'color': 'black'
    			},
    			reqBox: {
    				hasOne: { req: 'Need to set a password', 'style':{color:'red'}},
    				longEnough: { req: 'Is at least 6 characters long', 'style':{color:'red'}},
    				shortEnough: { req: 'Is no longer than 100 characters', 'style':{color:'red'}},
    				hasLowercase: { req: 'Contains at least one lowercase letter', 'style':{color:'red'}},
    				hasUppercase: { req: 'Contains at least one uppercase letter', 'style':{color:'red'}},
    				hasANumber: { req: 'Contains at least one number', 'style':{color:'red'}},
    				hasASymbol: { req: 'Contains at least one required symbol (\!\@\#\$\%\^\&\*)', 'style':{color:'red'}},
    				noIllegalChars: { req: 'Doesn\'t have any illegal characters', 'style':{color:'red'}},
    			}
    		}
    	}

    	return testableObjects[type];

    }

	function updateEventReqStatus() {}
	function updateEventReqAddressed() {} 
	function updateEventReqClass() {}

	return allValidations;
}