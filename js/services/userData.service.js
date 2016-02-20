angular
    .module('meetUpEventApp')
    .factory('userData', userData);

function userData() {
	var user = this;

	user.eventsAttending = { 'testing':'that' };

	var initialize = function() {
		user.uid = {};
		user.eventsAttending = { 'testing':'that' };
		user.eventsHosting = {};
		user.eventsInvitedTo = {};

	}

	var getUID = function() {
		return user.uid;
	}
	function getEventsAttending() {
		return user.eventsAttending;
	}
	var getEventsHosting = function() {
		return user.eventsHosting;
	}
	var getEventsInvitedTo = function() {
		return user.eventsInvitedTo;
	}
	
}