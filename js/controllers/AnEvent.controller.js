angular
    .module('meetUpEventApp')
    .controller('AnEventController', AnEventController);

AnEventController.$inject = ['$log', '$location', 'userData'];

function AnEventController($log, $location, userData) {
	var vm = this;

	//declare and initialize local variables
	vm.event = {
		id: 0,
		name: '',
		type: '',
		host: '',
		startTime: 0,
		endTime: 0,
		message: '',
		guestList: {},
		address: {}
	};

	vm.currentSection = 1;
	vm.manageSections = {
		1: {active: true, complete: false, style:{color:'black', 'background-color':'yellow'}},
		2: {active: false, complete: false, style:{color:'white', 'background-color':'gray'}},
		3: {active: false, complete: false, style:{color:'white', 'background-color':'gray'}}
	};

	$log.info('into a single event controller');

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
