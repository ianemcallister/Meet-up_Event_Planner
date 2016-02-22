angular
    .module('meetUpEventApp')
    .value('fbURL', 'https://meetupplanner.firebaseio.com')
    .factory('dataservice', dataservice);

function dataservice(fbURL, $firebaseObject) {
	
	var database = {};
	var root = new Firebase(fbURL);

	database.getEvents = function() {
		var message = 'it worked';
		alert("in Get Events");
		return message;
	}

	database.loadAttendingEvents = function(uid) {
		alert(uid);
		root.child('Users/'+uid+'/attending/20160315-0001').on("value", function(snapshot) {
			alert(snapshot.val());
			return snapshot.val();
		});
	}

	database.getUserProfile = function(uid) {
		var contactId = $firebaseObject(new Firebase(fbURL + '/Users/' + uid + '/contact'));

		//var userObject = $firebaseObject(new Firebase(fbURL + '/Contacts/' + contactId));
		return contactId;
	}

	database.loadUID = function() {
		return 1;
	}
	/*
	dataservice.loadAttendingEvents = function() {
		var message = 'it worked';
		alert("in load attending eVents");
		return message;
		
		root.child('Users/'+uid+'/attending').on("value", function(snapshot) {
			return snapshot.val();
		});
	}*/

	return database;
}