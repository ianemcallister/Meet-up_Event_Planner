angular
    .module('meetUpEventApp')
    .controller('UserEventsController', UserEventsController);

UserEventsController.$inject = ['$log', '$location', 'userData'];

function UserEventsController($log, $location, userData) {
	var vm = this;
	var currentUserData = userData;

	//declare and initialize local variables
	vm.events = {pendingInvites: {}, attending: {}, hosting: {}, completed: {}};

	$log.info('into the user Events controller');

	vm.eventRedirect = function(path, eventID, credentials) {
		var fullPath = path + '/' + eventID + '/' + userData.uid + '/' + userData.token;
		//redirect
		$log.info('redirecting to: ' + fullPath);
		$location.path(fullPath);
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

		//redirect to the new Event Page
		vm.eventRedirect('/event', eventID, redirectCreds);
	}
}
