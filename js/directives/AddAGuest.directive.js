/* AddAGuest.directive.js */

/**
* @desc displays a list of all guests invited to an event this user is hosting.
* @example <add-a-guest></add-a-guest>
*/

angular
	.module('meetUpEventApp')
	.directive('addAGuest', addAGuest);

/* @ngInject */
function addAGuest() {
	var directive = {
		restrict: 'AECM',
		templateUrl: 'views/directives/addAGuest.directive.htm',
		replace: true,
		scope: {
			guestList: '='
		},
		link: linkFunc,
		controller: addAGuestController,
		controllerAs: 'vm',
		bindToController: true
	}

	/* @ngInject */
	function linkFunc(scope, el, attr, ctrl) {
    }

    addAGuestController.$inject = ['$log', '$routeParams', 'validation', 'userData'];
    /* @ngInject */
    function addAGuestController($log, $routeParams, validation, userData) {
	    var vm = this;
	    var emailChecker = validation;
	    var invitationManager = userData;

	    //local variables
	    var eventDetails = {};

	    //vm variables
	    vm.tempGuest = {
	    	name: '',
	    	email: '',
	    	status: 'pending'
	    }
	    vm.validations = {
	    	name: {
	    		addressed: false,
	    		valid: false,
	    		errorMessage: ''
	    	},
	    	email: {
	    		addressed: false,
	    		valid: false,
	    		errorMessage: ''
	    	},
	    	invitation: {
	    		isTheHost: false,
	    		alreadyInvited: false,
	    		errorMessage: ''
	    	}
	    }
	    vm.invitationValidForSubmission = false;
	    vm.submissionButton = {
	    	style: {
	    		color:'red'
	    	},
	    	class: {
	    		'col-xs-12': true,
	    		'col-sm-12': true,
	    		'btn': true,
	    		'btn-warning': true,
	    		'btn-success': false
	    	},
	    	message: 'Address Invitation...'
	    }
	    //local methods
	    function utf8_to_b64(str) {
			return btoa(str);
		}

	    function validateInvitation() {
	    	//check if both inputs are valid
	    	if(vm.validations.name.valid && vm.validations.email.valid) {
	    		
	    		//set the validity flag
	    		vm.invitationValidForSubmission = true;
	    		//update the submission button
	    		vm.submissionButton.class['btn-warning'] = false;
	    		vm.submissionButton.class['btn-success'] = true;
	    		vm.submissionButton.message='Invite Guest';
	    	} else {
	    		
	    		//set the validity flag
	    		vm.invitationValidForSubmission = false;
	    		//update the submission button
	    		vm.submissionButton.class['btn-warning'] = true;
	    		vm.submissionButton.class['btn-success'] = false;
	    		vm.submissionButton.message='Address Invitation...';
	    	}
	    }

	    function init() {
	    	//load the event for reference
	    	if(angular.isUndefined(invitationManager.getOneUserEventLocally('hosting', $routeParams.eventId))) {
	    		//if this page was loaded before the model get the event
	    		invitationManager.getRemoteEventsForLocal()
		    	.then(function() {
		    		//when the event has been loaded
		    		eventDetails = invitationManager.getOneUserEventLocally('hosting', $routeParams.eventId);

		    	})
	    	} else {
	    		//just get the model locally
	    		eventDetails = invitationManager.getOneUserEventLocally('hosting', $routeParams.eventId);
	    	}
	    	  	
	    }

	    //vm methods
	    vm.validateName = function() {
	    	//this field is being edited, throw flag
	    	vm.validations.name.addressed = true;

	    	//check for value
	    	if(angular.isDefined(vm.tempGuest.name) && vm.tempGuest.name != '') {
	    		vm.validations.name.valid = true;
	    		vm.validations.name.errorMessage = '';
	    	} else {
	    		vm.validations.name.valid = false;
	    		vm.validations.name.errorMessage = 'This guest needs a name';
	    	}

	    	validateInvitation();
	    }
	    vm.validateEmail = function() {
	    	//this field is being edited, throw flag
	    	vm.validations.email.addressed = true;

	    	//is there an email value?
	    	if(angular.isDefined(vm.tempGuest.email) && vm.tempGuest.email != '') {
	    		
	    		//if an email exists check it's validity
	    		if(angular.isUndefined(emailChecker.email(vm.tempGuest.email))) {
	    			//email is valid
	    			vm.validations.email.valid = true;
	    			vm.validations.email.errorMessage = '';
	    		} else {
	    			//get the error
	    			vm.validations.email.valid = false;
	    			vm.validations.email.errorMessage = emailChecker.email(vm.tempGuest.email);
	    			$log.info(vm.validations.email.errorMessage);
	    		}

	    	} else {
	    		//there isn't an email yet
	    		vm.validations.email.valid = false;
	    		vm.validations.email.errorMessage = 'Not a valid email';
	    	}

	    	validateInvitation();
	    }

	    vm.showNameError = function() {
	    	if(!vm.validations.name.valid && vm.validations.name.addressed) return true;
	    	else return false;
	    }

	    vm.showEmailError = function() {
	    	if(!vm.validations.email.valid && vm.validations.email.addressed) return true;
	    	else return false;
	    }

	    vm.showInvitationError = function() {
	    	if( vm.validations.invitation.isTheHost ||
	    		vm.validations.invitation.alreadyInvited ) 
	    			return true;
	    	else return false;
	    }

	    vm.submitGuestInvitation = function() {
	    	
	    	//if the requirnments are fulfilled...
	    	if(vm.invitationValidForSubmission) {
	    		//make sure the invitation is not to the current user
	    		if(invitationManager.thisIsTheHostEmail(vm.tempGuest.email, $routeParams.eventId)) {
					vm.validations.invitation.isTheHost = true;
					vm.validations.invitation.errorMessage = 'No need to invite the host';
					return 0;
	    		} else {
	    			vm.validations.invitation.isTheHost = false;
	    		}
	    		
		    	//make sure this person has not already been invited
		    	/*
		    	if(invitationManager.guestInvitedAlready(vm.tempGuest.email, $routeParams.eventId)) {
		    		vm.validations.invitation.alreadyInvited = true;
					vm.validations.invitation.errorMessage = 'This guest has already been invited';
					return 0;
	    		} else {
	    			vm.validations.invitation.alreadyInvited = false;
	    		}*/

	    		//if this person is a registered user get their user id
	    		invitationManager.getUserIdForGuest(vm.tempGuest.email)
	    		.then(function(uid) {
	    			
	    			return uid;
	    		})
	    		.then(function(uid) {
	    			//use that uid to register the user
	    			//add the person to the host's LOCAL guest list
	    			

	    			if(!angular.isObject(vm.guestList)) {
						
						vm.guestList = {};
					}
					//create the guest to save
					var guestBeingAdded = vm.tempGuest;

	    			vm.guestList[uid] = guestBeingAdded;

	    			vm.tempGuest = {
				    	name: '',
				    	email: '',
				    	status: 'pending'
				    };

	    		})
	    		.then(function() {
	    			//add this event to the users' pending list
	    			/*invitationManager.updatePendingEventsListForUser()*/
	    		})
	    		.then(function() {
	    			//remove the 'updated' field if need be
	    		})
	    		.catch(function(errorMessage) {
	    			//assuming no uid was found just use the email
	    			$log.info(errorMessage);
	    			
	    			//create the emailId
	    			idByEmail = utf8_to_b64(vm.tempGuest.email);
	    			//add this person to the host's guest list
	    			if(!angular.isObject(vm.guestList)) {
	    				
						vm.guestList = {};
					}
					//create the guest to save
					var guestBeingAdded = vm.tempGuest;

	    			vm.guestList[idByEmail] = guestBeingAdded;

			    	/*invitationManager.addGuestToHostGuestList(vm.tempGuest.name, vm.tempGuest.email, undefined, $routeParams.eventId, $routeParams.uid)
			    	.then(function(positiveResult) {
			    		$log.info('got this result: ' + positiveResult);
			    	})
			    	.then(function() {
			    		//add this event to the guest's pending list
			    		invitationManager.updatePendingEventsListForGuest($routeParams.eventId)
			    	})
			    	.then(function() {
	    			//remove the 'updated' field if need be
	    			})
			    	.catch(function(negativeResult) {
			    		$log.info('got this result: ' + positiveResult);
			    	})*/

			    	vm.tempGuest = {
				    	name: '',
				    	email: '',
				    	status: 'pending'
				    } 

	    		})
	    		
	    	}
	    	
	    }

		//actions
		init();

	}

	return  directive;
		
};