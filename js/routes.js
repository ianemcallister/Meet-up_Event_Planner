//routes
meetUpEventApp.config(function ($routeProvider) {

	$routeProvider

	.when('/', {
		templateUrl: 'views/landingPage.htm',
		controller: 'landingController'
	})

	.when('/login', {
		templateUrl: 'views/login.htm',
		controller: 'loginController'
	})

	.when('/Users/:user', {
		templateUrl: 'views/userDash.htm',
		controller: 'userDashController'
	})

	.when('/Events/:userEvent', {
		templateUrl: 'views/event.htm',
		controller: 'eventController'
	});

});
