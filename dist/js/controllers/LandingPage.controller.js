angular
    .module('meetUpEventApp')
    .controller('LandingPageController', LandingPageController);

LandingPageController.$inject = ['$log', '$location', '$document', 'userData'];

function LandingPageController($log, $location, $document, userData) {
	var vm = this;
	var fbURL = 'https://meetupplanner.firebaseio.com/';
	var authData = {};

	//define local variables
	vm.showRequirnments = false;
	vm.validNewName = {'valid':false, 'style':{color:''}};
	vm.validNewEmail = {'valid':false, 'style':{color:''}};
	vm.securePassword = {'secure':false, 'style':{color:''}};
	vm.unlockCreateUserBtn = {'usable':false, 'class':'btn btn-warning'};
	
	vm.validUserEmail = {'valid':false, 'style':{color:''}};
	vm.validUserPassword = {'valid':false, 'style':{color:''}};
	vm.unclockUserLoginBtn = {'usable':false, 'class':'btn btn-warning'};
	vm.passwordRequirnments = {
		0:{'constraint':'Is at least 16 characters long', 'style':{color:'red'}, 'met':false},
		1:{'constraint':'Is no longer than 100 characters', 'style':{color:'red'}, 'met':false},
		2:{'constraint':'Contains at least one required symbol (\!\@\#\$\%\^\&\*)', 'style':{color:'red'}, 'met':false},
		3:{'constraint':'Contains at least one number', 'style':{color:'red'}, 'met':false},
		4:{'constraint':'Contains at least one lowercase letter', 'style':{color:'red'}, 'met':false},
		5:{'constraint':'Contains at least one uppercase letter', 'style':{color:'red'}, 'met':false},
		6:{'constraint':"Doesn't have any illegal characters", 'style':{color:'red'}, 'met':false}
	};
	
	//define controller methods
	vm.displayPassReqs = function() {
		if(vm.newName && vm.newEmail) {
			vm.showRequirnments = true;
		} else {
			vm.showRequirnments = false;
		}
	}

	vm.checkNewName = function() {
		
		if(vm.newName) {
			if(vm.newName.length > 0) {
				vm.validNewName.valid = true;
				vm.validNewName.style = {color:'green'};
			} else {
				vm.validNewName.valid = false;
				vm.validNewName.style = {color:'red'};
			}
		}

		vm.openCreateUserButton();
	}

	vm.checkNewEmail = function () {
		if(vm.newEmail) {
			//check validity
			var constraint = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", "");

			if(constraint.test(vm.newEmail)) {
				vm.validNewEmail.valid = true;
				vm.validNewEmail.style = {color:'green'};
			} else {
				vm.validNewEmail.valid = false;
				vm.validNewEmail.style = {color:'red'};
			}			
		}
		
		vm.openCreateUserButton();
	}

	vm.checkUserEmail = function() {
		if(vm.userEmail) {
			//check validity
			var constraint = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", "");

			if(constraint.test(vm.userEmail)) {
				vm.validUserEmail.valid = true;
				vm.validUserEmail.style = {color:'green'};
			} else {
				vm.validUserEmail.valid = false;
				vm.validUserEmail.style = {color:'red'};
			}
		}

		vm.openUserLoginBtn();
	}

	vm.checkNewPasswords = function() {
		//for each password define the pattern that the password must match
		var constraints = {
	 		0: ['', ' your password needs to be 16 characters or longer'],
	 		1: ['', ' your password needs to be less than 100 characters'],
	 		2: ['[\!\@\#\$\%\^\&\*]', " no required symbols found"],
	 		3: ['[0-9]', " no numbers found"],
	 		4: ['[a-z]', " no lowercase letters found"],
	 		5: ['[A-Z]', " no uppercase letters found"],
	 		6: ['[^A-z0-9\!\@\#\$\%\^\&\*]', " illegal characters found"],
 		};
 		
 		//check for length
 		if(vm.newPassword) {
 			if(vm.newPassword.length > 15) { 
 				vm.passwordRequirnments[0].style = {color:'green'}; 
 				vm.passwordRequirnments[0].met = true; 
 			} else {
 				vm.passwordRequirnments[0].style = {color:'red'}; 
 				vm.passwordRequirnments[0].met = false;
 			}
 			if(vm.newPassword.length <= 100) { 
 				vm.passwordRequirnments[1].style = {color:'green'}; 
 				vm.passwordRequirnments[1].met = true;
 			} else {
 				vm.passwordRequirnments[1].style = {color:'red'}; 
 				vm.passwordRequirnments[1].met = false;
 			}

 			//check constraints 2-5
 			for(i = 2; i < 6; i++) {
	 			//check for required symbols, uppercase, losercase, and characters
	 			var constraint = new RegExp(constraints[i][0], "");	

	 			//test each constratint
	 			if(constraint.test(vm.newPassword)) {
	 				vm.passwordRequirnments[i].style = {color:'green'};
	 				vm.passwordRequirnments[i].met = true;
	 			} else {
	 				vm.passwordRequirnments[i].style = {color:'red'};
	 				vm.passwordRequirnments[i].met = false;
	 			}
	 		}

	 		//check illegal characters
	 		var constraint = new RegExp(constraints[6][0], "");

	 		//run the check
	 		if(!constraint.test(vm.newPassword)) {
	 			vm.passwordRequirnments[6].style = {color:'red'};
	 			vm.passwordRequirnments[6].met = false;
	 		} else {
	 			vm.passwordRequirnments[6].style = {color:'green'};
	 			vm.passwordRequirnments[6].met = true;
	 		}

	 		//if all constrains met, throw valid pass flag
	 		if( vm.passwordRequirnments[0].met &&
	 			vm.passwordRequirnments[1].met &&
	 			vm.passwordRequirnments[2].met &&
	 			vm.passwordRequirnments[3].met &&
	 			vm.passwordRequirnments[4].met &&
	 			vm.passwordRequirnments[5].met &&
	 			vm.passwordRequirnments[6].met) {
	 			vm.securePassword.secure = true
	 		} else {
	 			vm.securePassword.secure = false;
	 		}

	 		if(vm.securePassword.secure) {
	 			vm.securePassword.style = {color:'green'};
	 		} else {
	 			vm.securePassword.style = {color:'red'};
	 		}
 		}
 		
 		vm.openCreateUserButton();
	}

	vm.checkUserPasswords = function() {
		if(vm.userPassword) {
			if(vm.userPassword.length > 15) {
				vm.validUserPassword.style = {color:'green'};
				vm.validUserPassword.valid = true;
			} else {
				vm.validUserPassword.style = {color:'red'};
				vm.validUserPassword.valid = false;
			}

		}
		
		vm.openUserLoginBtn();
	}

	vm.openCreateUserButton = function() {
		if(vm.validNewName.valid && vm.validNewEmail.valid && vm.securePassword.secure) {
			vm.unlockCreateUserBtn.class = 'btn btn-success';
			vm.unlockCreateUserBtn.usable = true;
		} else {
			vm.unlockCreateUserBtn.class = 'btn btn-warning';
			vm.unlockCreateUserBtn.usable = false;	
		}

	}

	vm.openUserLoginBtn = function() {
		if(vm.validUserEmail.valid && vm.validUserPassword.valid) {
			vm.unclockUserLoginBtn.class = 'btn btn-success';
			vm.unclockUserLoginBtn.usable = true;
		} else {
			vm.unclockUserLoginBtn.class = 'btn btn-warning';
			vm.unclockUserLoginBtn.usable = false;	
		}
	}

	vm.update = function() {
		//set values
		vm.newName = $document.find('#newName')[0].value;
		vm.newEmail = $document.find('#newEmail')[0].value;
		vm.userEmail = $document.find('#userEmail')[0].value;
		
		vm.checkNewName();
		vm.checkNewEmail();
		vm.checkUserEmail();
	}

	vm.createNewUser = function() {
		if(vm.unlockCreateUserBtn.usable) {
			//define local variable
			var ref = new Firebase(fbURL);
			

			ref.createUser({
				email:vm.newEmail,
				password:vm.newPassword
			},function(error, userData) {
				if(error) {
					$log.info('Error creating user: ' + error);
				} else {
					//log results
					$log.info(userData);

					//generate the user record
					var usersRef = ref.child('Users/' + userData.uid);

					//write new user to the database with bio info
					usersRef.set({ 
						'bio': {
							'name': vm.newName,
							'email': vm.newEmail
						}
					}, function(error) {
						if(error) {
							$log.info('Data could not be saved: ' + error);
						} else {
							$log.info('Data saved successfully.');
						}
					});
					//out of the databse call
				}
			});

			$location.path('/userInformation');
		}
	}

	vm.loginRegisteredUser = function() {
		if(vm.unclockUserLoginBtn.usable) {
			//define local variable
			var ref = new Firebase(fbURL);
			var saveUserData = userData;

			ref.authWithPassword({
				email: vm.userEmail,
				password: vm.userPassword
			}, function(error, authData) {
				if(error) {
					$log.info('Error Logging In: ' + error);
				} else {
					$log.info('Logged In successfully: ' + authData.uid);

					//save all the data
					saveUserData.init(authData.uid, authData.provider, authData.token, authData.expires);

					$log.info(saveUserData.getUID());
					$log.info(saveUserData.getProvider());
					$log.info(saveUserData.getToken());
					$log.info(saveUserData.getExpiration());

				}
			});

		}

		$location.path('/userEvents');
	}

}