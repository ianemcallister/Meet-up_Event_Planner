angular
    .module('meetUpEventApp')
    .controller('AnEventController', AnEventController);

AnEventController.$inject = ['$log', '$location', 'userData'];

function AnEventController($log, $location, userData) {
	var vm = this;

	$log.info('into a single event controller');

	vm.submit = function() {
		$log.info('submitting the form now!');
	}
}
