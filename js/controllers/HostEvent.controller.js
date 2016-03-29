angular
    .module('meetUpEventApp')
    .controller('HostEventController', HostEventController);

HostEventController.$inject = ['$scope', '$log', '$routeParams', 'userData', 'trafficValet', 'validation'];

/* @ngInject */
function HostEventController($scope, $log, $routeParams, userData, trafficValet, validation) {
	var vm = this;
	
	//local variables
	var hostedEventSherpa = trafficValet;
	var thisEventManager = userData;
	var requirnmentsFactory = validation;

	//local variables
	var percentComplete = 0;

	//view model variables
	vm.activeSection = 1;
	vm.tempTime = {start: '', end: '', duration:''};
	vm.progressBar = {
		complete: vm.percentComplete,
		style: {
			width: (vm.percentComplete + '%')
		},
		message: (vm.percentComplete + '%')
	}
	vm.tempEvent = {};
	vm.requiredFieldComplete = requirnmentsFactory.generateEventRequirnments();

	//local methods
	function unixTimeToDateTime(unixTime) {
		return new Date(parseInt(unixTime));
	};

	function dateTimeToUnixTime(dateTime) {
		return Date.parse(dateTime);
	};

	function calculateDuration(start, end) {
		return (dateTimeToUnixTime(end) - dateTimeToUnixTime(start)) / (60*1000);
	}

	function updateProgressBar(units) {
		percentComplete += units;
		vm.progressBar.complete = percentComplete;
		vm.progressBar.style.width = (percentComplete + '%');
		vm.progressBar.message = (percentComplete + '%');		
	}

	function initEventTimes() {
		//build new temp times
		var now = new Date();

		//round to the nearest hour, cut off anything smaller
		now.setHours(now.getHours() + Math.round(now.getMinutes()/60));
		now.setMinutes(0);
		now.setSeconds(0);
		now.setMilliseconds(0);

		vm.tempTime.start = now;
		vm.tempTime.end = now;

		vm.tempTime.duration = calculateDuration(vm.tempTime.start, vm.tempTime.end);
		
	}

	function updateTempTimeFromModel() {
		//if start times are available
		if(angular.isDefined(vm.tempEvent.eventTimes.start)) {
			//set the tempTime model
			vm.tempTime.start = unixTimeToDateTime(vm.tempEvent.eventTimes.start);
			vm.tempTime.end = unixTimeToDateTime(vm.tempEvent.eventTimes.end);
		}

	}

	function init() {
		
		//load event details
		thisEventManager.loadAnEventProgressively($routeParams.uid, $routeParams.eventId)
		.then(function(theEvent) {
			//add this event model to the view model event
			vm.tempEvent = theEvent;

			//update tempTime
			updateTempTimeFromModel();
		})
		.catch(function(error) {
			$log('the error is: ' + error);
		})

		//load specified section
		vm.activeSection = parseInt($routeParams.section);
		//set tempTimes
		initEventTimes();
	}

	//view model methods
	vm.formatDuration = function() {
		//calc duration
		vm.tempTime.duration = calculateDuration(vm.tempTime.start, vm.tempTime.end);
		
		//local variables
		var hours = Math.floor(vm.tempTime.duration/(60));
		var min = vm.tempTime.duration % 60;
		var fraction = (Math.round(min/15)/4);

		return (hours+fraction) + ' h';
	}

	vm.validateTime = function(startOrEnd) {
		$log.info('validating ' + startOrEnd);
		var times = {
			'eventStart': vm.tempTime.start,
			'eventEnd': vm.tempTime.end
		};

		if(angular.isDefined(times[startOrEnd]) && times[startOrEnd] != '' && vm.tempTime.duration > 0) {
			vm.requiredFieldComplete[startOrEnd].completed = true;
			vm.requiredFieldComplete[startOrEnd].row.class['has-success'] = true;
			vm.requiredFieldComplete[startOrEnd].row.class['has-feedback'] = true;
			vm.requiredFieldComplete[startOrEnd].row.class['has-error'] = false;
		} else {
			vm.requiredFieldComplete[startOrEnd].completed = false;
			vm.requiredFieldComplete[startOrEnd].row.class['has-success'] = false;
			vm.requiredFieldComplete[startOrEnd].row.class['has-feedback'] = false;
			vm.requiredFieldComplete[startOrEnd].row.class['has-error'] = true;
		}
	}

	vm.settingTempStart = function() {
		vm.tempTime.end = vm.tempTime.start;

		vm.validateTime('eventStart');
 	}

	vm.settingTempEnd = function() {
		//set valid end with start
		if(vm.tempTime.start > vm.tempTime.end) vm.tempTime.start = vm.tempTime.end;

		//validate
		vm.validateTime('eventEnd');

		//calc duration
		vm.tempTime.duration = calculateDuration(vm.tempTime.start, vm.tempTime.end);
	}

	vm.backToUserEvents = function() {
		//send the user back to the page they came from
		hostedEventSherpa.redirectTo('/userEvents', $routeParams.uid);
	}

	vm.sectionBack = function() {
		//move back
		targetSection = vm.activeSection - 1;
		hostedEventSherpa.redirectTo('/event/host', $routeParams.eventId, $routeParams.uid, targetSection);
	}	

	vm.sectionForward = function() {
		//move forward
		targetSection = vm.activeSection + 1;
		hostedEventSherpa.redirectTo('/event/host', $routeParams.eventId, $routeParams.uid, targetSection);
	}

	vm.verifyRequired = function(field, value) {
	
		//check validity
		if(angular.isDefined(value) && value != '') {
			if(vm.requiredFieldComplete[field].completed == false) {
				updateProgressBar(11);
			}
			vm.requiredFieldComplete[field].completed = true;
			vm.requiredFieldComplete[field].row.class['has-success'] = true;
			vm.requiredFieldComplete[field].row.class['has-feedback'] = true;
			vm.requiredFieldComplete[field].row.class['has-error'] = false;
		} else {
			if(vm.requiredFieldComplete[field].completed == true) {
				updateProgressBar(-11);
			}
			vm.requiredFieldComplete[field].completed = false;
			vm.requiredFieldComplete[field].row.class['has-success'] = false;
			vm.requiredFieldComplete[field].row.class['has-feedback'] = false;
			vm.requiredFieldComplete[field].row.class['has-error'] = true;
		}
		//field updated
		
	}

	//take action
	init();
}