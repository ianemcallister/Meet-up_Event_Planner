angular
    .module('meetUpEventApp')
    .controller('UserEventsController', UserEventsController);

UserEventsController.$injector = ['dataservice'];

function UserEventsController(dataservice) {
	var vm = this;
	vm.name = 'User Events Controller';

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