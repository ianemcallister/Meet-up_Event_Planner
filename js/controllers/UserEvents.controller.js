angular
    .module('meetUpEventApp')
    .controller('UserEventsController', UserEventsController);

UserEventsController.$inject = ['$log', '$routeParams', 'userData', 'trafficValet'];

/* @ngInject */
function UserEventsController($log, $routeParams, userData, trafficValet) {
	var vm = this;
	var currentUser = userData;

	//local view variables
	vm.showDecline = false;	//what is this being used for?
	vm.userBio = {}
	vm.events = {};
	vm.errors = {};

	//declare local methods
	function unixTimeToDateTime(unixTime) {
		return new Date(parseInt(unixTime));
	};

	function dateTimeToUnixTime(dateTime) {
		return Date.parse(dateTime);
	};

	function noOfHosteEvents() {
		//declare local variable
		var counter = 0;

		for(event in vm.events.hosting) counter++;

		return counter;
	}

	function generateEventID() {
		//declare local variables
		var date = new Date();
		var eventID = (dateTimeToUnixTime(date) * 10) + (noOfHosteEvents());

		return eventID;
	}

	function initialize() {
		//make sure the uid is set
		currentUser.setUIDLocally($routeParams.uid);

		//load the user bio
		currentUser.loadBio($routeParams.uid)
		.then(function(retrievedBio) {
			vm.userBio = retrievedBio;
		})
		.catch()

		//load user events progressivley
		//fist whatever is in the model already
		vm.events = currentUser.getAllUserEventsLocally();

		//then call to the db and get the most up to date info
		currentUser.getRemoteEventsForLocal()
		.then(function(obtainedUserEvents) {

			//log what was found
			$log.info('got this from the db');
			$log.info(obtainedUserEvents);

			//update the view model with the updated DB results
			vm.events = currentUser.getAllUserEventsLocally();
		})

	}

	//declare view methods
	vm.createNewEvent = function() {
		//define local variables
		var eventID = generateEventID();
		var newEventSherpa = trafficValet;

		$log.info('you\'re creating a new event! ' + eventID);

		//add the event to the modal (locally then on the db)
		currentUser.createNewEvent(eventID)
		.then(function(affirmativeResponse) {
			//report the success
			$log.info(affirmativeResponse);
		})
		.then(function() {
			//if there was an updated field, remove it now
			currentUser.cleanDBEventsCategory('hosting');

		})
		.catch(function(errorResponse) {
			//report the error
			$log.info(errorResponse);
		})
		

		//redirect to the new event page		
		newEventSherpa.redirectTo('/event', eventID, currentUser.getUIDLocally(), currentUser.getUIDLocally());
	}

	//execute scripts
	initialize();

}
