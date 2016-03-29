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

	//local functions
	function utf8_to_b64(str) {
		return btoa(str);
	}

	function b64_to_utf8(str) {
    	return atob(str);
	}

	var allUserData = {
		bioPrimariesAreCompleteLocally: bioPrimariesAreCompleteLocally,		//modal analysis
		eventExistsLocally: eventExistsLocally,
		thisIsTheHostEmail: thisIsTheHostEmail,
		guestInvitedAlready: guestInvitedAlready,

		cleanEvents: cleanEvents,							//model maintainance

		getUIDLocally: getUIDLocally,						//getter Methods
		getNameLocally: getNameLocally,
		getEmailLocally: getEmailLocally,
		getCompanyLocally: getCompanyLocally,
		getTitleLocally: getTitleLocally,
		getDOBLocally: getDOBLocally,
		getFullBioLocally: getFullBioLocally,
		getOneUserEventLocally: getOneUserEventLocally,
		getUserEventsLocally: getUserEventsLocally,
		getAllUserEventsLocally: getAllUserEventsLocally,

		setUIDLocally: setUIDLocally,						//setter Methods
		setNameLocally: setNameLocally,
		setEmailLocally: setEmailLocally,
		setCompanyLocally: setCompanyLocally,
		setTitleLocally: setTitleLocally,
		setDOBLocally: setDOBLocally,
		setPrimariesLocally: setPrimariesLocally,
		updateUserEventsLocally: updateUserEventsLocally,
		updateAllUserEventsLocally: updateAllUserEventsLocally,
		updateBioLocally: updateBioLocally,
		addGuestToHostGuestList: addGuestToHostGuestList,

		removeUserEventsLocally: removeUserEventsLocally, 	//remove data
		
		getFullRemoteDBforLocal: getFullRemoteDBforLocal,	//local-remote interacions
		getRemoteBioForLocal: getRemoteBioForLocal,			
		getRemoteEventsForLocal: getRemoteEventsForLocal,
		getOneRemoteEventForLocal: getOneRemoteEventForLocal,
		setFullRemoteDBfromLocal: setFullRemoteDBfromLocal,
		setRemoteBioFromLocal: setRemoteBioFromLocal,
		setRemoteEventsFromLocal: setRemoteEventsFromLocal,
		cleanDBEventsCategory: cleanDBEventsCategory,
		getUserIdForGuest: getUserIdForGuest,
		getEventGuestList: getEventGuestList,

		loadBio: loadBio,									//external methods
		loadEventsProgressively: loadEventsProgressively,
		loadAnEventProgressively: loadAnEventProgressively,
		createNewEvent: createNewEvent,
		updatePendingEventsListForGuest: updatePendingEventsListForGuest
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

	function thisIsTheHostEmail(email, eventId) {
		$log.info('current user bio is:');
		$log.info(currentUser.bio);
		//check if a bio is loaded
		if(angular.isDefined(currentUser.bio.email)) {
			$log.info('email is defined');
			if(currentUser.bio.email != '') {
				//check for a match
				if(email == currentUser.bio.email) {
					$log.info('email matches');
					return true;
				} else {
					$log.info('email does not match');
					return false;
				}

			} 
			
		} 
		
		//if that didn't work check the current event
		$log.info('current event is:');
		$log.info(currentUser.events.hosting[eventId]);
		if(currentUser.events.hosting[eventId].host.email == email) {
			$log.info('event host email matches');
			return true;
		} else {
			$log.info('event host email DOESN\'T not match');
			return false;
		}
		
	}

	function guestInvitedAlready(email, eventId) {
		//first check if there is a guest list
		$log.info(currentUser.events.hosting[eventId]);
		if(angular.isDefined(currentUser.events.hosting[eventId].guestList)) {
			//if there is a list, check for the email
			$log.info('there is a guest list');

			//convert email for evaluation
			refEmail = utf8_to_b64(email);

			//run through each guest and compare
			Object.keys(currentUser.events.hosting[eventId].guestList).forEach(function(b64Email) {
				if(refEmail == b64Email) {
					$log.info('an email match was found, this guest has been invited already');
					return true;
				} else {
					$log.info('no email match found, ok to invite guest');
					return false;
				}
			})

		} else {
			//if no guest list than can't already be on it
			$log.info('no guestlist');
			return false;
		}

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
		return currentUser.events[type][eventId];
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

	function addGuestToHostGuestList(name, email, guestId, eventId, uid) {
		//call to the db so return a promise
		var db = backendServices;

		return $q(function(resolve, reject) {
			//convert the email if one was passed
			if(angular.isDefined(email)) {
				guestId = utf8_to_b64(email);
			}

			db.addGuestToHostGuestListonDB(name, guestId, eventId, uid)
			.then(function(positiveResult) {
				resolve(positiveResult);
			})
			.catch(function(negativeResult) {
				reject(negativeResult);
			})
		});

	}

	function getUserIdForGuest(email) {
		//call to the db so return a promise
		var db = backendServices;

		return $q(function(resolve, reject) {
			//convert the email
			guestEmail = utf8_to_b64(email);

			db.findGuestUID(guestEmail)
			.then(function(uid) {
				resolve(uid);
			})
			.catch(function(errorResponse) {
				reject(errorResponse);
			})

		});
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

	function getEventGuestList(hostId, eventId) {
		//declare local variables
		var db = backendServices;

		return $q(function(resolve, reject) {
			//get the object
			db.getGuestListForEvent(hostId, eventId)
			.then(function(obtainedList) {
				resolve(obtainedList);
			})
			.catch(function(errorResponse) {
				reject(errorResponse);
			})
		})
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
				uid: currentUser.bio.uid,
				email: currentUser.bio.email
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

	function updatePendingEventsListForGuest(eventId) {
		//declar local variables
		var db = backendServices;

		return $q(function(resolve, reject) {

			//manage the db promise
			//db.addPendingEventForGuest(currentUser.getUIDLocally(), hostId, eventId, currentUser.getUserEventsLocally('', eventId))
		});

	}
	
	return allUserData;
}