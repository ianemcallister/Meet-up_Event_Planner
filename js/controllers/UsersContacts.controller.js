angular
    .module('meetUpEventApp')
    .controller('UsersContactsController', UsersContactsController);

function UsersContactsController() {
	var vm = this;
	vm.name = 'Users Contacts Controller';
	vm.sendMessage = function() { };
}