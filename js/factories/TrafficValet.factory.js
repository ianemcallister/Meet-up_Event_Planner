angular
    .module('meetUpEventApp')
    .factory('trafficValet', trafficValet);

trafficValet.$inject = ['$log', '$location'];

/* @ngInject */
function trafficValet($log, $location) {
	//declare local variables
	var allTrafficControls = {
		redirectTo: redirectTo,
		eventRoute: eventRoute
	};

	function redirectTo(path, param1, param2, param3) {
		if(angular.isDefined(param1)) {
			path = path + '/' + param1;

			if(angular.isDefined(param2)) {
				//go to path with 2 params
				path = path + '/' + param2;

				if(angular.isDefined(param3)) {
					path = path + '/' + param3;

					$log.info('redirecting now to ' + path);
					$location.path(path);
				}

				$log.info('redirecting now to ' + path);
				$location.path(path);
			}
			//go with 1 param
			$log.info('redirecting now to ' + path);
			$location.path(path);
		} else {
			//just go to path
			$log.info('redirecting now to ' + path);
			$location.path(path);
		}

	}

	function eventRoute(eventId, hostId, userId, section) {
		$log.info('Traffic valet accessed');
		$log.info('eventId: ' + eventId);
		$log.info('hostId: ' + hostId);
		$log.info('userId: ' + userId);

		//if there isn't a section set to default
		if(angular.isUndefined(section)) section = 1;

		//if the hostId and userId match, launch host view
		if(hostId === userId) { 
			var path = '/event/host/' + eventId + '/' + userId + '/'+ section;
			$log.info(path);
			//redirect
			$location.path(path);
		}
		//if the hostId and userId DON'T match, launch guest view
		else {
			var path = '/event/guest/' + eventId + '/' + userId + '/' + hostId;
			$log.info(path);
			//redirect
			$location.path(path);
		}
	}

	return allTrafficControls;
}