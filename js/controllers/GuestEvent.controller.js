meetUpEventApp.controller('GuestEventController', GuestEventController);

GuestEventController.$inject = ['$log'];

/* @ngInject */
function GuestEventController($log) {
	$log.info('into the GuestEventController');
}