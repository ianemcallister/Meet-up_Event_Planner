//controllers
meetUpEventApp.controller('landingController', ['$scope', function ($scope) {

	$scope.title = 'This is the Landing Page';

	console.log('app.js is working!');
}]);

meetUpEventApp.controller('eventsController', ['$scope', function ($scope) {

	$scope.title = 'Events Page reached';
	
	console.log('events page loaded');

}]);