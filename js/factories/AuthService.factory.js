angular
    .module('meetUpEventApp')
    .factory('authService', authService);

authService.$inject = ['$log', '$q', '$location'];

/* @ngInject */
function authService($log, $q, $location) {
	var fbURL = 'https://meetupplanner.firebaseio.com/';
	var ref = new Firebase(fbURL);

	var allAuthServices = {
		isLoggedIn: isLoggedIn
	};

	return allAuthServices;

	function authDataCallback(authData) {
	  
	  if (authData) {
	    $log.info("User " + authData.uid + " is logged in with " + authData.provider);
	  } else {
	    $log.info("User is logged out...dumping them back to landing page");
	    //dump the user back out
	    $location.path('/');
	  }
	}

	function isLoggedIn() {
		//check the user authenticaion state
		$log.info('logging from the isLoggedIn Method');
		ref.onAuth(authDataCallback);
	}
}