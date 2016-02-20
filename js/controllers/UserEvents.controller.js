angular
    .module('meetUpEventApp')
    .controller('UserEventsController', UserEventsController);

UserEventsController.$injector = ['$location', 'dataservice', 'Auth'];

function UserEventsController($location, dataservice, Auth) {
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