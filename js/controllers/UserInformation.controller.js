angular
    .module('meetUpEventApp')
    .controller('UserInformationController', UserInformationController);

UserInformationController.$inject = ['$log', '$document', 'userData', 'trafficValet'];

/* @ngInject */
function UserInformationController($log, $document, userData, trafficValet) {
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
		vm.user.dob = dateTimeToUnixTime(vm.tempBirthday);
	}

	vm.saveAndMoveOn = function() {
		//local variables
		var userInfoSherpa = trafficValet;

		//convert DOB to be save
		vm.updateDOB();
		
		//if there is new data, save it
		if(vm.view.isData) {
			currentUser.updateBio(vm.user);
		}
		
		//move on
		userInfoSherpa.redirectTo('/userEvents', vm.user.uid)
	}

	function initialize() {
		$log.info('initializing the user information page');
		//load FastClick
		//FastClick.attach($document.body);

		//load userData
		currentUser.loadBio()
		.then(function(userData) {
			//assign user values
			vm.user = userData;

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