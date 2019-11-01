meetUpEventApp.controller('HostEventController', HostEventController);

HostEventController.$inject = ['$scope', '$log', '$routeParams', '$document', 'userData', 'trafficValet', 'validation'];

/* @ngInject */
function HostEventController($scope, $log, $routeParams, $document, userData, trafficValet, validation) {
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
	vm.actionBtn = {
		div: {
			class: {
				'col-xs-6': true,
				'col-sm-6': true,
			}
		},
		btn: {
			class: {
				'btn': true,
				'btn-success': false,
				'btn-warning': true,
				'pull-right': true,
			},
			message: 'Add Info'
		}
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

	function changeSaveBtn(direction) {
		if(direction == 'open') {
			vm.actionBtn.btn.class['btn-success'] = true;
			vm.actionBtn.btn.class['btn-warning'] = false;
			vm.actionBtn.btn.message = 'Save Event';
		} else if(direction == 'close') {
			vm.actionBtn.btn.class['btn-success'] = false;
			vm.actionBtn.btn.class['btn-warning'] = true;
			vm.actionBtn.btn.message = 'Add Info';
		}
	}

	function updateProgressBar(units) {
		percentComplete += units;
		vm.progressBar.complete = percentComplete;
		vm.progressBar.style.width = (percentComplete + '%');
		vm.progressBar.message = (percentComplete + '%');
		if(percentComplete > 99) changeSaveBtn('open');	
		if(percentComplete < 99) changeSaveBtn('close');		
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

	function loadExistingValues() {

		//loop through each event object, if it exists credit the progress bar
		Object.keys(vm.tempEvent).forEach(function(key) {
			//$log.info(vm.tempEvent[key]);
			//
		});

	}

	function init() {
		//if there is an active event, load it
		if(thisEventManager.thereIsAnActiveEvent()) {
			
			var activePackage = thisEventManager.getActiveEvent();

			vm.progressBar = activePackage.progressBar;
			percentComplete = activePackage.percentComplete
			vm.tempEvent = activePackage.event;
			vm.requiredFieldComplete = activePackage.requiredFields;

		} else {
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
		}

		//load specified section
		vm.activeSection = parseInt($routeParams.section);
		
		//set tempTimes
		initEventTimes();

		//set the progress bar for existing values
		loadExistingValues();
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

		if(vm.tempTime.duration > 24) vm.settingTempStart();

		//local variables
		var times = {
			'eventStart': vm.tempTime.start,
			'eventEnd': vm.tempTime.end
		};

		if(angular.isDefined(times[startOrEnd]) && times[startOrEnd] != '' && vm.tempTime.duration > 0) {
			if(vm.requiredFieldComplete[startOrEnd].completed == false) updateProgressBar(10);
			vm.tempEvent.eventTimes.start = dateTimeToUnixTime(vm.tempTime.start);
			vm.tempEvent.eventTimes.end = dateTimeToUnixTime(vm.tempTime.end);
			vm.requiredFieldComplete[startOrEnd].completed = true;
			vm.requiredFieldComplete[startOrEnd].row.class['has-success'] = true;
			vm.requiredFieldComplete[startOrEnd].row.class['has-feedback'] = true;
			vm.requiredFieldComplete[startOrEnd].row.class['has-error'] = false;
		} else {
			if(vm.requiredFieldComplete[startOrEnd].completed == true) updateProgressBar(-10);
			vm.requiredFieldComplete[startOrEnd].completed = false;
			vm.requiredFieldComplete[startOrEnd].row.class['has-success'] = false;
			vm.requiredFieldComplete[startOrEnd].row.class['has-feedback'] = false;
			vm.requiredFieldComplete[startOrEnd].row.class['has-error'] = true;
		}
	}

	vm.settingTempStart = function() {

		if((dateTimeToUnixTime(vm.tempTime.end) <= dateTimeToUnixTime(vm.tempTime.start)) || 
			(dateTimeToUnixTime(vm.tempTime.end) - dateTimeToUnixTime(vm.tempTime.start) > (1000*60*60*24))) {
			oldStart = dateTimeToUnixTime(vm.tempTime.start);
			oldEnd = dateTimeToUnixTime(vm.tempTime.end);

			newEnd = oldStart + (60*60*1000);

			vm.tempTime.end = unixTimeToDateTime(newEnd);
		}
		
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
		//if the event is completed, save to the db
		//check that the event is complete
		if(percentComplete > 99) {
			//if so save the event locally
			thisEventManager.saveNewHostingEvent('hosting', vm.tempEvent);
			//then sync the local with the db
			thisEventManager.setRemoteEventsFromLocal('hosting', vm.tempEvent)
			.then(function(succesMessage) {
				$log.info(succesMessage);
			})
			.catch(function(erroMessage) {
				$log.info(erroMessage);
			})
		}

		//if not completed, delete the event entirely
		//thisEventManager.removeIncompleteEventFromDB(vm.tempEvent.id);

		//send the user back to the page they came from
		hostedEventSherpa.redirectTo('/userEvents', $routeParams.uid);
	}

	vm.sectionBack = function() {
		//save temp event package
		var eventPackage = {
			event: vm.tempEvent,
			progressBar: vm.progressBar,
			percentComplete: percentComplete,
			requiredFields: vm.requiredFieldComplete
		};

		//$log.info(eventPackage);

		thisEventManager.setActiveEvent(eventPackage)

		//move back
		targetSection = vm.activeSection - 1;
		hostedEventSherpa.redirectTo('/event/host', $routeParams.eventId, $routeParams.uid, targetSection);
	}	

	vm.sectionForward = function() {
		//if all required fields have been entered
		//save temp event package
		var eventPackage = {
			event: vm.tempEvent,
			progressBar: vm.progressBar,
			percentComplete: percentComplete,
			requiredFields: vm.requiredFieldComplete
		};

		//$log.info(eventPackage);

		thisEventManager.setActiveEvent(eventPackage)

		//move forward
		targetSection = vm.activeSection + 1;
		hostedEventSherpa.redirectTo('/event/host', $routeParams.eventId, $routeParams.uid, targetSection);
	}

	vm.verifyRequired = function(field, value) {
	
		//check validity
		if(angular.isDefined(value) && value != '') {
			if(vm.requiredFieldComplete[field].completed == false) {
				updateProgressBar(10);
			}
			vm.requiredFieldComplete[field].completed = true;
			vm.requiredFieldComplete[field].row.class['has-success'] = true;
			vm.requiredFieldComplete[field].row.class['has-feedback'] = true;
			vm.requiredFieldComplete[field].row.class['has-error'] = false;
		} else {
			if(vm.requiredFieldComplete[field].completed == true) {
				updateProgressBar(-10);
			}
			vm.requiredFieldComplete[field].completed = false;
			vm.requiredFieldComplete[field].row.class['has-success'] = false;
			vm.requiredFieldComplete[field].row.class['has-feedback'] = false;
			vm.requiredFieldComplete[field].row.class['has-error'] = true;
		}
		//field updated
		
	}

	vm.saveEventToDB = function() {
		//$log.info(vm.tempEvent);
		//check that the event is complete
		if(percentComplete > 99) {
			//if so save the event locally
			thisEventManager.saveNewHostingEvent('hosting', vm.tempEvent);
			//then sync the local with the db
			thisEventManager.setRemoteEventsFromLocal($routeParams.uid, vm.tempEvent)
			.then(function(succesMessage) {
				$log.info(succesMessage);

				//in succes make sure to remove the updated field
				thisEventManager.cleanDBEventsCategory('hosting')
				.then(function(succesMessage) {
					$log.info(succesMessage);
				})
				.catch(function(erroMessage) {
					$log.info(erroMessage);
				})
			})
			.catch(function(erroMessage) {
				$log.info(erroMessage);
			})

			//redirect back to events
			hostedEventSherpa.redirectTo('/userEvents', $routeParams.uid);
		}
		
	}

	//watchers
	$scope.$watch('vm.tempEvent.guestList', function(current, original) {
		//if a guest is added to the list update the progress bar
        if(angular.isObject(vm.tempEvent.guestList)) {
        	updateProgressBar(10);
        }
	});

	angular.element($document).ready(function() {
		if(parseInt($routeParams.section) == 1) { 
			
			//angular.element($document.querySelector('#eventName')).focus()
			//angular.element($document).find('#eventName').focus();
			//$log.info('section 1');

		}

		if(parseInt($routeParams.section) == 2) {
			//angular.element($document.querySelector('#eventStreet01')).focus()
			//angular.element($document).find('#eventStreet01').focus();
			//$log.info('section 2');
		}

		if(parseInt($routeParams.section) == 3) {
			//angular.element($document.querySelector('#inviteeName')).focus()
			//eventStreet01angular.element($document).find('#inviteeName').focus();
			//$log.info('section 3');
		}
	});

	//take action
	init();

}