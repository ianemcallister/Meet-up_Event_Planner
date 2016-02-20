angular
    .module('meetUpEventApp')
    .controller('MainController', MainController);

MainController.$inject = ['$scope','$location', '$log', 'Auth'];

function MainController($scope, $location, $log, Auth) {
	var vm = this;

	$log.info('testing');

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