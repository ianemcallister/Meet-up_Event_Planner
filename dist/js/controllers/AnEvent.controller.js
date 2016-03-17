angular
    .module('meetUpEventApp')
    .controller('AnEventController', AnEventController);

AnEventController.$inject = ['$scope', '$log', '$location', '$routeParams', '$firebaseObject', 'userData'];

function AnEventController($scope, $log, $location, $routeParams, $firebaseObject, userData) {
	var vm = this;
	var fbURL = 'https://meetupplanner.firebaseio.com/';
	var ref = new Firebase(fbURL);
	
	
	//declare and initialize local variables
	vm.tempDateTime = {start: new Date(), end: new Date()};
	vm.newGuest = {name: '', email:{address:'', valid:false, style:{color:''}}};

	//binding to the event
	vm.event = $firebaseObject(ref.child('Users').child($routeParams.uid).child('hosting').child($routeParams.eventId))
	var registeredUsers = $firebaseObject(ref.child('Uids'));

	vm.manageSections = {
		1: {active: true, complete: false, style:{color:'black', 'background-color':'yellow'}},
		2: {active: false, complete: false, style:{color:'white', 'background-color':'gray'}},
		3: {active: false, complete: false, style:{color:'white', 'background-color':'gray'}}
	};

	//Methods
	function utf8_to_b64(str) {
		return btoa(str);
	}

	function b64_to_utf8(str) {
    	return atob(str);
	}

	function unixTimeToDateTime(unixTime) {
		return new Date(parseInt(unixTime));
	};

	function dateTimeToUnixTime(dateTime) {
		return Date.parse(dateTime);
	};

	function cleanNewGuestVariable() {
		vm.newGuest = {name: '', email:{address:'', valid:false, style:{color:''}}};
	}

	function inviteARegisteredUser(uid) {
		$log.info('adding them to the registered users list ' + uid);
	}

	function inviteAnUnregisteredUser(userKey) {
		$log.info('adding them to the UNREGISTERED users list ' + userKey);
	}

	vm.submit = function() {
		$log.info('submitting the form now!');
	}

	vm.eventRedirect = function(path, eventID, credentials) {
		var fullPath = path + '/' + $routeParams.uid + '/' + $routeParams.token;
		//redirect
		$log.info('redirecting to: ' + fullPath);
		$location.path(fullPath);
	}

	vm.changeSection = function(targetSection) {
		for(i = 1; i <=3; i++) {
			if(i==targetSection) {
				vm.manageSections[i].active = true;
				vm.manageSections[i].style['background-color'] ='yellow';
				vm.manageSections[i].style['color'] ='black';
			} else {
				vm.manageSections[i].active = false;
				vm.manageSections[i].style['background-color'] ='gray';
				vm.manageSections[i].style['color'] ='white';
			}
		}
	}

	vm.saveEventTime = function(dateTime, target) {
		//if this event didn't have a start time, create it
		if(!vm.event.eventTimes) { 
			vm.event.eventTimes = {start: '', end: ''};
			vm.event.eventTimes.start = vm.dateTimeToUnixTime(vm.tempDateTime.start); 
			vm.event.eventTimes.end = vm.dateTimeToUnixTime(vm.tempDateTime.end);
		}

		if((vm.tempDateTime.end < vm.tempDateTime.start) && target == 'start') vm.tempDateTime.end = vm.tempDateTime.start;
		if(target == 'start') vm.event.eventTimes.start = dateTimeToUnixTime(dateTime);
		if(target == 'end') vm.event.eventTimes.end = dateTimeToUnixTime(dateTime);
		$log.info(dateTime + " changed to " + vm.event.eventTimes[target] + " at " + target);
	}

	vm.alertMe = function() {
		$log.info('something changed');
	}

	vm.guestsAreInvited = function() {
		if(vm.event.guestList) return true;
		else return false;
	}

	vm.validateGuestEmail = function() {
		//if there is an email address
		if(vm.newGuest.email.address) {
			//check validity
			var constraint = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", "");

			if(constraint.test(vm.newGuest.email.address)) {
				vm.newGuest.email.valid = true;
				vm.newGuest.email.style = {color:'green'};
			} else {
				vm.newGuest.email.valid = false;
				vm.newGuest.email.style = {color:''};
			}			
		}
	}

	vm.isSectionComplete = function() {
		if(vm.manageSections[1].active) {
			if( vm.event.name &&
				vm.event.type &&
				vm.event.eventTimes.start &&
				vm.event.eventTimes.start) vm.manageSections[1].complete = true;
			else vm.manageSections[1].complete = false;
		} else if (vm.manageSections[2].active) {
			if( vm.event.address.city && 
				vm.event.address.state &&
				vm.event.address.street01 &&
				vm.event.address.zip) vm.manageSections[2].complete = true;
			else vm.manageSections[2].complete = false;
		} else if (vm.manageSections[3].active) {
			vm.manageSections[3].complete = true;
		}
	}

	vm.saveEvent = function() {
		vm.event.$save().then(function() {
			$log.info('event saved');
		}).catch(function(error) {
			$log.info('error! ' + error);
		});
	}

	vm.saveAndAdvance = function() {
		vm.event.$save().then(function() {
			$log.info('event saved');
		}).catch(function(error) {
			$log.info('error! ' + error);
		});

		//check for completenes
		vm.isSectionComplete();

		if(vm.manageSections[1].complete == true && vm.manageSections[2].complete == true && vm.manageSections[3].complete == true) {
			var redirectCreds = {uid: $routeParams.eventId, token:$routeParams.token};
			vm.eventRedirect('/userEvents', $routeParams.uid, redirectCreds);
		} else if (vm.manageSections[1].active) vm.changeSection(2);
		else if (vm.manageSections[2].active) vm.changeSection(3);
		else if (vm.manageSections[3].active) vm.changeSection(1);
	}

	vm.addGuestHostsToList = function() {
		//declare and initialize local variables
		var userKey = utf8_to_b64(vm.newGuest.email.address);

		//if email is valid and name exists
		if (vm.newGuest.name && vm.newGuest.email.valid) {
			//is there a guest list already? If not create one
			if(!vm.event.guestList) {
				vm.event.guestList = [];
			} else {
				//if so is this person already on the list?
				var i =0;
				while(vm.event.guestList[i]) {
					if(vm.event.guestList[i].email == b64_to_utf8(userKey)) {
						$log.info('This guest is already on the list');
						cleanNewGuestVariable();
						return;
					}
					i++;
				}
			}

			//is this guest a registered user?
			if(registeredUsers[userKey]) {
				//is the registered user the host?
				if(registeredUsers[userKey] == $routeParams.uid) {
					$log.info('tried to register the host');
					cleanNewGuestVariable();
					return;
				}
				else {
					//add them to the appropriate registered users' list of event invites
					inviteARegisteredUser(registeredUsers[userKey]);
				}
			} else {
				//add the invite to the non-registered users list of event invites
				inviteAnUnregisteredUser(userKey);
			}

			//add the guest to the list
			vm.event.guestList.push({attending: false, status:'pending', name: vm.newGuest.name, email:vm.newGuest.email.address});
			//save the evet
			vm.saveEvent();
			//clear the temp values
			cleanNewGuestVariable();
		} else {
			$log.info('you didn\'t enter a name and or email');
		}
	}

	//execution
	$log.info($routeParams.uid);
	$log.info($routeParams.eventId);
	
}
