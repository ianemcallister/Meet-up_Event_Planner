angular
    .module('meetUpEventApp')
    .controller('UserInformationController', UserInformationController);

UserInformationController.$inject = ['$log', '$location', '$routeParams', '$scope', 'userData'];

function UserInformationController($log, $location, $routeParams, $scope, userData) {
	var vm = this;
	var fbURL = 'https://meetupplanner.firebaseio.com/';
	var ref = new Firebase(fbURL); 
	var saveUserData = userData;

	//local variables
	vm.proceedBtn = 'btn btn-primary';
	vm.dataToSave = false;
	vm.btnMssg = 'Move On...';
	vm.isData = false;
	vm.user = { 'name': 'tempName', 'email': 'tempEmail' };

	vm.unixTimeToDateTime = function(unixTime) {
		return new Date(parseInt(unixTime));
	};

	vm.dateTimeToUnixTime = function(dateTime) {
		return Date.parse(dateTime);
	};

	vm.redirect = function(path, userData) {
		var fullPath = path + '/' + userData.uid + '/' + userData.token;
		//redirect
		$log.info('redirecting to: ' + fullPath);
		$location.path(fullPath);
		//$scope.$apply();
	};

	if($routeParams.uid && $routeParams.token) {
		$log.info('route params came across');
		//check if route params are valid
		if($routeParams.uid == saveUserData.getUID()) {
			$log.info('passed uid matches userData uid: GOOD AUTHENTICATION');

			//get user data
			ref.child('Users/' + saveUserData.getUID() + '/bio').on('value', function(snapshot) {
				var userBio = snapshot.val();

				if(userBio.name) vm.user.name = userBio.name;	
				if(userBio.email) vm.user.email = userBio.email;
				if(userBio.employer) vm.user.employer = userBio.employer;
				if(userBio.jobTitle) vm.user.jobTitle = userBio.jobTitle;
				if(userBio.birthday) vm.user.birthday = vm.unixTimeToDateTime(userBio.birthday);

				$scope.$apply();

			}, function(error) {
				if(error) {
					$log.info('error getting the user bio ' + error);
				} else {
					$log.info('bio retrieved successfully');
				}
			});

		} else {
			$log.info('passed uid and userDate uid DON\'T MATCH.  ReAuthing the user...');
		}

	} else {
		//if there were not route params...
		$log.info('no route params');
		//load user data
		ref.onAuth(function(authData) {
			if(authData) {
				$log.info('Authenticated with uid:', authData.uid);

				//get user data
				ref.child('Users/' + authData.uid + '/bio').on('value', function(snapshot) {
					$log.info('Retrieved user name: ' + snapshot.val().name);
					$log.info('Retrieved user email: ' + snapshot.val().email);
					vm.user = snapshot.val();
					vm.isData = true;
					vm.update();
				});

				//save auth data
				saveUserData.init(authData.uid, authData.provider, authData.token, authData.expires);

			} else {
				$log.info('Client unauthenticated.')
			}
		});
	} 

	vm.checkValues = function() {
		if( !(angular.isUndefined(vm.user.employer) || vm.user.employer === '') || 
			!(angular.isUndefined(vm.user.jobTitle) || vm.user.jobTitle === '') || 
			!(angular.isUndefined(vm.user.birthday) || vm.user.birthday === '')) 
		{
			vm.dataToSave = true;
			vm.proceedBtn = 'btn btn-success';
			vm.btnMssg = 'Save & Continue';
		} else {
			vm.dataToSave = false;
			vm.proceedBtn = 'btn btn-primary';
			vm.btnMssg = 'Move On...';	
		}

	}

	vm.saveAndMoveOn = function() {
		//load local variables
		var redirectCreds = {uid: saveUserData.getUID(), token:saveUserData.getToken()}

		if(vm.dataToSave && angular.isDefined(saveUserData.getUID())) {
			//save the date the user added
			ref.child('Users/' + saveUserData.getUID() + '/bio/').update({
				'employer': vm.user.employer,
				'jobTitle': vm.user.jobTitle,
				'birthday': vm.dateTimeToUnixTime(vm.user.birthday)
			}, function(error) {
				if(error) {
					$log.info("Optional Data could not be saved." + error);
				} else {
					$log.info("Optional Data saved successfully to " + saveUserData.getUID() + '/bio/');

					vm.redirect('/userEvents', redirectCreds);
				}
			});
			
		} else {
			$log.info('No Data saved before rerouting');

			vm.redirect('/userEvents', redirectCreds);
		}

	}

}