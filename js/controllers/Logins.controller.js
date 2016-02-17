angular
    .module('meetUpEventApp')
    .controller('LoginsController', LoginsController);

function LoginsController() {
	var vm = this;
	vm.name = 'Login Controller';
	vm.sendMessage = function() { };
}