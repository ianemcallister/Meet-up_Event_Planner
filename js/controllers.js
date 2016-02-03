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

	$scope.activeEvent = $routeParams.userEvent || 'Randome Event';

	//build firebase object reference
	var ref = new Firebase('https://torrid-inferno-6968.firebaseio.com/Events/20160301-0001');

	//assign retrieved value to local object
	var obj = $firebase(ref).$asObject();

	//bind local object to scope variable
	obj.$bindTo($scope, "data");

    //convert the date to readable
	$scope.convertToDate = function(dt) {
		return new Date(dt * 1000);
	}

	//calculate event duration
	$scope.eventDuration = function(eventStart, eventEnd) {
		return new Date(eventEnd - eventStart);
	}

	//calculate total event attendees
	#scope.totalAttending = function() {
		return "There are 7 people attending";
	}

	//calculate total pending attendees
	#scope.pendingResponses = function() {
		return "There are 19 responses pending";
	}

}]);