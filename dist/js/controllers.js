angular.module('meetUpEventApp', [])
	.controller('LandingController', function() {
		ctl.name = 'Landing Page';
	});

angular.module('meetUpEventApp', ['$log'])
	.controller('LoginController', ['$log', function($log) {
		$log.log('test test');
	}]);

angular.module('meetUpEventApp', [])
	.controller('UserProfileController', function($scope, $routeParams) {
		ctl.name = 'User Profile Page';
		log('User Profile Page');

		ctl.user = {
			'bio': {
				'firstname': 'Ian',
				'lastname': 'McAllister'
			},
			'contact': 'iemcallister@gmail.com'
		};

		ctl.activeUser = $routeParams.uid;
		
	});

angular.module('meetUpEventApp', [])
	.controller('UserDashController', function() {
		ctl.name = 'User Dash Page';
		log('User Dash Page');
	});

angular.module('meetUpEventApp', [])
	.controller('EventController', function() {
		ctl.name = 'Event Controller Page';
		log('Event Controller Page');
	});
