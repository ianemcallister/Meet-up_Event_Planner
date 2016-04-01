/* PendingEventsList.directive.js */

/**
* @desc displays a list of all the events the current user is hosting.
* @example <pending-events-list></pending-events-list>
*/

angular
	.module('meetUpEventApp')
	.directive('pendingEventsList', pendingEventsList);

/* @ngInject */
function pendingEventsList() {
	var directive = {
		restrict: 'AECM',
		templateUrl: 'views/directives/pendingEventsList.directive.htm',
		replace: true,
		scope: {
			pendingEvents: '=',
			userId: '='
		},
		link: linkFunc,
		controller: pendingEventsListController,
		controllerAs: 'vm',
		bindToController: true
	}

	/* @ngInject */
	function linkFunc(scope, el, attr, ctrl) {
		scope.$watch('hostedEvents', function(next, current) {
			//something
		});
    }

    pendingEventsListController.$inject = ['$log', 'trafficValet'];
    /* @ngInject */
    function pendingEventsListController($log, trafficValet) {
	    var vm = this;

	    //local variables

	    //view model variables
	    vm.pendingEvents = {}

	    //local methods
		function unixTimeToDateTime(unixTime) {
			return new Date(parseInt(unixTime));
		};

		function dateTimeToUnixTime(dateTime) {
			return Date.parse(dateTime);
		};
	  	
	  	function buildTomorrowDate() {
	  		var today = new Date();

	    	//round to the nearest hour, cut off anything smaller
			today.setHours(today.getHours() + Math.round(today.getMinutes()/60));
			today.setMinutes(0);
			today.setSeconds(0);
			today.setMilliseconds(0);

	    	today = dateTimeToUnixTime(today);

	    	var tomorrow = today + (1000*60*60*24);
	    	
	    	return tomorrow;
	    }

	  	function addWelcomeEvent() {
	  		vm.pendingEvents = {
		    	welcome: {
		    		name: 'Meet-up Event Planner Welcome Event',
		    		message: 'Thanks for trying out Meet-up Event Planner!  Click here to learn more.',
		    		eventTimes: {
		    			end: (buildTomorrowDate() + (1000*60*60*3)),
		    			start: buildTomorrowDate()
		    		},
		    		rsvped: false,
		    		accepted: false,
		    		accept: function() {
		    			this.rsvped = true;
		    			this.accepted = true;
		    		},
		    		decline: function() {
		    			this.rsvped = true;
		    			this.accepted = false;
		    		}
		    	}
		    }
	  	}

	  	//view model methods
	  	vm.eventClicked = function() {

	  	}

	  	vm.formatDate = function(unixTime) {
	  		return unixTimeToDateTime(unixTime);
	  	}

		//take action
		addWelcomeEvent();
	}

	return  directive;
		
};