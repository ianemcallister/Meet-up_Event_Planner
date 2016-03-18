angular
    .module('meetUpEventApp')
    .controller('UserInformationController', UserInformationController);

UserInformationController.$inject = ['$log', '$location', '$routeParams', '$firebaseObject'];

function UserInformationController($log, $location, $routeParams, $firebaseObject) {
	var vm = this;
	var fbURL = 'https://meetupplanner.firebaseio.com/';
	var ref = new Firebase(fbURL); 
	var userBio = ref.child('Users').child($routeParams.uid).child('bio');
	vm.user = $firebaseObject(userBio);

	//local variables
	vm.proceedBtn = 'btn btn-primary';
	vm.btnMssg = 'Move On...';
	vm.dataToSave = false;
	vm.isData = false;
	//initialize temp birthday
	vm.user.$loaded().then(function() {
		if(vm.user.birthday) {
			vm.tempBirthday = unixTimeToDateTime(vm.user.birthday);
		} else vm.tempBirthday = new Date();
	});

	//local methods
	function unixTimeToDateTime(unixTime) {
		return new Date(parseInt(unixTime));
	};

	function dateTimeToUnixTime(dateTime) {
		return Date.parse(dateTime);
	};

	function redirect(path) {
		var fullPath = path + '/' + $routeParams.uid + '/' + $routeParams.token;
		//redirect
		$log.info('redirecting to: ' + fullPath);
		$location.path(fullPath);
	};

	//view accessible methods
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
		//convert temp birthday to savable format
		vm.user.birthday = dateTimeToUnixTime(vm.tempBirthday);
		//save page data
		vm.user.$save();
		//redirect
		redirect('/userEvents');
	}

}