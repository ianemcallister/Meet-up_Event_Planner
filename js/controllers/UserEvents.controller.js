angular
    .module('meetUpEventApp')
    .controller('UserEventsController', UserEventsController);

UserEventsController.$inject = ['$scope', '$log', '$location', '$routeParams', 'userData'];

function UserEventsController($scope, $log, $location, $routeParams, userData) {
	var vm = this;
	var currentUserData = userData;
	var fbURL = 'https://meetupplanner.firebaseio.com/';
	var ref = new Firebase(fbURL);

	//declare and initialize local variables
	vm.events = { pending: {}, attending: {}, hosting: {}, completed: {} };

	//declare view methods
	vm.eventRedirect = function(path, eventID, credentials) {
		var fullPath = path + '/' + eventID + '/' + $routeParams.uid + '/' + $routeParams.token;
		//redirect
		$log.info('redirecting to: ' + fullPath);
		$location.path(fullPath);
	}

	vm.eventsAreBeingHosted = function() {
		if(vm.events.hosting) {
			for(event in vm.events.hosting) {
				return true;
			}
		} else return false;
	}

	vm.eventInvitationsPending = function() {
		if(vm.events.pending) {
			for(event in vm.events.pending) {
				return true;
			}
		} else return false;
	}

	vm.attendingEvents = function(guestList) {
		if(vm.events.attending) {
			for(event in vm.events.attending) {
				return true;
			}
		} else return false;
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
		$log.info(event.host);
		$log.info(event.id);
		//update hosts' lists
		ref.child('Users').child(event.host).child('hosting').child(event.id).child('guestList').child($routeParams.uid).update({
			attending: true,
			status: 'attndng'
		});

		//update guest's lists
		//add to the attending list - on the server
		ref.child('Users').child($routeParams.uid).child('attending').child(event.host).child(event.id).set({
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
		ref.child('Users').child($routeParams.uid).child('pending').child(event.host).child(event.id).remove();
		//remove from the pending list - in the browser
		vm.events.pending[event.host][event.id] = {};
	}

	vm.redirectToHostedEvent = function(eventID) {
		$log.info('you\'re accessing event ' + eventID);
		//define credentials
		var redirectCreds = {uid: eventID, token:$routeParams.token};

		//redirect to the event
		vm.eventRedirect('/event', eventID, redirectCreds);
	}

	vm.createNewEvent = function() {
		$log.info('you\'re creating a new event!');
		//define credentials
		var redirectCreds = {uid: currentUserData.getUID(), token:currentUserData.getToken()}

		//define the eventID
		var date = new Date();
		var eventID = (Date.parse(date) * 10) + Object.keys(vm.events.hosting).length;

		//create event model to start with
		ref.child('Users').child($routeParams.uid).child('hosting').child(eventID).set({
			id: eventID,
			eventTimes: {
				start: Date.parse(date),
				end: Date.parse(date)
			}
		});

		//redirect to the new Event Page
		vm.eventRedirect('/event', eventID, redirectCreds);
	}

	vm.loadAllEvents = function() {
		var allUserEvents = { pendingInvites: [], attending: [], hosting: [], completed: [] };

		ref.child('Users').child($routeParams.uid).on('value', function(snapshot) {
			//set hosting object equal to the returned value
			var userProfile = snapshot.val();

			if(userProfile.pending) allUserEvents.pending = userProfile.pending;
			if(userProfile.attending) allUserEvents.attending = userProfile.attending;
			if(userProfile.hosting) allUserEvents.hosting = userProfile.hosting;
			if(userProfile.completed) allUserEvents.completed = userProfile.completed;

			vm.events = allUserEvents;
			$scope.$apply();

		}, function(errorObject) {
			if(errorObject) {
				$log.info("The read failed: " + errorObject.code);
			}
		});

	}

	//execute scripts
	$log.info('into the user Events controller');

	//load hosted events
	vm.loadAllEvents();

}
