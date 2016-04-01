/* HostedEventsList.directive.js */

/**
* @desc displays a list of all the events the current user is hosting.
* @example <hosted-events-list></hosted-events-list>
*/

angular
	.module('meetUpEventApp')
	.directive('hostedEventsList', hostedEventsList);

/* @ngInject */
function hostedEventsList() {
	var directive = {
		restrict: 'AECM',
		templateUrl: 'views/directives/hostedEventsList.directive.htm',
		replace: true,
		scope: {
			hostedEvents: '=',
			userId: '='
		},
		link: linkFunc,
		controller: hostedEventsListController,
		controllerAs: 'vm',
		bindToController: true
	}

	/* @ngInject */
	function linkFunc(scope, el, attr, ctrl) {
		scope.$watch('hostedEvents', function(next, current) {
			//something
		});
    }

    hostedEventsListController.$inject = ['$log', 'trafficValet'];
    /* @ngInject */
    function hostedEventsListController($log, trafficValet) {
	    var vm = this;

	    //local variables
	    var hostedEventsSherpa = trafficValet;

	    //view model variables
	    vm.guestsAreInvited = false;

	    //local methods
	    function unixTimeToDateTime(unixTime) {
			return new Date(parseInt(unixTime));
		};

		function countGuests(list) {
			//declare local variable
			var counter = 0;

			//if we're counting, then there's a list, so throw the flag
			vm.guestsAreInvited = true;

			Object.keys[list].forEach(function(guest) {
				counter++;
			})

			return counter;
		}

		//view model methods
		vm.formatDate = function(unixTime) {
			//reformat the time
			
			return unixTimeToDateTime(unixTime);
		}

		vm.guestsAttending = function(guestList) {
			if(angular.isDefined(guestList)) {
				if(angular.isDefined(guestList['attending'])) return countGuests(guestList['attending']);
				else return 0;
			}
			else return 0;
		}

		vm.guestsInvited = function(guestList) {
			if(angular.isDefined(guestList)) {
				//declare local variables
				var guestCount = { attending: 0, pending: 0, declined: 0 };

				//local methods
				function totalGuestCount() {
					return guestCount.attending + guestCount.pending + guestCount.declined;
				} 

				//check values
				if(angular.isDefined(guestList['attending'])) guestCount.attending = countGuests(guestList['attending']);
				if(angular.isDefined(guestList['pending'])) guestCount.pending = countGuests(guestList['pending']);
				if(angular.isDefined(guestList['declined'])) guestCount.declined = countGuests(guestList['declined']);

				return totalGuestCount();
			}
			else return 0;
		}

		vm.percentageAttending = function(guestList) {
			if(angular.isDefined(guestList)) {
				return (guestsAttending(guestlist) / guestsInvited(guestList));
			}
			else return 0;
		}

		vm.eventClicked = function(eventID) {
			//redirect to the event page
			//$log.info('redirecting to: /event/' + eventID + '/' + vm.hostedEvents[eventID].host.uid + '/' + vm.userId);
			hostedEventsSherpa.redirectTo('/event', eventID, vm.hostedEvents[eventID].host.uid, vm.userId);
		}

		vm.inviteGuests = function(eventId) {
			hostedEventsSherpa.redirectTo('/event/host', eventId, vm.hostedEvents[eventId].host.uid, '3');
		}

		//actions
	}

	return  directive;
		
};