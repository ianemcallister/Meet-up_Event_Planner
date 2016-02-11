angular
	.module('meetUpEventApp')
	.config(['RoutesController']);

function RoutesController($routeParams) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/landingPage.htm',
		controller: 'landingController',
		controllerAs: 'landingPage'
	})
	.when('/login', {
		templateUrl: 'views/login.htm',
		controller: 'loginController',
		controllerAs: 'login'
	})
	.when('/userProfile/:uid', {
		templateUrl: 'views/userProfile.htm',
		controller: 'userProfileController',
		controllerAs: 'userProfile'
	})
	.when('/Users/:user', {
		templateUrl: 'views/userDash.htm',
		controller: 'userDashController',
		controllerAs: 'userDash'
	})
	.when('/Events/:userEvent', {
		templateUrl: 'views/event.htm',
		controller: 'eventController',
		controllerAs: 'event'
	});
}