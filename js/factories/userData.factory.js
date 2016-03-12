angular
    .module('meetUpEventApp')
    .factory('userData2', userData);

userData.$inject = ['$log'];

function userData($log) {
	var userBio = {
		'firstname': '',
		'lastname': '',
		'email': ''
	};
	var pendingInvitations = {};
	var eventsAttending = {};
	var eventsHosting = {};
	var fbURL = 'https://meetupplanner.firebaseio.com/';
	var dbRoot = new Firebase(fbURL);
	var uid = '0841e1bc-91b8-4033-a868-5a9a85a08380';

	var currentUserData = {
		loadDatabaseValues: function() {
			$log.info('running db call');

			dbRoot.child('Users/' + uid + '/bio').once('value', function(snapshot) {
				bioObject = snapshot.val();
				userBio['firstname'] = bioObject['firstname'];
				userBio['lastname'] = bioObject['lastname'];
				userBio['email'] = bioObject['email'];
			});

			//load events attending
			dbRoot.child('Users/' + uid + '/attending').once('value', function(snapshot) {
				eventsAttending = snapshot.val();
				$log.info('attending Events worked');
			}, function(errorObject) {
				$log.info('attending Events read failed: ' + errorObject.code);
			});

			dbRoot.child('Users/' + uid + '/hosting').once('value', function(snapshot) {
				eventsHosting = snapshot.val();
				$log.info('hosting events worked');
			}, function(errorObject) {
				$log.info('hosting events read failed: ' + errorObject.code);
			});

			dbRoot.child('Users/' + uid + '/pending').once('value', function(snapshot) {
				pendingInvitations = snapshot.val();
				$log.info('pending events worked');
			}, function(errorObject) {
				$log.info('Pending Invitations read failed: ' + errorObject.code);
			});
		},
		getUserBio: function() {
			return userBio;
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
}