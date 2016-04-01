/* HostedGuestList.directive.js */

/**
* @desc displays a list of all guests invited to an event this user is hosting.
* @example <hosted-guest-list></hosted-guest-list>
*/

angular
	.module('meetUpEventApp')
	.directive('hostedGuestList', hostedGuestList);

/* @ngInject */
function hostedGuestList() {
	var directive = {
		restrict: 'AECM',
		templateUrl: 'views/directives/hostedGuestList.directive.htm',
		replace: true,
		scope: {
			guestList: '=',
		},
		link: linkFunc,
		controller: hostedGuestListController,
		controllerAs: 'vm',
		bindToController: true
	}

	/* @ngInject */
	function linkFunc(scope, el, attr, ctrl) {
		scope.$watch('guestList', function() {
			scope.$apply;
		});
    }

    hostedGuestListController.$inject = ['$log', '$routeParams', 'userData'];
    /* @ngInject */
    function hostedGuestListController($log, $routeParams, userData) {
	    var vm = this;

	    //local variables
	    vm.isAGuestList = false;

	    //local methods
	    function thereIsAGuestList() {
	    	//check for a guestList object
	    	if(angular.isDefined(vm.guestList) && vm.guestList != '') {
	    		vm.isAGuestList = true;
	    		return true;
	    	} else {
	    		vm.isAGuestList = false;
	    		return false;
	    	}
	    }

	    function init() {
	    	//local variables
	    	var listCollector = userData;

	    	//if there isn't a guest list, go out to the db to get it

			if(!thereIsAGuestList()) {
				//$log.info('going after the list');
				listCollector.getEventGuestList($routeParams.uid, $routeParams.eventId)
				.then(function(returnedList) {
					//$log.info('got the list');
					//$log.info(returnedList);
					vm.guestList = returnedList;
					if(angular.isObject(returnedList)) vm.isAGuestList = true;
				})
				.catch(function(error) { 
					//$log.info('There was an error: '+ error);
				})
			}
	    }
	    //vm methods

		//actions
		init();

	}

	return  directive;
		
};