//services
/*
meetUpEventApp.service('userData', function() {
	var self = this;
	self.uid='';
	self.eventsHosting={};
	self.eventsAttending={};
	self.eventInvitations={};
	//declaring owned properties
	self.initializeUser = function(data) {

	}

});

meetUpEventApp.service('databaseQueries', function() {
	//declare local variables
	var rootRef = new Firebase("https://meetupplanner.firebaseio.com");
	var self = this;

	self.userLogin = function(username, userPassword) {

		console.log('logging in a user');

		rootRef.authWithPassword({
		  email    : username,
		  password : userPassword
		}, function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		    //return the token to be handled by userLogin
		  }
		  console.log("log completed");


		  return authData;
		});

	}

	self.createNewUser = function(username, userPassword) {

		console.log('creating a new user account');

		rootRef.createUser({
		  email    : username,
		  password : userPassword
		}, function(error, userData) {
		  if (error) {
		    console.log("Error creating user:", error);
		  } else {
		    console.log("Successfully created user account with uid:", userData.uid);

		    return userData;

		  }
		});

	}

	self.getUserBio = function(uid) {
		//collect the contact id from the uid
		var currentUser = rootRef.child("/Users/" + uid);

		// Attach an asynchronous callback to read the data of the user
		currentUser.on("value", function(snapshot) {
			//display the current user contact if found
			console.log(snapshot.val().contact);
			//if found
			var userContacts = rootRef.child("/Contacts/" + snapshot.val().contact);

			var userContact = $firebase(userContacts).$asObject();

			return userContact;

		}, function (errorObject) {
		
			console.log("The read failed: " + errorObject.code);

		});
	}

	self.getUserEvents = function(uid) {
		//collect the contact id from the uid
		var currentUser = rootRef.child("/Users/" + uid);

		// Attach an asynchronous callback to read the data of the user's events
		currentUser.on("value", function(snapshot) {
			//if found, collect event details
			//var eventsHosting = rootRef.child("/Events/" + snapshot.val().hosting);
			//var eventsAttending = rootRef.child("/Events/" + snapshot.val().attending);
			//var eventInvitations = rootRef.child("/Events/" + snapshot.val().invitations);
			//var allEvents = { eventsHosting, eventsAttending, eventInvitations };
			//var eventTitle = $firebase(events).$asObject();
			//return allEvents;

		}, function (errorObject) {
		
			console.log("The read failed: " + errorObject.code);

		});

	}

});

meetUpEventApp.service('userLogin', function() {
	var self = this;

	self.saveToken = function(token) {
		window.localStorage.setItem('jwToken', token);
	}

	self.getToken = function() {
		return window.localStorage.getItem('jwToken');
	}

	self.parseJwt = function(token) {
		console.log('running parseJwt now');
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}

	self.isAuthed = function() {
		var token = self.getToken();
		if(token) {
			var params = self.parseJwt(token);
			console.log(params.iat);
			return true;//Math.round(new Date().getTime() / 1000) <= params.exp;
		} else {
			console.log('running flase');
			return false;
		}
	}
});*/