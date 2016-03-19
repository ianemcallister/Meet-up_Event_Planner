angular
    .module('meetUpEventApp')
    .controller('AnEventController', AnEventController);

AnEventController.$inject = ['$scope', '$log', '$location', '$routeParams', '$firebaseObject', 'userData'];

function AnEventController($scope, $log, $location, $routeParams, $firebaseObject, userData) {
	var vm = this;
	var fbURL = 'https://meetupplanner.firebaseio.com/';
	var ref = new Firebase(fbURL);
	var userEvents = ref.child('Users').child($routeParams.hostId).child('events').child('hosting').child($routeParams.eventId)
	
	//declare and initialize local variables
	vm.tempDateTime = {start: new Date(), end: new Date()};
	vm.newGuest = {name: '', email:{address:'', valid:false, style:{color:''}}};
	vm.showIfHost = false;
	vm.hideIfAttending = true;

	//binding to the event
	vm.event = $firebaseObject(userEvents)
	var registeredUsers = $firebaseObject(ref.child('Uids'));

	vm.manageSections = {
		1: {active: true, complete: false, style:{color:'black', 'background-color':'yellow'}},
		2: {active: false, complete: false, style:{color:'white', 'background-color':'gray'}},
		3: {active: false, complete: false, style:{color:'white', 'background-color':'gray'}}
	};

	//Local Methods
	function utf8_to_b64(str) {
		return btoa(str);
	}

	function b64_to_utf8(str) {
    	return atob(str);
	}

	function dateTimeToUnixTime(dateTime) {
		return Date.parse(dateTime);
	}

	function cleanNewGuestVariable() {
		vm.newGuest = {name: '', email:{address:'', valid:false, style:{color:''}}};
	}

	function inviteARegisteredUser(uid) {
		$log.info('adding them to the registered users list ' + uid);
		//set the new event
		ref.child('Users').child(uid).child('events').child('pending').child($routeParams.uid).child($routeParams.eventId).set({
			id: $routeParams.eventId,
			eventTimes: {
				start: vm.event.eventTimes.start,
				end: vm.event.eventTimes.end
			},
			name: vm.event.name,
			host: $routeParams.uid
		}, function(error) {
			if(error) $log.info('there was an error' + error);
		});
		//if there was an updated place holder, remove it
		ref.child('Users').child(uid).child('events').child('pending').once('value', function(snapshot) {
			var checkForPlaceholder = snapshot.val()
			$log.info(snapshot.val());

			if(checkForPlaceholder.updated) {
				$log.info('deleting updated');
				ref.child('Users').child(uid).child('events').child('pending').child('updated').remove(function(errorObject) {
					if(errorObject) $log.info("Deleting failed: " + errorObject.code);
				});
			} else $log.info('nothing to do');

		}, function(errorObject) {
			if(errorObject) $log.info("The read failed: " + errorObject.code);
		});
	}

	function inviteAnUnregisteredUser(userKey) {
		$log.info('adding them to the UNREGISTERED users list ' + userKey);
		ref.child('UnregisteredUsers').child(userKey).child('pending').child($routeParams.uid).child($routeParams.eventId).set({
			id: $routeParams.eventId,
			host: $routeParams.uid,
			eventTimes: {
				start: vm.event.eventTimes.start,
				end: vm.event.eventTimes.end
			},
			name: vm.event.name
		}, function(error) {
			if(error) $log.info('there was an error' + error);
		});
	}

	function checkForHost() {
		//check event host
		var authData = ref.getAuth();

		if(authData.uid == $routeParams.hostId) {
			$log.info('is the host');
			vm.showIfHost = true;
		} else {
			$log.info('not the host');
			vm.showIfHost = false;
		}
	}

	function checkIfGuestIsAttending() {
		if(vm.showIfHost) {
			$log.info('check guest attendance');
			userEvents.child('guestList').on('value', function(snapshot) {
				var allGuests = snapshot.val();
				vm.hideIfAttending = !allGuests[$routeParams.uid].attending;
				
			});
		}
	}

	function openAllSections() {
		vm.manageSections[1].active = true;
		vm.manageSections[2].active = true;
		vm.manageSections[3].active = true;
	}

	//view Method
	vm.unixTimeToDateTime = function (unixTime) {
		return new Date(parseInt(unixTime));
	};

	vm.dateTimeToUnixTime = function (dateTime) {
		return Date.parse(dateTime);
	};

	vm.submit = function() {
		$log.info('submitting the form now!');
	}

	vm.backToUserEvents = function() {
		$location.path('/userEvents/' + $routeParams.uid + '/' + $routeParams.token);
	}

	vm.eventRedirect = function(path, eventID) {
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
		if(target == 'start') vm.event.eventTimes.start = vm.dateTimeToUnixTime(dateTime);
		if(target == 'end') vm.event.eventTimes.end = vm.dateTimeToUnixTime(dateTime);
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
				vm.event.eventTimes.start) {
				$log.info('setting section 1 to green');
				vm.manageSections[1].complete = true;
				vm.manageSections[1].style['background-color'] = 'green';
			}
			else vm.manageSections[1].complete = false;
		} else if (vm.manageSections[2].active) {
			if( vm.event.address.city && 
				vm.event.address.state &&
				vm.event.address.street01 &&
				vm.event.address.zip) {
				$log.info('setting section 2 to green');
				vm.manageSections[2].complete = true;
				vm.manageSections[2].style['background-color'] = 'green';
			}
			else vm.manageSections[2].complete = false;
		} else if (vm.manageSections[3].active) {
			$log.info('setting section 2 to green');
			vm.manageSections[3].complete = true;
			vm.manageSections[3].style['background-color'] = 'green';
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
			vm.eventRedirect('/userEvents', $routeParams.uid);
		} else if (vm.manageSections[1].active) vm.changeSection(2);
		else if (vm.manageSections[2].active) vm.changeSection(3);
		else if (vm.manageSections[3].active) vm.changeSection(1);
	}

	vm.addGuestToHostsList = function() {
		//declare and initialize local variables
		var userKey = utf8_to_b64(vm.newGuest.email.address);

		//if email is valid and name exists
		if (vm.newGuest.name && vm.newGuest.email.valid) {
			//is there a guest list already? If not create one
			if(!vm.event.guestList) {
				vm.event.guestList = {};
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

					//add the guest to the list
					vm.event.guestList[registeredUsers[userKey]] = {
						attending: false, 
						status:'pending', 
						name: vm.newGuest.name, 
						email:vm.newGuest.email.address,
					};					
				}
			} else {
				//add the invite to the non-registered users list of event invites
				inviteAnUnregisteredUser(userKey);

				//add the guest to the list
				vm.event.guestList[userKey] = {
						attending: false, 
						status:'pending', 
						name: vm.newGuest.name, 
						email:vm.newGuest.email.address,
				};
			}


			//save the event
			vm.saveEvent();
			//clear the temp values
			cleanNewGuestVariable();
		} else {
			$log.info('you didn\'t enter a name and or email');
		}
	}

	vm.guestWillAttend = function(response) {
		var currentUser = ref.child('Users').child($routeParams.uid).child('events');
		var totalPendingInvitations = 0;
		var removeAttendingUpdated = false;
		
		//change attending to true in host's guestList
		vm.event.guestList[$routeParams.uid].attending = response;
		//change status to 'attending' in host's guestList
		vm.event.guestList[$routeParams.uid].status = 'attending';
		
		//get the invitation details
		currentUser.child('pending').on('value', function(snapshot) {
			//define local varialbe
			var invitations = snapshot.val();
			//log starting values
			$log.info(invitations);
			$log.info(invitations[$routeParams.hostId]);
			$log.info(invitations[$routeParams.hostId][$routeParams.eventId]);

			var thisInvitation = invitations[$routeParams.hostId][$routeParams.eventId];
			
			$log.info(thisInvitation);
			
			//check # of iniviations
			for(invitation in invitations) {
				totalPendingInvitations++;
			}

			//report # of invitations
			$log.info("total attending: " + totalPendingInvitations);
			
			//add the event to the guest's attending list
			if(response) currentUser.child('attending').child($routeParams.hostId).child($routeParams.eventId).set(thisInvitation, function(error) {
				if(error) $log.info(error);
			});

		});

		//if the updated placeholder was on the attending list remove it
		currentUser.child('attending').on('value', function(snapshot) {
			//local variables
			var attendingList = snapshot.val();
			
			//report actions
			$log.info('this is the attending list');
			$log.info(attendingList);
			
			//throw flag for later
			if(attendingList.updated) removeAttendingUpdated = true;

		}, function(error) {
			//if ther was an error report it
			if(error) $log.info(error);
		});

		//if this is the last pending event on the guest's pending list, add the updated placeholder
		if(totalPendingInvitations < 2) {
			//local variables
			var currentDate = new Date();

			//replace with updated field
			currentUser.child('pending').update({
				updated: dateTimeToUnixTime(currentDate)
			}, function(error) {
				if(error) $log.info(error);
			});
		}

		//remove the event from the guest's pending list
		currentUser.child('pending').child($routeParams.hostId).remove();

		//if there was an updated field in attending, remove it
		if(removeAttendingUpdated) {
			$log.info('removing the updated placeholder');
			//currentUser.child('attending').child('updated').remove();
		}

		//save changes
		vm.event.$save();
	}

	vm.updateUpdatedParam = function() {
		var currentUser = ref.child('Users').child($routeParams.uid).child('events');
		
		$log.info('updating the param');
		currentUser.child('attending').on('value', function(snapshot) {
			$log.info(snapshot.val());
		});
		currentUser.child('attending').child('updated').remove();
	}

	vm.addInvitationToAttending = function(response) {
		var currentUser = ref.child('Users').child($routeParams.uid).child('events');
		var totalPendingInvitations = 0;

		//get the invitation details
		currentUser.child('pending').on('value', function(snapshot) {
			//define local varialbe
			var invitations = snapshot.val();
			var thisInvitation = invitations[$routeParams.hostId][$routeParams.eventId];
			
			//log starting values
			$log.info(invitations);
			$log.info(invitations[$routeParams.hostId]);
			$log.info(invitations[$routeParams.hostId][$routeParams.eventId]);
			
			//check # of iniviations
			for(invitation in invitations) {
				totalPendingInvitations++;
			}

			//report # of invitations
			$log.info("total pending invitations: " + totalPendingInvitations);
			
			$log.info(response);
			//add the event to the guest's attending list
			if(response) currentUser.child('attending').child($routeParams.hostId).child($routeParams.eventId).set(thisInvitation, function(error) {
				if(error) $log.info(error);
			});



		});
	}

	//execution
	$log.info($routeParams.uid);
	$log.info($routeParams.eventId);

	//check user to determine state
	checkForHost();
	checkIfGuestIsAttending();

	if(!vm.showIfHost) openAllSections();
}
