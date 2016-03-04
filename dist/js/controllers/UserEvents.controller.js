angular
    .module('meetUpEventApp')
    .controller('UserEventsController', UserEventsController);

UserEventsController.$injector = ['$scope', '$log', '$location', '$firebaseArray','dataservice', 'Auth', 'userData2'];

function UserEventsController($scope, $log, $location, $firebaseArray, dataservice, Auth, userData2) {
	//declare local variables
	var vm = this;
	var fbURL = new Firebase('https://meetupplanner.firebaseio.com/users/0841e1bc-91b8-4033-a868-5a9a85a08380/messages');
	vm.name = 'User Events Controller';
	var pendingInvitations = userData2;

	$log.info(pendingInvitations.getPendingInvitations());
	
	vm.pendingInvitations = { 'list':[
		{'title':'Lacy\'s Awesome Party','message':'We\'ll have a grand old time!', 'id':'0092', 'startTime':'1288323623006'},
		{'title':'Shelby\'s Pool Party','message':'We\'ll make memories.', 'id':'19381', 'startTime':'1282324623006'},
		{'title':'Logan\'s Going Away Party','message':'We\'ll say goodbye!', 'id':'2375', 'startTime':'1678323623006'}
	]};

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