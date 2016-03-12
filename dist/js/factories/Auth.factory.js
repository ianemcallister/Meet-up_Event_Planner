angular
    .module('meetUpEventApp')
    .factory('userAuthentication', userAuthentication);

userAuthentication.$inject = [];

function userAuthentication() {
	return {
		createNewUser: createNewUser,
		loginExistingUser: loginExistingUser
	};

	function createNewUser(newUserEmail, newUserPassword) {

	}

	function loginExistingUser(existingUserEmail, existingUserPassword) {
		var ref = new Firebase('https://meetupplanner.firebaseio.com');

		return ref.authWithPassword({
			email    : existingUserEmail,
			password : existingUserPassword
		}, function(error, authData) {
			if (error) {
			    alert("Login Failed!" + error);
			} else {
			  alert("Authenticated successfully with payload:" + authData);
			}

		});
	}
}