//services
meetUpEventApp.service('userData', function() {

	//declaring owned properties
	this.uid='';
	this.token='';
	this.eventsHosting={};
	this.eventsAttending={};
	this.eventInvitations={};
})