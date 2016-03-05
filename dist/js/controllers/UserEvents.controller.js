angular
    .module('meetUpEventApp')
    .controller('UserEventsController', UserEventsController);

UserEventsController.$injector = ['$log', '$location', 'dataservice', 'Auth', 'userData2'];

function UserEventsController($log, $location, dataservice, Auth, userData2) {
	//declare local variables
	var vm = this;
	var userEvents = userData2;

	//loading values
	vm.currentUser = userEvents.getUserBio();
	vm.pendingInvitations = userEvents.getPendingInvitations();
	vm.eventsAttending = userEvents.getEventsAttending();
	vm.eventsHosting = userEvents.getEventsHosting();

}