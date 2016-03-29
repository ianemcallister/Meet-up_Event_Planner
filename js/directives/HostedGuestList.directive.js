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
		templateUrl: '../views/directives/hostedGuestList.directive.htm',
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
    }

    hostedGuestListController.$inject = ['$log'];
    /* @ngInject */
    function hostedGuestListController($log) {
	    var vm = this;

	    //local variables
	    vm.isAGuestList = false;

	    //local methods
	    function thereIsAGuestList() {
	    	//check for a guestList object
	    	if(angular.isDefined(vm.guestList)) {
	    		vm.isAGuestList = true;
	    		return true;
	    	} else {
	    		vm.isAGuestList = false;
	    		return false;
	    	}
	    }

	    function init() {
	    	//if there isn't a guest list, create a temp
			if(thereIsAGuestList()) {
				vm.guestList = {}
			}
	    }
	    //vm methods

		//actions
		init();

	}

	return  directive;
		
};