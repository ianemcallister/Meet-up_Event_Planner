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
	vm.userName = 'Ian';
	vm.isData = false;

	//load user data
	ref.onAuth(function(authData) {
		if(authData) {
			$log.info('Authenticated with uid:', authData.uid);

			ref.child('Users/' + authData.uid + '/bio/name').on('value', function(snapshot) {
				$log.info(snapshot.val());
				vm.userName = snapshot.val();
				vm.isData = true;
			});

		} else {
			$log.info('Client unauthenticated.')
		}
	});

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
		if(vm.dataToSave) {
			var usersRef = ref.child('Users/' + saveUserData.getUID());

			$location.path('/userEvents/dataSaved/' + saveUserData.getUID());
		} else {
			$location.path('/userEvents/noData' + saveUserData.getUID());
		}
	}

}