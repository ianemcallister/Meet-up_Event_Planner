angular
    .module('meetUpEventApp')
    .controller('MainController', MainController);

MainController.$inject = ['$scope','$location', '$log', 'Auth', 'userData2'];

function MainController($scope, $location, $log, Auth, userData2) {
	var vm = this;
	var pendingInvitations = userData2;

	$log.info('main testing');
	
	pendingInvitations.loadDatabaseValues();

	//force login if necessary
	$scope.$watch(Auth.isLoggedIn, function(value, oldvalue) {

		if(!value && oldvalue) {
			$location.path('/login');
		}

		if(value) {
			//do something when the user is connected
			alert('you\'re still logged in');
		}

	}, true);

}