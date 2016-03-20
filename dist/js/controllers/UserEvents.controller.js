angular
    .module('meetUpEventApp')
    .controller('UserEventsController', UserEventsController);

UserEventsController.$inject = ['$scope', '$log', '$location', '$routeParams', '$firebaseObject'];

function UserEventsController($scope, $log, $location, $routeParams, $firebaseObject) {
	var vm = this;
	var fbURL = 'https://meetupplanner.firebaseio.com/';
	var ref = new Firebase(fbURL);
	var userEvents = ref.child('Users').child($routeParams.uid).child('events');
	var currentUserBio = ref.child('Users').child($routeParams.uid).child('bio');
	var userEventsSnapshot;

	//binding important variables
	vm.events = $firebaseObject(userEvents);

	currentUserBio.child('name').on('value', function(snapshot) {
		vm.currentUserName = snapshot.val();
		$log.info('got the user name');
		$scope.$apply();
	}, function(errorObject) {
		$log.info("The read failed: " + errorObject.code);
	});

	//declare local methods
	function unixTimeToDateTime(unixTime) {
		return new Date(parseInt(unixTime));
	};

	function dateTimeToUnixTime(dateTime) {
		return Date.parse(dateTime);
	};

	function generateEventID(date, noOfEventsAlready) {
		return (date * 10) + noOfEventsAlready;
	}

	//declare view methods
	function eventRedirect(path, eventID, hostId) {
		var fullPath = path + '/' + eventID + '/' + hostId + '/'+ $routeParams.uid + '/' + $routeParams.token;
		//redirect
		$log.info('redirecting to: ' + fullPath);
		$location.path(fullPath);
	}

	vm.eventsAreBeingHosted = function() {
		var eventFound = false;
		for(element in vm.events.hosting) {
			if(element != 'updated'){
				eventFound = true;
			}
		}
		return eventFound;
	}

	vm.eventInvitationsPending = function() {
		var eventFound = false;
		for(element in vm.events.pending) {
			if(element != 'updated'){
				eventFound = true;
			}
		}
		return eventFound;
	}

	vm.attendingEvents = function(guestList) {
		var eventFound = false;
		for(element in vm.events.attending) {
			if(element != 'updated'){
				eventFound = true;
			}
		}
		return eventFound;
	}

	vm.percentRSVPed = function(guestList) {		
		if(guestList) {
			return (vm.totalAttending(guestList) / vm.totalInvited(guestList)) * 100;
		}
		else return 0;
	}

	vm.totalAttending = function(guestList) {
		if(guestList) {
			var attending = 0;
			angular.forEach(guestList, function(guest, id) {
				if(guest.attending == true) attending++;
			});
			return attending;
		}
		else return 0;
	}

	vm.totalInvited = function(guestList) {
		if(guestList) {
			var invited = 0;
			angular.forEach(guestList, function(guest, id) {
				invited++;
			});
			return invited;
		}
		else return 0;
	}

	vm.acceptEventInvitation = function(event) {
		/*
		$log.info(event.host);
		$log.info(event.id);
		//update hosts' lists
		ref.child('Users').child(event.host).child('events').child('hosting').child(event.id).child('guestList').child($routeParams.uid).update({
			attending: true,
			status: 'attndng'
		});

		//update guest's lists
		//add to the attending list - on the server
		userEvents.child('attending').child(event.host).child(event.id).set({
			id: event.id,
			host: event.host,
			eventTimes: {
				start: vm.events.pending[event.host][event.id].eventTimes.start,
				end: vm.events.pending[event.host][event.id].eventTimes.end
			},
			name: vm.events.pending[event.host][event.id].name
		});
		//add to the attending list - in the browser
		vm.events.attending[event.host][event.id] = {
			id: event.id,
			host: event.host,
			eventTimes: {
				start: vm.events.pending[event.host][event.id].eventTimes.start,
				end: vm.events.pending[event.host][event.id].eventTimes.end
			},
			name: vm.events.pending[event.host][event.id].name
		};

		//remove from the pending list - on the server
		userEvents.child('pending').child(event.host).child(event.id).remove();
		//remove from the pending list - in the browser
		vm.events.pending[event.host][event.id] = {};
		*/
	}

	vm.redirectToHostedEvent = function(eventID) {
		$log.info('you\'re accessing event ' + eventID);

		//redirect to the event
		eventRedirect('/event', eventID, $routeParams.uid);
	}

	vm.redirectTo3rdPartyEvent = function(event, inviteStatus) {
		$log.info(event);

		//getting the host's Id
		if(inviteStatus == 'pending') {
			$log.info('accessing from a pending invitation');
			$log.info(event);
			eventRedirect('/event', event.id, event.host);

		} else if(inviteStatus == 'attending') {
			$log.info('accessing from an rsvped invitation');
			eventRedirect('/event', event.id, event.host);
		}

		//redirecting to the event

	}

	vm.createNewEvent = function() {
		$log.info('you\'re creating a new event!');

		//define the eventID
		var date = new Date(); 
			if(vm.events.hosting) noOfEventsAlready = Object.keys(vm.events.hosting).length;
			else noOfEventsAlready = 0;
		var eventID = generateEventID(dateTimeToUnixTime(date), noOfEventsAlready);

		//create event model to start with
		//$log.info(vm.events['hosting']);
		vm.events.hosting[eventID] = {
			id: eventID,
			eventTimes: {
				start: dateTimeToUnixTime(date),
				end: dateTimeToUnixTime(date)
			},
			host: { 
				id: $routeParams.uid,
				name: vm.currentUserName
			}
		};

		//delete the 'updated' field
		if(vm.events.hosting.updated == '' || vm.events.hosting.updated) {
			$log.info('deleting the updated field');
			delete vm.events.hosting.updated;
		}
		//save the new event
		vm.events.$save().then(function() {
			$log.info('Profile saved!');
			$log.info(vm.events.hosting[eventID]);
		}).catch(function(error) {
			$log.info('Error!');
		});

		//redirect to the new Event Page
		eventRedirect('/event', eventID, $routeParams.uid);
	}

	//execute scripts
	$log.info('into the user Events controller');
	$log.info(vm.events);

}
