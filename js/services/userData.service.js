angular
    .module('meetUpEventApp')
    .factory('userData', userData);

function userData() {
	var user = this;

	user.eventsAttending = { 'testing':'that' };

	var initialize = function() {
		user.uid = {};
		user.eventsAttending = [];
		user.eventsHosting = [];
		user.eventsInvitedTo = [];

	}

	function getUID() {
		return user.uid;
	}
	function getAllEventsAttending() {
		return user.eventsAttending;
	}
	function getAllEventsHosting() {
		return user.eventsHosting;
	}
	function getAllEventsInvitedTo() {
		return user.eventsInvitedTo;
	}
	function createAHostedEvent(newEvent) {
		//add error checking
		user.eventsHosting.push(newEvent);
	}
	function acceptAnEventInvitation(newEvent, inviteIDRemoving) {
		user.eventsAttending.push(newEvent);
		//loop through the invite array to remove the invite
	}
	function deleteAHostedEvent(eventIDRemoving) {

	}
	
}