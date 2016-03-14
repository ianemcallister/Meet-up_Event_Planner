angular
	.module('meetUpEventApp')
	.factory('userData', userData);

userData.$inject = ['$log'];

function userData($log) {
	var UID = {};
	var provider = {};
	var token = {};
	var expiration = {};
	var trafficUserData = {
		init: function (newUID, newProvider, newToken, newExpiration) {
			this.UID = newUID;
			this.provider = newProvider;
			this.token = newToken;
			this.expiration = newExpiration;
		},
		setUID: function(newUID) {
			this.UID = newUID;
		},
		setProvider: function(newProvider) {
			this.provider = newProvider;
		},
		setToken: function(newToken) {
			this.token = newToken;
		},
		setExpires: function(newExpiration) {
			this.expiration = newExpiration;
		},
		getUID: function() {
			return this.UID;
		},
		getProvider: function() {
			return this.provider;
		},
		getToken: function() {
			return this.token;
		},
		getExpiration: function() {
			return this.expiration;
		}
	};

	return trafficUserData;
}