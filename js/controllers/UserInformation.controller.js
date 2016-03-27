angular
    .module('meetUpEventApp')
    .controller('UserInformationController', UserInformationController);

UserInformationController.$inject = ['$log', '$document', '$routeParams','userData', 'trafficValet'];

/* @ngInject */
function UserInformationController($log, $document, $routeParams, userData, trafficValet) {
	var vm = this;
	
	//local variables
	var currentUser = userData;

	//view model variables
	vm.user = {};
	vm.tempBirthday;
	vm.view = {
		dataToSave: false,
		isData: false,
		btnMssg: 'Move On...',
		proceedBtn: 'btn btn-primary'
	};

	//local methods
	function unixTimeToDateTime(unixTime) {
		return new Date(parseInt(unixTime));
	};

	function dateTimeToUnixTime(dateTime) {
		return Date.parse(dateTime);
	};

	//view accessible methods
	vm.checkValues = function() {
		//throw the isData flag if something is updated
		vm.view.isData = true;

		if( !(angular.isUndefined(vm.user.company) || vm.user.company === '') || 
			!(angular.isUndefined(vm.user.title) || vm.user.title === '') || 
			!(angular.isUndefined(vm.user.dob) || vm.user.dob === '')) 
		{
			vm.view.dataToSave = true;
			vm.view.proceedBtn = 'btn btn-success';
			vm.view.btnMssg = 'Save & Continue';
		} else {
			vm.view.dataToSave = false;
			vm.view.proceedBtn = 'btn btn-primary';
			vm.view.btnMssg = 'Move On...';	
		}

	}

	vm.updateDOB = function() {
		$log.info("the temp birthday is" + vm.tempBirthday);
		vm.user.dob = dateTimeToUnixTime(vm.tempBirthday);
		$log.info('now dob is ' + vm.user.dob);
		vm.checkValues();
	}

	vm.saveAndMoveOn = function() {
		//local variables
		var userInfoSherpa = trafficValet;
		var currentUid = currentUser.getUIDLocally();

		//convert DOB to unixTime and save
		if(vm.tempBirthday !== 0) vm.updateDOB();
		
		//if there isn't currently a dob, grab from the route params
		if(currentUid == '' || angular.isUndefined(currentUid)) {
			currentUser.setUIDLocally($routeParams.uid);
		}

		$log.info('looking for the dob');
		$log.info(vm.user);

		//if there is new data, save it
		if(vm.view.isData) {
			$log.info('saving the new data');
			currentUser.updateBioLocally(vm.user);
		}
		
		//move on
		userInfoSherpa.redirectTo('/userEvents', vm.user.uid)
	}

	function initialize() {
		//load FastClick
		//FastClick.attach($document.body);
		$log.info($routeParams.uid);
		
		//load userData locally or from db
		currentUser.loadBio($routeParams.uid)
		.then(function(obtainedUserData) {
			//assign user values
			vm.user = obtainedUserData;

			//build tempBirthday
			if(angular.isDefined(userData.dob) && userData.dob !== '') {
				vm.tempBirthday = unixTimeToDateTime(userData.dob)
			}

		});
	
	}

	//event Listeners
	/*if ('addEventListener' in $document) {
	    $document.addEventListener('DOMContentLoaded', function() {
	    	//on page load
	    	initialize();
	        
	    }, false);
	}*/

	//run processes
	initialize(); //with internet use the event listener instead
}