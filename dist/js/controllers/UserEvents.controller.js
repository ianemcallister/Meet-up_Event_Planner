angular
    .module('meetUpEventApp')
    .controller('UserEventsController', UserEventsController);

UserEventsController.$injector = ['$log', '$location', 'dataservice', 'Auth', 'userData'];

function UserEventsController($log, $location, dataservice, Auth, userData) {
	var vm = this;
	vm.name = 'User Events Controller';

	if(!Auth.isLoggedIn()) {
		alert('Denied');
		$location.path('/');
	} else {
		alert('congrats!');
		$location.path('/user');
	}

	vm.currentUser = dataservice.getUserProfile('0841e1bc-91b8-4033-a868-5a9a85a08380');

	//userData.initialize;

	$log.info(userData.getEventsAttending());

	/*
	vm.add = function() {
		var save = dataservice.$add({
			firstName: vm.firstName,
			lastName: vm.lastName
		});

		vm.firstName = '';
		vm.lastName = '';

		if(save) {
			alert('saved successfully');
		} else {
			alert('something went wrong');
		}
	}
	*/
	vm.sendMessage = function() { };
}