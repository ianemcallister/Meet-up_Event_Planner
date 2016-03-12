angular
    .module('meetUpEventApp')
    .controller('MainController', MainController);

MainController.$inject = [];

function MainController() {
	//declare local variables
	var vm = this;
	//var ref = new Firebase('https://meetupplanner.firebaseio.com');

	//define methods
	/*
	vm.authDataCallback = function(authData) {
		if(authData) {
			$log.info('User ' + authData.uid + ' is logged in with ' + authData.provider);
			//$location.path('/user/' + authData.uid);
		} else {
			$log.info('User is logged out');
		}
	}

	//define callbacks
	ref.onAuth(vm.authDataCallback);*/
}