//controllers
meetUpEventApp.controller('homeController', ['$scope', function ($scope) {

	$scope.title = 'home';
}]);

meetUpEventApp.controller('landingController', ['$scope', function ($scope) {

	$scope.title = 'Landing Page';

	console.log('app.js is working!');
}]);

meetUpEventApp.controller('loginController', ['$scope', '$firebase', '$location', 'databaseQueries', 'userLogin', 'userData', function ($scope, $firebase, $location, databaseQueries, userLogin, userData) {
	
	//do I need to declare these?
	$scope.newUsername = '';
	$scope.newPassword = '';
	$scope.username = '';
	$scope.password = '';

	$scope.userLogin = function() {
		var authData = databaseQueries.userLogin($scope.username, $scope.password);
		//save the token
		userLogin.saveToken(authData.token);
		//save user data for use
		//userData.initializeUser(authData.uid);
		//redirect to user Dashboard
		$location.path('/Users/' + authData.uid);
		$scope.$apply();
	}

	$scope.createNewUser = function() {
		var userData = databaseQueries.createNewUser($scope.newUsername, $scope.newPassword);
		//save the token
		userLogin.saveToken(userData.token);
		//because this is a new user, create a user profile before going to dashboard
		$location.path('/userProfile/' + userData.uid);
		//launch the new page
		$scope.$apply();
	}

}]);

meetUpEventApp.controller('userProfileController', ['$scope', '$routeParams', function ($scope, $routeParams) {

	//check for available info
	$scope.bio = {
		firstname: '',
		lastname: ''
	};
	$scope.contact = {
		email: ''
	};

	$scope.activeUser = $routeParams.uid;

	console.log($scope.activeUser);

}]);

meetUpEventApp.controller('userDashController', ['$scope', '$routeParams', '$firebase', 'userLogin', function ($scope, $routeParams, $firebase, userLogin) {
	//check authorization
	if(userLogin.isAuthed()) { console.log ('authorized, proceeding'); }
	else { console.log('not logged in'); }
	
	//use the uid to extract the user information
	var rootRef = new Firebase("https://meetupplanner.firebaseio.com");
	var currentUser = rootRef.child("/Users/" + $routeParams.user);

	// Attach an asynchronous callback to read the data of the user
	currentUser.on("value", function(snapshot) {
	//display the current user contact if found
	console.log(snapshot.val().contact);
	//if found
	var userContacts = rootRef.child("/Contacts/" + snapshot.val().contact);

	var userContact = $firebase(userContacts).$asObject();

	userContact.$bindTo($scope, "activeUser");

	var events = rootRef.child("/Events/" + snapshot.val().hosting[1]);

	var eventTitle = $firebase(events).$asObject();

	eventTitle.$bindTo($scope, "eventInfo");

	}, function (errorObject) {
	
	console.log("The read failed: " + errorObject.code);

	});

	//var events = new Firebase("https://meetupplanner.firebaseio.com/Events/"+$scope.data.hosting);

	//var hostingEvents = $firebase(ref).$asObject();

	//hostingEvents.$bindTo($scope, "hostedEvents");


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