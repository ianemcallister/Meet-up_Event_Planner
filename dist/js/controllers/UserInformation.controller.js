angular
    .module('meetUpEventApp')
    .controller('UserInformationController', UserInformationController);

UserInformationController.$inject = ['$log', '$location', 'userData'];

function UserInformationController($log, $location, userData) {
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

	vm.update = function() {
		$log.info(vm.user.name + ' ' + vm.user.email);
	}

	vm.dataLoaded = function() {
		return vm.isData;
	}

	vm.checkValues = function() {
		if( !(angular.isUndefined(vm.employerName) || vm.employerName === '') || 
			!(angular.isUndefined(vm.jobTitle) || vm.jobTitle === '') || 
			!(angular.isUndefined(vm.birthday) || vm.birthday === '')) 
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
		
		if(vm.dataToSave && angular.isDefined(saveUserData.getUID())) {
			//save the date the user added
			ref.child('Users/' + saveUserData.getUID() + '/bio/').update({
				'employer': vm.employerName,
				'jobTitle': vm.jobTitle,
				'birthday': vm.birthday
			}, function(error) {
				if(error) {
					$log.info("Optional Data could not be saved." + error);
				} else {
					$log.info("Optional Data saved successfully to " + saveUserData.getUID() + '/bio/');
				}
			});

			$location.path('/userEvents/dataSaved/' + saveUserData.getUID());
		} else {
			$location.path('/userEvents/noData/' + saveUserData.getUID());
		}
	}

}