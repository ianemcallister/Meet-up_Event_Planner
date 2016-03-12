angular
    .module('meetUpEventApp')
    .controller('LoginsController', LoginsController);

LoginsController.$inject = [];

function LoginsController() {
	var vm = this;
	vm.name = 'Login Controller';
	vm.login = function() {
		Auth.setUser(user);
	};

	vm.sendMessage = function() { };
}