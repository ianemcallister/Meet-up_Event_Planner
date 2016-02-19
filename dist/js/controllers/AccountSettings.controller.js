angular
    .module('meetUpEventApp')
    .controller('AccountSettingsController', AccountSettingsController);

function AccountSettingsController() {
	var vm = this;
	vm.name = 'Account Settings Controller';
	vm.sendMessage = function() { };
}