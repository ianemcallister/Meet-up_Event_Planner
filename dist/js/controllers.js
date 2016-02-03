//controllers
meetUpEventApp.controller('homeController', ['$scope', function ($scope) {

	$scope.title = 'home';
}]);

meetUpEventApp.controller('landingController', ['$scope', function ($scope) {

	$scope.title = 'Landing Page';

	console.log('app.js is working!');
}]);

meetUpEventApp.controller('userDashController', ['$scope', '$routeParams', function ($scope, $routeParams) {

	$scope.title = 'User Dashboard';

	$scope.activeUser = $routeParams.user || 'Anonymous';

	console.log('user Dash is working');

}]);

meetUpEventApp.controller('eventController', ['$scope', '$routeParams', '$firebase', function ($scope, $routeParams, $firebase) {

	console.log('events page loaded');

	$scope.activeEvent = $routeParams.userEvent || 'Randome Event';

	//build firebase object reference
	var ref = new Firebase('https://torrid-inferno-6968.firebaseio.com/Events/20160301-0001');

	//assign retrieved value to local object
	var obj = $firebase(ref).$asObject();

	//bind local object to scope variable
	obj.$bindTo($scope, "data");

    console.log('through the events');

}]);