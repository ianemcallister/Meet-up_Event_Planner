angular
    .module('meetUpEventApp')
    .value('fbURL', 'https://meetupplanner.firebaseio.com')
    .factory('dataservice', dataservice);

function dataservice(fbURL, $firebaseObject) {
	
	var database = {};

	database.getEvents = function() {
		var message = 'it worked';
		return message;
	}

	database.getUserProfile = function(uid) {
		var contactId = $firebaseObject(new Firebase(fbURL + '/Users/' + uid + '/contact'));

		//var userObject = $firebaseObject(new Firebase(fbURL + '/Contacts/' + contactId));
		return contactId;
	}	

	return database;
}