//services
meetUpEventApp.service('userData', function(data) {
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
		    console.log(authData);

		    //return the token to be handled by userLogin
		    return authData;

		  }
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
});