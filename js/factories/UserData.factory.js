angular
    .module('meetUpEventApp')
    .factory('userData', userData);

userData.$inject = ['$log', '$q', 'backendServices'];

/* @ngInject */
function userData($log, $q, backendServices) {
	//declare local variables
	var currentUser = {
		uid: '',
		name: '',
		email: '',
		company: '',
		title: '',
		dob: 0,
		hosting: {},
		pending: {},
		attending: {},
		completed: {}
	};

	var allUserData = {
		getUID: getUID,
		getName: getName,
		getEmail: getEmail,
		getCompany: getCompany,
		getTitle: getTitle,
		getDOB: getDOB,
		getUserEvents: getUserEvents,
		
		setUID: setUID,
		setName: setName,
		setEmail: setEmail,
		setCompany: setCompany,
		setTitle: setTitle,
		setDOB: setDOB,
		updateUserEvents: updateUserEvents,
		updateBio: updateBio,

		removeUserEvents: removeUserEvents,

		loadPrimaries: loadPrimaries,
		writeAllToDatabase: writeAllToDatabase,
		readAllFromDatabase: readAllFromDatabase,
		isABio: isABio,
		loadBio: loadBio
	}

	//read methods
	function getUID() {
		return currentUser.uid;
	}

	function getName() {
		return currentUser.name;
	}

	function getEmail() {
		return currentUser.email;
	}

	function getCompany() {
		return currentUser.company;
	}

	function getTitle() {
		return currentUser.title;
	}
	
	function getDOB() {
		return currentUser.dob;
	}

	function getUserEvents(type) {
		return currentUser[type];
	}

	//update methods
	function setUID(name) {
		currentUser.uid = uid;
	}

	function setName(name) {
		currentUser.name = name;
	}

	function setEmail(email) {
		currentUser.email = email;
	}

	function setCompany(company) {
		currentUser.company = company;
	}
	
	function setTitle(title) {
		currentUser.title = title;
	}

	function setDOB(dob) {
		currentUser.dob = dob;
	}

	function updateUserEvents(type, event) {
		currentUser[type][event.id] = event;
	}

	function updateBio(userBio) {
		//update local values
		setName(userBio.name);
		setEmail(userBio.email);
		setCompany(userBio.company);
		setTitle(userBio.title);
		setDOB(userBio.dob);
		//save to db
		writeAllToDatabase();
	}

	//delete Methods
	function removeUserEvents(type, event) {
		//does this work?
		currentUser[type][event.id].remove();
	}

	//other Methods
	function loadPrimaries(name, email) {
		setName(name);
		setEmail(email);
	}

	function writeAllToDatabase() {
		//local variables
		var db = backendServices;

		db.uploadUserData(currentUser);
	}

	function readAllFromDatabase() {
		//local variables
		var db = backendServices;

		db.downloadUserData()
		.then(function(userData) {
			currentUser = userData;
		})
	}

	function isABio() {
		if( currentUser.uid !== '' &&
			currentUser.name !== '' &&
			currentUser.email !== ''
			)
			return true;
		else return false;
	}
	function loadBio() {
		//local variables
		var db = backendServices;

		//might need to go out to the db so return a promise
		return $q(function(resolve, reject) {
			//check for bio
			if(isABio()) {
				resolve( {
					name: currentUser.name,
					email: currentUser.email,
					company: currentUser.company,
					title: currentUser.title,
					dob: currentUser.dob
				});
			} else {
				//go out to the db before resolving
				db.getUserBio()
				.then(function(userBio) {
					resolve(userBio);
				});
			}

		});

	}
	
	return allUserData;
}