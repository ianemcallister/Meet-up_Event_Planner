angular
    .module('meetUpEventApp')
    .controller('AnEventController', AnEventController);

AnEventController.$inject = ['$log', '$location', '$routeParams', '$firebaseObject', 'userData'];

function AnEventController($log, $location, $routeParams, $firebaseObject, userData) {
	var vm = this;
	var fbURL = 'https://meetupplanner.firebaseio.com/';
	var ref = new Firebase(fbURL);
	
	//declare and initialize local variables
	vm.event = {
		name: '',
		type: '',
		host: '',
		startTime: 0,
		endTime: 0,
		message: '',
		guestList: {},
		address: {}
	};

	vm.manageSections = {
		1: {active: true, complete: false, style:{color:'black', 'background-color':'yellow'}},
		2: {active: false, complete: false, style:{color:'white', 'background-color':'gray'}},
		3: {active: false, complete: false, style:{color:'white', 'background-color':'gray'}}
	};

	$log.info($routeParams.uid);
	$log.info($routeParams.eventId);
	//binding to the event
	vm.event = $firebaseObject(ref.child('Users').child($routeParams.uid).child('hosting').child($routeParams.eventId))

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
}
