/* AddAGuest.directive.js */

/**
* @desc displays a list of all guests invited to an event this user is hosting.
* @example <add-a-guest></add-a-guest>
*/

angular
	.module('meetUpEventApp')
	.directive('addAGuest', addAGuest);

/* @ngInject */
function addAGuest() {
	var directive = {
		restrict: 'AECM',
		templateUrl: '../views/directives/addAGuest.directive.htm',
		replace: true,
		scope: {
		},
		link: linkFunc,
		controller: addAGuestController,
		controllerAs: 'vm',
		bindToController: true
	}

	/* @ngInject */
	function linkFunc(scope, el, attr, ctrl) {
    }

    addAGuestController.$inject = ['$log'];
    /* @ngInject */
    function addAGuestController($log) {
	    var vm = this;

	    //local variables
	    vm.tempGuest = {
	    	name: '',
	    	email: ''
	    }

	    //local methods
	    function init() {}

	    //vm methods
	    vm.validateName = function() {}
	    vm.validateEmail = function() {}

		//actions
		init();

	}

	return  directive;
		
};