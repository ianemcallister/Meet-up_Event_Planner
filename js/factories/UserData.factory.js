angular
    .module('meetUpEventApp')
    .factory('userData', userData);

userData.$inject = ['$log', '$q', 'backendServices'];

/* @ngInject */
function userData($log, $q, backendServices) {
	//declare local variables
	var currentUser = {
		bio: { 
			uid: '',
			name: '',
			email: '',
			company: '',
			title: '',
			dob: 0
		},
		events: {
			hosting: {},
			pending: {},
			attending: {},
			completed: {}
		}
	};

	var allUserData = {
		bioPrimariesAreCompleteLocally: bioPrimariesAreCompleteLocally,		//modal analysis
		eventExistsLocally: eventExistsLocally,

		cleanEvents: cleanEvents,		//model maintainance

		getUIDLocally: getUIDLocally,	//getter Methods
		getNameLocally: getNameLocally,
		getEmailLocally: getEmailLocally,
		getCompanyLocally: getCompanyLocally,
		getTitleLocally: getTitleLocally,
		getDOBLocally: getDOBLocally,
		getFullBioLocally: getFullBioLocally,
		getOneUserEventLocally: getOneUserEventLocally,
		getUserEventsLocally: getUserEventsLocally,
		getAllUserEventsLocally: getAllUserEventsLocally,

		setUIDLocally: setUIDLocally,	//setter Methods
		setNameLocally: setNameLocally,
		setEmailLocally: setEmailLocally,
		setCompanyLocally: setCompanyLocally,
		setTitleLocally: setTitleLocally,
		setDOBLocally: setDOBLocally,
		setPrimariesLocally: setPrimariesLocally,
		updateUserEventsLocally: updateUserEventsLocally,
		updateAllUserEventsLocally: updateAllUserEventsLocally,
		updateBioLocally: updateBioLocally,

		removeUserEventsLocally: removeUserEventsLocally, //remove data
		
		getFullRemoteDBforLocal: getFullRemoteDBforLocal,	//local-remote interacions
		getRemoteBioForLocal: getRemoteBioForLocal,			
		getRemoteEventsForLocal: getRemoteEventsForLocal,
		getOneRemoteEventForLocal: getOneRemoteEventForLocal,
		setFullRemoteDBfromLocal: setFullRemoteDBfromLocal,
		setRemoteBioFromLocal: setRemoteBioFromLocal,
		setRemoteEventsFromLocal: setRemoteEventsFromLocal,
		cleanDBEventsCategory: cleanDBEventsCategory,

		loadBio: loadBio,	//external methods
		loadEventsProgressively: loadEventsProgressively,
		loadAnEventProgressively: loadAnEventProgressively,
		createNewEvent: createNewEvent
	}

	//analysis methods
	function bioPrimariesAreCompleteLocally() {
		if( currentUser.bio.uid !== '' &&
			currentUser.bio.name !== '' &&
			currentUser.bio.email !== ''
			)
			return true;
		else return false;
	}

	function eventExistsLocally(type, eventId) {
		$log.info('checking if the event exits');
		if(angular.isDefined(currentUser.events[type][eventId])) return true;
		else return false;
	}

	//model maintainance
	function cleanEvents(type) {
		//iterate through objects in object
		Object.keys(currentUser.events[type]).forEach(function(key) {
			//if any are non-objects, delete them
			if(!angular.isObject(currentUser.events[type][key])) {
				delete currentUser.events[type][key];
			}
		});
	}

	//getter methods
	function getUIDLocally() {
		return currentUser.bio.uid;
	}

	function getNameLocally() {
		return currentUser.bio.name;
	}

	function getEmailLocally() {
		return currentUser.bio.email;
	}

	function getCompanyLocally() {
		return currentUser.bio.company;
	}

	function getTitleLocally() {
		return currentUser.bio.title;
	}
	
	function getDOBLocally() {
		return currentUser.bio.dob;
	}

	function getFullBioLocally() {
		return {
			uid: currentUser.bio.uid,
			name: currentUser.bio.name,
			email: currentUser.bio.email,
			company: currentUser.bio.company,
			title: currentUser.bio.title,
			dob: currentUser.bio.dob
		};
	}

	function getOneUserEventLocally(type, eventId) {
		return currentUser.events[type][eventID];
	}

	function getUserEventsLocally(type) {
		return currentUser.events[type];
	}

	function getAllUserEventsLocally() {
		return currentUser.events;
	}

	//setter methods
	function setUIDLocally(uid) {
		currentUser.bio.uid = uid;
	}

	function setNameLocally(name) {
		currentUser.bio.name = name;
	}

	function setEmailLocally(email) {
		currentUser.bio.email = email;
	}

	function setCompanyLocally(company) {
		currentUser.bio.company = company;
	}
	
	function setTitleLocally(title) {
		currentUser.bio.title = title;
	}

	function setDOBLocally(dob) {
		currentUser.bio.dob = dob;
	}

	function setPrimariesLocally(email, name, uid) {
		if(angular.isDefined(email)) setEmailLocally(email);
		if(angular.isDefined(name)) getNameLocally(name);
		if(angular.isDefined(uid)) setUIDLocally(uid);
	}

	function updateUserEventsLocally(type, event) {
		//declare local variables
		var eventID = event.id;

		//check if the model needs to be cleaned
		cleanEvents(type);
		//then load the new event
		currentUser.events[type][eventID] = event;
	}

	function updateAllUserEventsLocally(allUserEvents) {
		currentUser.events = allUserEvents;
	}

	function updateBioLocally(userBio) {
		//update local values
		setNameLocally(userBio.name);
		setEmailLocally(userBio.email);
		setCompanyLocally(userBio.company);
		setTitleLocally(userBio.title);
		setDOBLocally(userBio.dob);
		//save to db
		setRemoteBioFromLocal();
	}

	//delete Methods
	function removeUserEventsLocally(type, event) {
		//does this work?
		delete currentUser.events[type][event.id];
	}

	//remote-local interaction Methods
	function getFullRemoteDBforLocal() {
		//local variables
		var db = backendServices;

		db.downloadUserData()
		.then(function(remoteUserData) {
			currentUser = remoteUserData;
		})
	}

	function getRemoteBioForLocal(uid) {
		//local variables
		var db = backendServices;
				
		return $q(function(resolve, reject) {
			//go out to the db before resolving
			db.getUserBio(uid)
			.then(function(userBio) {

				resolve(userBio);
			})
			.catch(function(error) {
				reject('There was an error reading the user bio: ' + error);
			})
		});
		
	}

	function getRemoteEventsForLocal() {
		//local variables
		var db = backendServices;
				
		return $q(function(resolve, reject) {

			//go out to the db before resolving
			db.getUserEvents(getUIDLocally())
			.then(function(obtainedUserEvents) {

				//save the results to the local databse
				Object.keys(obtainedUserEvents).forEach(function(eventType) {
					//within each event type iterate through the actual events
					Object.keys(obtainedUserEvents[eventType]).forEach(function(event) {
						//once we see the events, save them to the local model

						updateUserEventsLocally(eventType, obtainedUserEvents[eventType][event]);
					});
				});
				
				//return the results to the requesting object
				resolve(obtainedUserEvents);
			})
			.catch(function(error) {
				reject('There was an error reading the user events: ' + error);
			})
		});
	}

	function getOneRemoteEventForLocal(eventId) {
		//local variables
		var db = backendServices;

		return $q(function(resolve, reject) {
			
			//going to backend services
			db.getAHostedEvent(getUIDLocally(), eventId)
			.then(function(obtainedEvent) {

				//save the result to the local model
				$log.info(obtainedEvent);
				//return the result to the requesting object
				resolve(obtainedEvent);
			})
			.catch(function(error) {
				reject('There was an error reading the user event: ' + error);
			})
		});
	}

	function setFullRemoteDBfromLocal() {
		//local variables
		var db = backendServices;

		db.uploadUserData(currentUser);
	}

	function setRemoteBioFromLocal() {
		//local variables
		var db = backendServices;

		db.uploadUserBio(currentUser.bio);
	}

	function setRemoteEventsFromLocal() {}

	function cleanDBEventsCategory(category) {
		//declar local variables
		var db = backendServices;

		//remove 'updated' object if need be
		//db call so return a promise
		return $q(function(resolve, reject) {
			//check for object
			db.thereWasAnUpdateField(category, getUIDLocally())
			.then(function(affirmativeResponse) {
				//if there was an update field, delete it
				db.deleteUpdateField(category, getUIDLocally())
				.then(function(affirmativeResponse) { $log.info(affirmativeResponse); } )
				.catch(function(errorResponse) { $log.info(errorResponse); } )
			})
			.catch(function(errorResponse) {
				$log.info(errorResponse)
			})

		});
		//if it is there, remove it
	}

	function loadBio(uid) {

		//might need to go out to the db so return a promise
		return $q(function(resolve, reject) {

			//check for bio locally first
			if(bioPrimariesAreCompleteLocally()) {
				
				//pass it back as success
				resolve(getFullBioLocally());
			} else {
				//if they're not complete locally, check the server
				getRemoteBioForLocal(uid)
				.then(function(bioFromRemoteDB) {
					resolve(bioFromRemoteDB);
				})
				.catch(function(error) {
					reject(error);
				})
			}

		});

	}

	function loadAnEventProgressively(uid, eventId) {
		//update uid if need be
		setUIDLocally(uid);

		//going out the the db so return a promise
		return $q(function(resolve, reject) {

			//reach out to db
			getOneRemoteEventForLocal(eventId)
			.then(function(obtainedUserEvent) {
				//when the db results come back, return it
				resolve(obtainedUserEvent)
			})
			.catch()

			//first return whatever event info is stored locally
			//check if the event is available locally
			if(eventExistsLocally('hosting', eventId)) resolve(getOneUserEventLocally('hosting', eventId));
		});

	}

	function loadEventsProgressively(uid) {
		var eventTypes = ['attending', 'pending', 'hosting', 'completed'];
		var allEvents = {};

		//will go out to the db so return a promise
		return $q(function(resolve, reject) {

			getRemoteEventsForLocal()
			.then(function(obtainedUserEvents) {
				//when the db results come back, return those
				resolve(obtainedUserEvents);
			})

			//build the local model
			allEvents = getUserEventsLocally(type);

			//first return whatever event info is stored locally
			resolve(allEvents);
		});

	}

	function createNewEvent(eventID) {
		//declar local variables
		var db = backendServices;
		var newEvent = {};

		//first create the object
		newEvent = {
			id: eventID,
			name: '',
			type: '',
			host: {
				name: currentUser.bio.name,
				uid: currentUser.bio.uid
			},
			message: '',
			eventTimes: {
				start: 0,
				end: 0
			},
			address: {
				street01: '',
				street02: '',
				street03: '',
				city: '',
				state: '',
				zip: 0
			},
			guestList: {}
		};

		//save it locally
		updateUserEventsLocally('hosting', newEvent);

		//then create it on the server
		//will go out to the db so return a promise
		return $q(function(resolve, reject) {
			
			//manage the promise responses
			db.createHostedEvent(getUIDLocally(), newEvent)
			.then(function(message) {
				resolve(message);
			})
			.catch(function(error) {
				reject(error);
			})

		});

	}
	
	return allUserData;
}