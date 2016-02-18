angular
    .module('meetUpEventApp')
    .controller('UserEventsController', UserEventsController);

function UserEventsController() {
	var vm = this;
	vm.name = 'User Events Controller';
	vm.sendMessage = function() { };
}