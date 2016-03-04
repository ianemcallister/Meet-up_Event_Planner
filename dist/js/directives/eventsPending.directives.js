/* eventsPending.directives.js */

/**
* @desc order directive to format pending event requests
* @example <div pending-events-list></div>
*/
angular
    .module('meetUpEventApp')
    .directive('pendingEventsList', pendingEventsList);

function pendingEventsList () {
	var directive = {
		restrict: 'E',
		templateUrl: 'views/directives/pendingEventsList.htm',
		replace: true,
		scope: {
			anEvent: '='
		},
		controller: PendingEventsController,
		controllerAs: 'vm',
		bindToController: true
	};

	return directive;
}

function PendingEventsController() {
	var vm = this;
	vm.pendingInvitations = { 'list':[
		{'title':'Lacy\'s Awesome Party','message':'We\'ll have a grand old time!', 'id':'0092', 'startTime':'1288323623006'},
		{'title':'Shelby\'s Pool Party','message':'We\'ll make memories.', 'id':'19381', 'startTime':'1282324623006'},
		{'title':'Logan\'s Going Away Party','message':'We\'ll say goodbye!', 'id':'2375', 'startTime':'1678323623006'}
	]};
}