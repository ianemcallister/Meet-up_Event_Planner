angular
    .module('meetUpEventApp')
    .factory('userData2', userData2);

userData2.$inject = ['$log'];

function userData2($log) {
	var pendingInvitations = {};
	var eventsAttending = {};
	var eventsHosting = {};
	var fbURL = 'https://meetupplanner.firebaseio.com/';
	var dbRoot = new Firebase(fbURL);
	var uid = '0841e1bc-91b8-4033-a868-5a9a85a08380';

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

			dbRoot.child('Users/' + uid + '/attending').once('value', function(snapshot) {
				eventsAttending = snapshot.val();
				$log.info('attending Events worked');
			}, function(errorObject) {
				$log.info('Pending Invitations read failed: ' + errorObject.code);
			});

			dbRoot.child('Users/' + uid + '/hosting').once('value', function(snapshot) {
				eventsHosting = snapshot.val();
				$log.info('hosting events worked');
			}, function(errorObject) {
				$log.info('Pending Invitations read failed: ' + errorObject.code);
			});

			dbRoot.child('Users/' + uid + '/pending').once('value', function(snapshot) {
				pendingInvitations = snapshot.val();
				$log.info('pending events worked');
			}, function(errorObject) {
				$log.info('Pending Invitations read failed: ' + errorObject.code);
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