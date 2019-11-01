meetUpEventApp.controller('UserEventsController', UserEventsController);

UserEventsController.$inject = ['$log', '$routeParams', 'userData', 'trafficValet'];

/* @ngInject */
function UserEventsController($log, $routeParams, userData, trafficValet) {
	var vm = this;
	var currentUser = userData;

	//local view variables
	vm.showDecline = false;	//what is this being used for?
	vm.userBio = {}
	vm.events = {};
	vm.sectionAvailable = {
		pending: false,
		attending: false,
		hosting: false,
		completed: false
	};
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

	function checkForEvents() {
		
		//loop through all the event categories
		Object.keys(vm.events).forEach(function(category) {
			
			//inside each category count the number of event objects...NOT updated placeholder though
			Object.keys(vm.events[category]).forEach(function(eventID) {
				//declare local variable
				var counter = 0;
				//count events with id's / NOT 'updated' placeholders
				if(angular.isObject(vm.events[category][eventID])) counter++;
				
				//if at least one event id (object) was counted, then show the section
				if(counter > 0) vm.sectionAvailable[category] = true;
				else vm.sectionAvailable[category] = false;
			});

		});

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
		//first whatever is in the model already
		vm.events = currentUser.getAllUserEventsLocally();

		//$log.info(vm.events);
		//then call to the db and get the most up to date info
		currentUser.getRemoteEventsForLocal()
		.then(function(obtainedUserEvents) {
			//$log.info(obtainedUserEvents);
			//update the view model with the updated DB results
			vm.events = currentUser.getAllUserEventsLocally();

			//take out the updated object to clean up for new users
			delete vm.events.pending.updated;
			delete vm.events.pending[undefined];
			
			var count = 0;
			Object.keys(vm.events.hosting).forEach(function(key) {
				count++;
			});
			//take away for hosting also
			if(count > 1) {
				delete vm.events.hosting.updated;
				delete vm.events.hosting[undefined];
			}
		})
		.then(function() {
			//now that events are loaded, reflect it in the view model
			checkForEvents();
		})

	}

	//declare view methods
	vm.createNewEvent = function() {
		//define local variables
		var eventID = generateEventID();
		var newEventSherpa = trafficValet;

		//add the event to the modal (locally ONLY)
		currentUser.createNewEvent(eventID)
		/*.then(function(affirmativeResponse) {
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
		})*/
		

		//redirect to the new event page		
		newEventSherpa.redirectTo('/event', eventID, currentUser.getUIDLocally(), currentUser.getUIDLocally());
	}

	//execute scripts
	initialize();

}
