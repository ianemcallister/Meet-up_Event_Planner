angular
    .module('meetUpEventApp')
    .controller('UserEventsController', UserEventsController);

UserEventsController.$injector = ['$log', '$location'];

function UserEventsController($log, $location) {
	//check user auth
	var ref = new Firebase('https://meetupplanner.firebaseio.com');
	ref.onAuth(function(authData) {
		if(authData) {
			$log.info('User: ', authData.uid);
		} else {
			$log.info('redirecting to login');
			$location.path('/login');
		}
	});

	//declare local variables
	var vm = this;

	//loading values
	//vm.currentUser = userEvents.getUserBio();
	//vm.pendingInvitations = userEvents.getPendingInvitations();
	//vm.eventsAttending = userEvents.getEventsAttending();
	//vm.eventsHosting = userEvents.getEventsHosting();

}