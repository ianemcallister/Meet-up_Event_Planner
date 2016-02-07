//controllers
meetUpEventApp.controller('homeController', ['$scope', function ($scope) {

	$scope.title = 'home';
}]);

meetUpEventApp.controller('landingController', ['$scope', function ($scope) {

	$scope.title = 'Landing Page';

	console.log('app.js is working!');
}]);

meetUpEventApp.controller('loginController', ['$scope', '$firebase', '$location', function ($scope, $firebase, $location) {
	
	$scope.newUsername = '';
	$scope.newPassword = '';
	$scope.uid = ''

	$scope.userLogin = function() {
		console.log('logging in a user');

	}

	$scope.newUserLogin = function() {
		console.log('creating a new user account');

		var ref = new Firebase("https://meetupplanner.firebaseio.com/Users");
		ref.createUser({
		  email    : $scope.newUsername,
		  password : $scope.newPassword
		}, function(error, userData) {
		  if (error) {
		    console.log("Error creating user:", error);
		  } else {
		    console.log("Successfully created user account with uid:", userData.uid);


		    //if we don't have user information for them launch that page
		    $location.path('/userProfile/' + userData.uid);
		    //launch the new page
		    $scope.$apply();

		  }
		});
	}

}]);

meetUpEventApp.controller('userProfileController', ['$scope', '$routeParams', function ($scope, $routeParams) {

	$scope.title = "user Controllers";
	$scope.bio = {
		firstname: '',
		lastname: ''
	};

	$scope.activeUser = $routeParams.uid;

	console.log($scope.activeUser);

}]);

meetUpEventApp.controller('userDashController', ['$scope', '$routeParams', function ($scope, $routeParams) {

	$scope.title = 'User Dashboard';

	$scope.activeUser = $routeParams.user || 'Anonymous';

	console.log('user Dash is working');

}]);

meetUpEventApp.controller('eventController', ['$scope', '$routeParams', '$firebase', function ($scope, $routeParams, $firebase) {

	$scope.editMode = false;
	console.log($scope.editMode);

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
	$scope.totalAttending = function() {
		return "There are 7 people";
	}

	//calculate total pending attendees
	$scope.pendingResponses = function() {
		return "There are 19";
	}


}]);