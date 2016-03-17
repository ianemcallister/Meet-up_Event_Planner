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
	vm.events = { pendingInvites: {}, attending: {}, hosting: {}, completed: {} };
	vm.message = 'does this work?';

	//declare methods
	vm.eventRedirect = function(path, eventID, credentials) {
		var fullPath = path + '/' + eventID + '/' + $routeParams.uid + '/' + $routeParams.token;
		//redirect
		$log.info('redirecting to: ' + fullPath);
		$location.path(fullPath);
	}

	vm.eventsAreBeingHosted = function() {
		return true;
	}

	vm.percentRSVPed = function(guestList) {
		return 60;
	}

	vm.totalAttending = function(guestList) {
		return 6;
	}

	vm.totalInvited = function(guestList) {
		return 10;
	}

	vm.createNewEvent = function() {
		$log.info('you\'re creating a new event!');
		//define credentials
		var redirectCreds = {uid: currentUserData.getUID(), token:currentUserData.getToken()}

		//define the eventID
		var date = new Date();
		var eventID = (Date.parse(date) * 10) + Object.keys(vm.events.hosting).length;
 
		$log.info('today is: ' + Date.parse(date));
		$log.info('eventID is: ' + eventID);

		//create event model to start with
		ref.child('Users').child($routeParams.uid).child('hosting').child(eventID).set({
			eventTimes: {
				start: Date.parse(date),
				end: Date.parse(date)
			}
		});

		//redirect to the new Event Page
		vm.eventRedirect('/event', eventID, redirectCreds);
	}

	vm.redirectToHostedEvent = function(eventObject) {
		$log.info('the event object is: ' + eventObject);
	}

	vm.loadAllEvents = function() {
		var allUserEvents = { pendingInvites: [], attending: [], hosting: [], completed: [] };

		ref.child('Users').child($routeParams.uid).on('value', function(snapshot) {
			//set hosting object equal to the returned value
			var userProfile = snapshot.val();
			$log.info(userProfile);

			if(userProfile.pendingInvites) allUserEvents.pendingInvites = userProfile.pendingInvites;
			if(userProfile.attending) allUserEvents.attending = userProfile.attending;
			if(userProfile.hosting) allUserEvents.hosting = userProfile.hosting;
			if(userProfile.completed) allUserEvents.completed = userProfile.completed;

			vm.events = allUserEvents;
			$log.info('finished uploading');
			vm.message = 'this is now finished';
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
