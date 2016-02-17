angular
	.module('meetUpEventApp')
	.config(config);

function config($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/landingPage.htm',
			controller: 'LandingController',
			controllerAs: 'ctl'
		})
		.when('/login', {
			templateUrl: 'views/loginPage.htm',
			controller: 'LoginController',
			controllerAs: 'ctl'
		})
		.otherwise({
			redirectTo: '/'
		});
}

/*angular.module('meetUpEventApp', ['ngRoute'])
	.config(function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'views/landingPage.htm',
			controller: 'LandingController',
			controllerAs: 'ctl'
		})
		
		.when('/login', {
			templateUrl: 'views/login.htm',
			controller: 'LoginController',
			controllerAs: 'ctl'
		})
		.when('/userProfile/:uid', {
			templateUrl: 'views/userProfile.htm',
			controller: 'UserProfileController',
			controllerAs: 'ctl'
		})
		.when('/Users/:user', {
			templateUrl: 'views/userDash.htm',
			controller: 'UserDashController',
			controllerAs: 'ctl'
		})
		.when('/Events/:userEvent', {
			templateUrl: 'views/event.htm',
			controller: 'EventController',
			controllerAs: 'ctl'
		});
	});*/