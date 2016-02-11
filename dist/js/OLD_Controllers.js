/*

angular
	.module('meetUpEventApp', [])
	.controller('loginController', ['$firebase', '$location', 'databaseQueries', 'userLogin', 'userData', function($firebase, $location, databaseQueries, userLogin, userData) {
		
	//do I need to declare these?
	$scope.newUsername = '';
	$scope.newPassword = '';
	$scope.username = '';
	$scope.password = '';

	$scope.userLogin = function() {
		//log the user in with the username and password
		databaseQueries.userLogin($scope.username, $scope.password).success(function(authData) {
			console.log(authData);
		});

		//save the token
		//userLogin.saveToken(authData.token);
		//save user data for use
		//userData.initializeUser(authData.uid);
		//redirect to user Dashboard
		//$location.path('/Users/' + authData.uid);
		//$scope.$apply();
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




meetUpEventApp.controller('userDashController', ['$scope', '$routeParams', '$firebase', 'userLogin', 'databaseQueries', function ($scope, $routeParams, $firebase, userLogin, databaseQueries) {
	//check authorization
	if(userLogin.isAuthed()) { console.log ('authorized, proceeding'); }
	else { console.log('not logged in'); }
	
	//load the user's biographical information
	$scope.activeUser = databaseQueries.getUserBio($routeParams.user);

	//load event object
	$scope.allevents = databaseQueries.getUserEvents($routeParams.user);

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
*/