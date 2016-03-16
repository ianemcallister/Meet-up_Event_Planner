angular
    .module('meetUpEventApp')
    .controller('AnEventController', AnEventController);

AnEventController.$inject = ['$log', '$location', '$routeParams', '$firebaseObject', 'userData'];

function AnEventController($log, $location, $routeParams, $firebaseObject, userData) {
	var vm = this;
	var fbURL = 'https://meetupplanner.firebaseio.com/';
	var ref = new Firebase(fbURL);
	
	
	//declare and initialize local variables
	vm.tempDateTime = {start: new Date(), end: new Date()};
	vm.newGuest = {name: '', email:{address:'', valid:false, style:{color:''}}};

	vm.manageSections = {
		1: {active: true, complete: false, style:{color:'black', 'background-color':'yellow'}},
		2: {active: false, complete: false, style:{color:'white', 'background-color':'gray'}},
		3: {active: false, complete: false, style:{color:'white', 'background-color':'gray'}}
	};

	//Methods
	vm.unixTimeToDateTime = function(unixTime) {
		return new Date(parseInt(unixTime));
	};

	vm.dateTimeToUnixTime = function(dateTime) {
		return Date.parse(dateTime);
	};

	vm.submit = function() {
		$log.info('submitting the form now!');
	}

	vm.changeSection = function(targetSection) {
		for(i = 1; i <=3; i++) {
			if(i==targetSection) {
				vm.manageSections[i].active = true;
				vm.manageSections[i].style['background-color'] ='yellow';
				vm.manageSections[i].style['color'] ='black';
			} else {
				vm.manageSections[i].active = false;
				vm.manageSections[i].style['background-color'] ='gray';
				vm.manageSections[i].style['color'] ='white';
			}
		}
	}

	vm.saveEventTime = function(dateTime, target) {
		if((vm.tempDateTime.end < vm.tempDateTime.start) && target == 'start') vm.tempDateTime.end = vm.tempDateTime.start;
		if(target == 'start') vm.event.eventTimes.start = vm.dateTimeToUnixTime(dateTime);
		if(target == 'end') vm.event.eventTimes.end = vm.dateTimeToUnixTime(dateTime);
		$log.info(dateTime + " changed to " + vm.event.eventTimes[target] + " at " + target);
	}

	vm.alertMe = function() {
		$log.info('something changed');
	}

	vm.areGuestsInvited = function() {
		//$log.info(vm.event.guestList);
		if(vm.event.guestList) return true;
		else return false;
	}

	vm.validateGuestEmail = function() {
		//if there is an email address
		if(vm.newGuest.email.address) {
			//check validity
			var constraint = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", "");

			if(constraint.test(vm.newGuest.email.address)) {
				vm.newGuest.email.valid = true;
				vm.newGuest.email.style = {color:'green'};
			} else {
				vm.newGuest.email.valid = false;
				vm.newGuest.email.style = {color:''};
			}			
		}
	}

	vm.addGuestToList = function() {
		//if email is valid and name exists
		if (vm.newGuest.name && vm.newGuest.email.valid) {
			//check if they are a user on the site
			//add them to the event guest list
			$log.info('adding the guest');
		} else {
			$log.info('you didn\'t enter a name and or email');
		}
	}

	//execution
	$log.info($routeParams.uid);
	$log.info($routeParams.eventId);
	
	//binding to the event
	vm.event = $firebaseObject(ref.child('Users').child($routeParams.uid).child('hosting').child($routeParams.eventId))



}
