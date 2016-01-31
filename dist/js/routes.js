//routes
meetUpEventApp.config(function ($routeProvider) {

	$routeProvider

	.when('/', {
		templateUrl: 'pages/landingPage.htm',
		controller: 'eventsController'
	});

});
