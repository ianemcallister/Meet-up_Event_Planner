angular
    .module('meetUpEventApp')
    .controller('NewVisitorConversionsController', NewVisitorConversionsController);

function NewVisitorConversionsController() {
	var vm = this;
	vm.name = 'New Visitor Conversions Controller';
	vm.sendMessage = function() { };
}