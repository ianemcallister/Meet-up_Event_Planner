angular
    .module('meetUpEventApp')
    .factory('Auth', Auth);

function Auth() {
	var user;

	return {
		setUser : function(aUser) {

		},
		isLoggedIn: function() {
			return(user)? user : false;
		}
	}
}