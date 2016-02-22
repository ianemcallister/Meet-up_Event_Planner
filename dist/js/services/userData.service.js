angular
    .module('meetUpEventApp')
    .factory('userData', userData);

LoginsController.$inject = ['dataservice'];

function userData(dataservice) {
	var user = this;
	var userObject = {};

	userObject.initialize = function(uid) {
		//clean the local variables
		user.uid = {};
		user.eventsAttending = [];
		user.eventsHosting = [];
		user.eventsInvitedTo = [];
		//load databse values
		//user.uid = dataservice.loadUID();
		user.eventsAttending.push(dataservice.loadAttendingEvents(uid));
		//user.eventsHosting = loadHostingEvents();
		//user.eventsInvitedTo = loadEventInvitations();
	}

	userObject.getUID = function() {
		return user.uid;
	}
	userObject.getAllEventsAttending = function() {
		return user.eventsAttending;
	}
	userObject.getAllEventsHosting = function() {
		return user.eventsHosting;
	}
	userObject.getAllEventsInvitedTo = function() {
		return user.eventsInvitedTo;
	}
	userObject.createAHostedEvent = function(newEvent) {
		//add error checking
		user.eventsHosting.push(newEvent);
		//add to database
	}
	userObject.acceptAnEventInvitation = function(newEvent, inviteIDRemoving) {
		user.eventsAttending.push(newEvent);
		//loop through the invite array to remove the invite
		//update databse
	}
	userObject.deleteAHostedEvent = function(eventIDRemoving) {

	}
	
	return userObject;
}