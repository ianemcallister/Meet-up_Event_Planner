angular
    .module('meetUpEventApp')
    .controller('topMenuController', topMenuController);

topMenuController.$inject = ['$scope', '$log', '$location'];

function topMenuController($scope, $log, $location) {
	var vm = this;
	var fbURL = 'https://meetupplanner.firebaseio.com/';
	var ref = new Firebase(fbURL);

	//local variables
	vm.loggedIn = false

	// Create a callback which logs the current auth state
	function authDataCallback(authData) {
	  if (authData) {
	    $log.info("User " + authData.uid + " is logged in with " + authData.provider);
	    vm.loggedIn = true;
	  } else {
	    $log.info("User is logged out");
	    vm.loggedIn = false;
	  }
	}

	function redirect(path, userData) {
		var fullPath = path + '/' + userData.uid + '/' + userData.token;
		//redirect
		$log.info('redirecting to: ' + fullPath);
		$location.path(fullPath);
		//$scope.$apply();
	}

	//vm accessible methods
	vm.logout = function() {
		$log.info('logging out!');
		ref.unauth();
		redirect('/', {uid:'', token:''});
	}

	vm.navBarLoginRegisteredUser = function() {
		$log.info('launching login');
		if(true) {
		//if(vm.unclockUserLoginBtn.usable) {
			//define local variable
			var ref = new Firebase(fbURL);

			//authenticate the user
			ref.authWithPassword({
				email: vm.navbarUserEmail,
				password: vm.navbarUserPass
			}, function(error, authData) {
				if(error) {
					$log.info('Error Logging In: ' + error);
				} else {
					$log.info('Logged In successfully: ' + authData.uid);
					$log.info(authData);
					//save all the data

					//load user bio
					//load user events

					//redirect
					redirect('/userInformation', authData);
					$scope.$apply();
				}
			});

		}

	}

	// Register the callback to be fired every time auth state changes
	ref.onAuth(authDataCallback);
}