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
	$scope.username = '';
	$scope.password = '';
	$scope.uid = '';

	$scope.userLogin = function() {
		console.log('logging in a user');

		var ref = new Firebase("https://meetupplanner.firebaseio.com");
		ref.authWithPassword({
		  email    : $scope.username,
		  password : $scope.password
		}, function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);

		    $location.path('/Users/' + authData.uid);
		    $scope.$apply();
		  }
		});
	}

	$scope.newUserLogin = function() {
		console.log('creating a new user account');

		var ref = new Firebase("https://meetupplanner.firebaseio.com");
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

meetUpEventApp.controller('userDashController', ['$scope', '$routeParams', '$firebase', function ($scope, $routeParams, $firebase) {

	$scope.title = 'User Dashboard';

	//$scope.activeUser = $routeParams.user || 'Anonymous';
	//use the uid to extract the user information
	var ref = new Firebase("https://meetupplanner.firebaseio.com/Users/"+$routeParams.user);

	// Attach an asynchronous callback to read the data at our posts reference
	ref.on("value", function(snapshot) {
		  console.log(snapshot.val());
		  //if successful
		  var ref = new Firebase("https://meetupplanner.firebaseio.com/Contacts/"+snapshot.val());

		  var obj = $firebase(ref).$asObject();

		  obj.$bindTo($scope, "activeUser");

		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
	});

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