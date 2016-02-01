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

meetUpEventApp.controller('eventController', ['$scope', '$routeParams', '$firebaseObject', function ($scope, $routeParams, $firebaseObject) {

	console.log('events page loaded');

	$scope.activeEvent = $routeParams.userEvent || 'Randome Event';

	//connect to firebase
	var ref = new Firebase('https://torrid-inferno-6968.firebaseio.com/');

	// download the data into a local object
	var syncObject = $firebaseObject(ref);

	// synchronize the object with a three-way data binding
  	// click on `index.html` above to see it used in the DOM!
  	if(syncObject.$bindTo($scope, "data")) console.log(JSON.stringify($scope.data, null, 4));
  	else console.log('No Sync');


}]);