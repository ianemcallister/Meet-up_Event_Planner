angular
    .module('meetUpEventApp')
    .controller('UserEventsController', UserEventsController);

UserEventsController.$injector = ['$log', '$location', '$firebaseArray','dataservice', 'Auth', 'userData'];

function UserEventsController($log, $location, $firebaseArray, dataservice, Auth, userData) {
	//declare local variables
	var vm = this;
	var fbURL = new Firebase('https://meetupplanner.firebaseio.com/users/0841e1bc-91b8-4033-a868-5a9a85a08380/messages');
	vm.name = 'User Events Controller';

	//load user events
	vm.init = function(invitation) {
		vm.invitation = invitation;

		alert('running init');
		vm.data = $firebase(new Firebase(fbURL));
		
		//vm.data.$on('loaded', checkInvites);
		//vm.data.$on('change', checkInvites);
	}

	vm.userObjects = $firebaseArray(fbURL);

	

}