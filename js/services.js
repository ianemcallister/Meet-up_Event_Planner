//services
meetUpEventApp.service('userData', function(data) {
	var self = this;
	//declaring owned properties
	self.uid='';
	self.eventsHosting={};
	self.eventsAttending={};
	self.eventInvitations={};
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