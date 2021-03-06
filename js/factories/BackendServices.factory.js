angular
    .module('meetUpEventApp')
    .factory('backendServices', backendServices);

backendServices.$inject = ['$log', '$q', '$window'];

/* @ngInject */
function backendServices($log, $q, $window) {
	//declare local variables
	var fbURL = 'https://meetupplanner.firebaseio.com/';
	var allBackendServices = {
		utf8_to_b64: utf8_to_b64, 						//local functions to convert dates
		b64_to_utf8: b64_to_utf8,
		unixTimeToDateTime: unixTimeToDateTime,
		dateTimeToUnixTime: dateTimeToUnixTime,

		LoginRegisteredUser: LoginRegisteredUser,		//authenticaion
		checkLoginStatus: checkLoginStatus,
		logUserOut: logUserOut,

		downloadUserData: downloadUserData,				//getter methods
		getUserBio: getUserBio,
		getUserEvents: getUserEvents,
		getAHostedEvent: getAHostedEvent,
		getAnInvitedEvent: getAnInvitedEvent,
		findGuestUID: findGuestUID,
		getGuestListForEvent: getGuestListForEvent,

		createNewUser: createNewUser,					//setter Methods
		addNewUserToDatabase: addNewUserToDatabase,
		addNewUserToRegUsersList: addNewUserToRegUsersList,
		uploadUserData: uploadUserData,
		uploadUserBio: uploadUserBio,
		createHostedEvent: createHostedEvent,
		addGuestToHostGuestListonDB: addGuestToHostGuestListonDB,
		//addPendingEventForUser: addPendingEventForUser,
		//addPendingEventForGuest: addPendingEventForGuest,

		deleteUpdateField: deleteUpdateField,			//delete methods
		removeIncompleteEvent: removeIncompleteEvent,

		thereWasAnUpdateField: thereWasAnUpdateField	//model maintainance
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
			
			fireBaseAccounts.createUser({
				
				email: email,
				password: password
			
			},function(error, userData) {
				
				if(error) reject('Error creating user: ' + error);

				else resolve(userData);
			});

		});
	}

	function addNewUserToDatabase(uid, name, email) {
		//declare local variables
		var app = new Firebase(fbURL);
		var appUsers = app.child('Users').child(uid);
		var currentDate = new Date();

		//return a promise
		return $q(function(resolve, reject) {
			
			appUsers.set({ 
				'bio': {
					'uid': uid,
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

			});

		});

	}

	function addNewUserToRegUsersList(uid, email) {
		//declare local variables
		var app = new Firebase(fbURL);
		var b64Email = utf8_to_b64(email);
		var RegisteredUsersList = app.child('Uids').child(b64Email);

		//return a promise
		return $q(function(resolve, reject) {
			
			RegisteredUsersList.set(uid, function(error) {
				if(error) reject("Data could not be saved. " + error);
				else resolve("uid created sucessfully.");
			});

		});

	}

	function LoginRegisteredUser(email, password) {
		//declare local variables
		var app = new Firebase(fbURL);
		
		return $q(function(resolve, reject) {

			//authenticate the user
			app.authWithPassword({

				email: email,
				password: password

			}, function(error, authData) {
				
				if(error) {
					reject('Error Logging In: ' + error);
				} else {
					//$log.info('Logged In successfully: ' + authData.uid);
					resolve(authData);
				}

			});

		});
		
	}

	function checkLoginStatus() {
		//declare local variables
		var app = new Firebase(fbURL);

		return $q(function(resolve, reject) {
			
			app.onAuth(function(authData) {
				if (authData) {
				    //$log.info("User " + authData.uid + " is logged in with " + authData.provider);
				    resolve(true);
				  } else {
				    //$log.info("User is logged out");
				    resolve(false);
				  }
			});

		});
	}

	function logUserOut() {
		//declare local variables
		var app = new Firebase(fbURL);

		$log.info('logging user out');
		app.unauth();
	}

	function uploadUserData(allUserData) {
		//declare local variables
		var app = new Firebase(fbURL);
		var uid = allUserData.uid;
		var remoteUser = app.child('Users').child(uid);

		//return the promise
		return $q(function(resolve, reject) {
			//the actual call
			remoteUser.update(allUserData, function(error) {
				if(error) reject('There was a problem updating that record: ' + error);
				else resolve('all user data uploaded successfully');
			});

		});
		
	}

	function uploadUserBio(currentUserBio) {
		//declare local variables
		var app = new Firebase(fbURL);
		var uid = (currentUserBio.uid).toString();
		var remoteUserBio = app.child('Users').child(uid).child('bio');

		//return the promise
		return $q(function(resolve, reject) {

			//call to the db
			remoteUserBio.update(currentUserBio, function(error) {
				if(error) reject('There was a problem updating that record: ' + error);
				else resolve('all user bio data uploaded successfully');
			})

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
			userBio.once('value', function(snapshot) {
				//when the call is successful return the data
				resolve(snapshot.val());
			}, function(error) {
				if(error) {
					reject(error);
				} 
			});

		});
	}

	function createHostedEvent(uid, newEvent) {

		//declare local variables
		var app = new Firebase(fbURL);
		var eventID = newEvent.id;
		var newHostedEvent = app.child('Users').child(uid).child('events').child('hosting').child(eventID);

		//return the promise
		return $q(function(resolve, reject) {
			
			//call to firebase
			newHostedEvent.set(newEvent, function(error) {
				if(error) reject('There was an error: ' + error);
				else resolve('New event saved to DB successfully');
			})
		});

	}

	function addGuestToHostGuestListonDB(name, guiestId, eventId, uid) {
		//declare local variables
		var app = new Firebase(fbURL);
		var guestList = app.child('Users').child(uid).child('events').child('hosting').child(eventId).child('guestList').child(guiestId);

		//return the promise
		return $q(function(resolve, reject) {

			//call to the db
			guestList.set({
				rsvpd: false,
				status: 'pending',
				name: name
			}, function(error) {
				if(error) reject('There was an error: ' + error);
				else resolve('New event saved to DB successfully');
			})

		});
	}

	function getUserEvents(uid) {
		//declare local variables
		var app = new Firebase(fbURL);
		var userEvents = app.child('Users').child(uid).child('events');
		
		//return the promise
		return $q(function(resolve, reject) {
			//the actual call
			userEvents.orderByKey().once('value', function(snapshot) {
				var userProfile = snapshot.val();

				//when the call is successful return the data
				var eventsPackage = {
					hosting: userProfile.hosting,
					attending: userProfile.attending,
					pending: userProfile.pending,
					completed: userProfile.completed
				};

				resolve(eventsPackage);
			}, function(error) {
				if(error) {
					reject(error);
				} 
			});

		});
	}

	function getAHostedEvent(uid, eventId) {

		//declare local variables
		var app = new Firebase(fbURL);
		var hostedEvent = app.child('Users').child(uid).child('events').child('hosting').child(eventId);

		//return the promise
		return $q(function(resolve, reject) {
			//the actual call
			hostedEvent.once('value', function(snapshot) {
				var selectEvent = snapshot.val();

				resolve(selectEvent);
			}, function(error) {
				if(error) reject(error);
			})
		})
	}

	function findGuestUID(guestb64Email) {
		//declare local variables
		var app = new Firebase(fbURL);
		var uids = app.child('Uids');

		//return the promise
		return $q(function(resolve, reject) {
			//call to db
			uids.once('value', function(snapshot) {
				//distill results
				var allUsers = snapshot.val();

				Object.keys(allUsers).forEach(function(key) {
					//check each user
					if(key == guestb64Email) {
						resolve(allUsers[key]);
					} else {
						reject('No user by that email');
					}

				});

			});

		});

	}

	function getGuestListForEvent(hostId, eventId) {
		//declare local variables
		var app = new Firebase(fbURL);
		var guestList = app.child('Users').child(hostId).child('events').child('hosting').child(eventId).child('guestList');

		return $q(function(resolve, reject) {

			//call the db
			guestList.once('value', function(snapshot) {
				//local variable
				var theList = snapshot.val();

				resolve(theList);
			}, function(error) {
				if(error) reject('There was an error getting the guest list: ' +  error);
			})
		})
	}

	function getAnInvitedEvent(hostId, uid, eventId) {}

	/*
	function addPendingEventForUser(uid, hostId, eventId, event) {
		//declare local variables
		var app = new Firebase(fbURL);
		var userPendingList = app.child('Users').child(uid).child('events').child('pending');

		//mange the promise
		return $q(function(resolve, reject) {

			//call the db
			userPendingList.set({
				hostId: {
					eventId: {
						event
					}
				}
			}, function(error) {
				if(error) reject("Error adding to user pending list: " + error);
				else return resolve('Added to user pending list successfully');
			})

		});

	}

	function addPendingEventForGuest(uid, hostId, eventId, event) {
		//declare local variables
		var app = new Firebase(fbURL);
		var guestsPendingList = app.child('Unregistered').child(uid).child('events').child('pending');

		//mange the promise
		return $q(function(resolve, reject) {

			//call the db
			userPendingList.set({
				hostId: {
					eventId: {
						event
					}
				}
			}, function(error) {
				if(error) reject("Error adding to user pending list: " + error);
				else return resolve('Added to user pending list successfully');
			})

		});

	}*/

	function deleteUpdateField(category, uid) {
		//declare local variables
		var app = new Firebase(fbURL);
		var catRemovingFrom = app.child('Users').child(uid).child('events').child(category).child('updated');

		//return the promise
		return $q(function(resolve, reject) {
			catRemovingFrom.set(null, function(error) {
				if(error) reject('There was an error deleting update field: ' + error);
				else resolve('Deleted update successfully');
			})
		});

	}

	function removeIncompleteEvent(uid, eventId) {
		//declare local variables
		var app = new Firebase(fbURL);
		var eventToRemove = app.child('Users').child(uid).child('events').child('hosting').child(eventId);

		return $q(function(resolve, reject) {
			var onComplete = function(error) {
				if(error) {
					reject('Synchronization failed');
				} else {
					resolve('Synchronization succeeded');
				}
			}

			//call do db
			eventToRemove.remove(onComplete);
		});

	}

	function thereWasAnUpdateField(category, uid) {
		//declare local variables
		var app = new Firebase(fbURL);
		var catToCheck = app.child('Users').child(uid).child('events').child(category);

		//return the promise
		return $q(function(resolve, reject) {
			//call the db
			catToCheck.once('value', function(snapshot) {
				//save the response
				var currentCatModel = snapshot.val();
				//show what was found
				//look for the update field
				if(angular.isDefined(currentCatModel['updated'])) resolve(true);
				else reject(false);

			}, function(error) {
				if(error) reject(error);
			})
		});
	}

	//return the object
	return allBackendServices;
}