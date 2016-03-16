angular
    .module('meetUpEventApp')
    .directive('eventGuestList', eventGuestList);

eventGuestList.$inject = ['$log'];

function eventGuestList () {
	var directive = {
		restrict: 'E',
		templateUrl: 'views/directives/eventGuestList.htm',
		replace: true,
		scope: {
			theEvent: '='
		},
		controller: eventGuestListController,
		controllerAs: 'vm',
		bindToController: true
	};

	return directive;
}

function eventGuestListController($log) {
	$log.info('in the eventGuestListController directive');
	var theEvent = {
		tempGuestList: {
			0: {
				status: 'attnd',
				name: 'ian',
				email: 'testing@gmail.com'
			}
		}
	};
	$log.info(theEvent.tempGuestList);
}