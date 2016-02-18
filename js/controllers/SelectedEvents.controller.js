angular
    .module('meetUpEventApp')
    .controller('SelectedEventsController', SelectedEventsController);

function SelectedEventsController() {
	var vm = this;
	vm.name = 'Selected Events Controller';
	vm.sendMessage = function() { };
}