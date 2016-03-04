angular
    .module('meetUpEventApp')
    .factory('userData2', userData2);

userData2.$inject = ['$log'];

function userData2($log) {
	var pendingInvitations = {};
	var eventsAttending = {};
	var eventsHosting = {};
	var dbRoot = new Firebase('https://meetupplanner.firebaseio.com/Users/0841e1bc-91b8-4033-a868-5a9a85a08380/attending');

	pendingInvitations = { 'list':[
		{'title':'Lacy\'s Awesome Party','message':'We\'ll have a grand old time!', 'id':'0092', 'startTime':'1288323623006'},
		{'title':'Shelby\'s Pool Party','message':'We\'ll make memories.', 'id':'19381', 'startTime':'1282324623006'},
		{'title':'Logan\'s Going Away Party','message':'We\'ll say goodbye!', 'id':'2375', 'startTime':'1678323623006'}
	]};

	eventsAttending = [
		{'title':'Lacy\'s Awesome Party','message':'We\'ll have a grand old time!', 'id':'0092', 'startTime':'1288323623006'},
		{'title':'Shelby\'s Pool Party','message':'We\'ll make memories.', 'id':'19381', 'startTime':'1282324623006'},
		{'title':'Logan\'s Going Away Party','message':'We\'ll say goodbye!', 'id':'2375', 'startTime':'1678323623006'}
	];

	eventsHosting = { 'list':[
		{'title':'Ian\'s Awesome Party','message':'We\'ll have a grand old time!', 'id':'0092', 'startTime':'1288323623006'},
		{'title':'Ashlee\'s Pool Party','message':'We\'ll make memories.', 'id':'19381', 'startTime':'1282324623006'},
		{'title':'Victoria\'s Going Away Party','message':'We\'ll say goodbye!', 'id':'2375', 'startTime':'1678323623006'}
	]};

	var currentUserData = {
		loadDatabaseValues: function() {
			$log.info('running db call');

			dbRoot.on('value', function(snapshot) {
				pendingInvitations = snapshot.val();
				eventsAttending = {};
				eventsHosting = {};
				$log.info('it worked! '+ pendingInvitations['1458039600-001'].title);
			}, function(errorObject) {
				$log.info('The read failed: ' + errorObject.code);
			});
		},
		getPendingInvitations: function() {
			return pendingInvitations;
		},
		getEventsAttending: function() {
			return eventsAttending;
		},
		getEventsHosting: function() {
			return eventsHosting;
		},
		acceptAnInvitation: function(invitationId) {

		},
		declineAnInvitation: function(invitationId) {

		},
		saveANewHostedEvent: function(newEvent) {

		}	
	};

	return currentUserData;
	/*
	return {
		getPendingInvitations: function() {
			return pendingInvitations;
		},
		getEventsAttending: function() {
			return eventsAttending;
		},
		getEventsHosting: function() {
			return eventsHosting;
		}	
	};*/
}