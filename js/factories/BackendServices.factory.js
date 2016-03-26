angular
    .module('meetUpEventApp')
    .factory('backendServices', backendServices);

backendServices.$inject = ['$log', '$q', '$window'];

/* @ngInject */
function backendServices($log, $q, $window) {
	//declare local variables
	var fbURL = 'https://meetupplanner.firebaseio.com/';
	var allBackendServices = {
		utf8_to_b64: utf8_to_b64,
		b64_to_utf8: b64_to_utf8,
		unixTimeToDateTime: unixTimeToDateTime,
		dateTimeToUnixTime: dateTimeToUnixTime,		
		createNewUser: createNewUser,
		LoginRegisteredUser: LoginRegisteredUser,
		addNewUserToDatabase: addNewUserToDatabase,
		addNewUserToRegUsersList: addNewUserToRegUsersList,
		uploadUserData: uploadUserData,
		downloadUserData: downloadUserData,
		getUserBio: getUserBio,
		getUserEvents: getUserEvents
	};

	function utf8_to_b64(str) {
		return btoa(str);
	}

	function b64_to_utf8(str) {
    	return atob(str);
	}

	function unixTimeToDateTime(unixTime) {
		return new Date(parseInt(unixTime));
	}

	function dateTimeToUnixTime(dateTime) {
		return Date.parse(dateTime);
	}

	function createNewUser(email, password) {
		//declare local variables
		var fireBaseAccounts = new Firebase(fbURL);
		
		//return a promise
		return $q(function(resolve, reject) {
			
			/*fireBaseAccounts.createUser({
				
				email: email,
				password: password
			
			},function(error, userData) {
				
				if(error) reject('Error creating user: ' + error);

				else resolve(userData);
			}*/
			$window.setTimeout(function() {
				resolve({uid:1234567 });
			}, 2000);
		});
	}

	function addNewUserToDatabase(uid, name, email) {
		//declare local variables
		var app = new Firebase(fbURL);
		var appUsers = app.child('Users/' + uid);
		var currentDate = new Date();

		//return a promise
		return $q(function(resolve, reject) {
			
			/*appUsers.set({ 
				'bio': {
					'name': name,
					'email': email
				},
				'events': {
					'pending': {
						'updated': dateTimeToUnixTime(currentDate)
					},
					'hosting': {
						'updated': dateTimeToUnixTime(currentDate)
					},
					'attending': {
						'updated': dateTimeToUnixTime(currentDate)
					},
					'completed': {
						'updated': dateTimeToUnixTime(currentDate)
					}

				}

			}, function(error) {

				if(error) reject('Data could not be saved: ' + error);
				
				else resolve('Data saved successfully.');

			});*/

			$window.setTimeout(function() {
				resolve('Data saved successfully.');
			}, 2000);

		});

	}

	function addNewUserToRegUsersList(uid, email) {
		//declare local variables
		var app = new Firebase(fbURL);
		var RegisteredUsersList = app.child('Uids').child(utf8_to_b64(email));

		//return a promise
		return $q(function(resolve, reject) {
			
			/*RegisteredUsersList.set(uid, function(error) {
				if(error) reject("Data could not be saved. " + error);
				else resolve("uid created sucessfully.");
			});*/

			$window.setTimeout(function() {
				resolve("uid created sucessfully.");
			}, 2000);

		});

	}

	function LoginRegisteredUser(email, password) {
		//declare local variables
		var app = new Firebase(fbURL);
		
		return $q(function(resolve, reject) {

			/*//authenticate the user
			app.authWithPassword({

				email: email,
				password: password

			}, function(error, authData) {
				
				if(error) {
					reject('Error Logging In: ' + error);
				} else {
					$log.info('Logged In successfully: ' + authData.uid);
					resolve(authData);
				}

			});*/

			$window.setTimeout(function() {
				resolve({ uid: '2098sj-djiso92-sjir' });
			}, 2000);

		});
		
	}

	function uploadUserData(allUserData) {
		//declare local variables
		var app = new Firebase(fbURL);
		var currentUser = app.child('Users/' + allUserData.uid);

		//return the promise
		return $q(function(resolve, reject) {
			//the actual call
			/*currentUser.update(allUserData, function(error) {
				if(error) reject('There was a problem updating that record: ' + error);
				else resolve('all user data uploaded successfully');
			});*/
			$window.setTimeout(function() {
				resolve('all user data uploaded successfully');
			}, 2000);

		});
		
	}

	function downloadUserData() {

	}

	function getUserBio(uid) {
		//declare local variables
		var app = new Firebase(fbURL);
		var userBio = app.child('Users').child(uid).child('bio');

		//return the promise
		return $q(function(resolve, reject) {
			//the actual call
			/*call goes here*/
			$window.setTimeout(function() {
				resolve({
					uid: 'soaiu0-9283m-msoSA-2m3-srew',
					name: 'Ian McAllister',
					email: 'iemcallister@gmail.com',
					company: '',
					title: ''
				});
			}, 2000);

		});
	}

	function getUserEvents(uid) {
		//declare local variables
		var app = new Firebase(fbURL);
		var userBio = app.child('Users').child(uid).child('bio');

		//return the promise
		return $q(function(resolve, reject) {
			//the actual call
			/*call goes here*/
			$window.setTimeout(function() {
				resolve({
					hosting: { id: '9837423' },
					pending: { id: '3209742' },
					attending: { id: '40982' },
					completed: { id: '32957' }
				});
			}, 2000);

		});
	}

	//return the object
	return allBackendServices;
}