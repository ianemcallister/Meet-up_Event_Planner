angular
    .module('meetUpEventApp')
    .controller('AnEventController', AnEventController);

AnEventController.$inject = ['$log', '$location', 'userData'];

function AnEventController($log, $location, userData) {
	$log.info('into a single event controller');
}
