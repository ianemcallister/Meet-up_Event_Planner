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
		hosting: {},
		pending: {},
		attending: {},
		completed: {}
	};

	var allUserData = {
		bioPrimariesAreCompleteLocally: bioPrimariesAreCompleteLocally,		//modal analysis

		getUIDLocally: getUIDLocally,	//getter Methods
		getNameLocally: getNameLocally,
		getEmailLocally: getEmailLocally,
		getCompanyLocally: getCompanyLocally,
		getTitleLocally: getTitleLocally,
		getDOBLocally: getDOBLocally,
		getFullBioLocally: getFullBioLocally,
		getUserEventsLocally: getUserEventsLocally,
		
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
		setFullRemoteDBfromLocal: setFullRemoteDBfromLocal,
		setRemoteBioFromLocal: setRemoteBioFromLocal,
		setRemoteEventsFromLocal: setRemoteEventsFromLocal,

		loadBio: loadBio	//external methods
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

	function getUserEventsLocally(type) {
		return currentUser[type];
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
		currentUser[type][event.id] = event;
	}

	function updateAllUserEventsLocally(allUserEvents) {
		currentUser.hosting = allUserEvents.hosting;
		currentUser.pending = allUserEvents.pending;
		currentUser.attending = allUserEvents.attending;
		currentUser.completed = allUserEvents.completed;
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
		currentUser[type][event.id].remove();
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

		$log.info('going out to the db for bio');
				
		return $q(function(resolve, reject) {
			//go out to the db before resolving
			db.getUserBio(uid)
			.then(function(userBio) {
				$log.info('found the bio remotly');
				$log.info(userBio);
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

		$log.info('going out to the db for events');
				
		return $q(function(resolve, reject) {
			//go out to the db before resolving
			db.getUserEvents(uid)
			.then(function(obtainedUserEvents) {
				//save the results to the local databse
				obtainedUserEvents.forEach(function(eventType) {
					//access the event categories, attending, pending, etc...
					eventType.forEach(function(event) {
						//save each event to the proper place
						updateUserEventsLocally(eventType, event);
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

	function setFullRemoteDBfromLocal() {
		//local variables
		var db = backendServices;

		db.uploadUserData(currentUser);
	}

	function setRemoteBioFromLocal() {
		//local variables
		var db = backendServices;

		$log.info('from setRemoteBioFromLocal');
		$log.info(currentUser);

		db.uploadUserBio(currentUser.bio);
	}

	function setRemoteEventsFromLocal() {}

	function loadBio(uid) {

		//might need to go out to the db so return a promise
		return $q(function(resolve, reject) {

			//check for bio locally first
			if(bioPrimariesAreCompleteLocally()) {
					
				//let us know that you'll be passing them back
				$log.info('returning a local bio');
				
				//show us what we'll be returning
				$log.info(getFullBioLocally());
				
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
	
	return allUserData;
}