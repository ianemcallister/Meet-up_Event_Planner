angular
    .module('meetUpEventApp')
    .factory('trafficValet', trafficValet);

trafficValet.$inject = ['$log', '$location'];

/* @ngInject */
function trafficValet($log, $location) {
	//declare local variables
	var allTrafficControls = {
		redirectTo: redirectTo
	};

	function redirectTo(path, param1, param2) {
		if(angular.isDefined(param1)) {
			path = path + '/' + param1;

			if(angular.isDefined(param2)) {
				//go to path with 2 params
				path = path + '/' + param2;
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

	return allTrafficControls;
}