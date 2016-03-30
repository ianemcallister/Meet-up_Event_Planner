/* ToolBar.directive.js */

/**
* @desc toolbar directive that is used on the main page across the entire app.
* @example <div tool-bar></div>
*/

angular
	.module('meetUpEventApp')
	.directive('toolBar', toolBar);

/* @ngInject */
function toolBar() {
	var directive = {
		restrict: 'AECM',
		templateUrl: 'views/directives/toolBar.directive.htm',
		replace: true,
		scope: {},
		link: linkFunc,
		controller: ToolBarController,
		controllerAs: 'vm',
		bindToController: true
	}

	/* @ngInject */
	function linkFunc(scope, el, attr, ctrl) {
    }

    ToolBarController.$inject = ['$scope', '$log', 'backendServices', 'trafficValet'];
    /* @ngInject */
    function ToolBarController($scope, $log, backendServices, trafficValet) {
	    var vm = this;

	    //local controler variables
	    var fbConnect = backendServices;
	    var toolbarSherpa = trafficValet;

	    //local view variables
		function checkLoginStatus() {

			fbConnect.checkLoginStatus()
			.then(function(status) {
				
				vm.loggedIn = status;
			})
			.catch()
		}

		//vm methods
		vm.login = function() {

		}

		vm.logout = function() {
			$log.info('logging out');
			
			//logout
			fbConnect.logUserOut();
			
			//redirect
			toolbarSherpa.redirectTo('/login');
		}

		vm.loginRegisteredUser = function() {
			//declare local variables
			var registeredUserSherpa = trafficValet;

			//confirm all fields are valid
			if(true) {
				//declare local variables
				var database = backendServices;
				var registeredUserData = userData;

				//verify users credentials
				database.LoginRegisteredUser(vm.email, vm.password)
				.then(function(userCredentials) {
					//if no trouble logging in update error object
					//vm.errors.passesAllTests = true;
			
					//add primary information to local model
					//registeredUserData.setPrimariesLocally(userCredentials.email, userCredentials.name, userCredentials.uid);
					return userCredentials.uid
				})
				.then(function(uid) {

					database.getUserBio(uid)
					.then(function(userBio) {
						//update userData model with userBio
						registeredUserData.updateBioLocally(userBio);

						//load user events
						database.getUserEvents(uid)
						.then(function(allEventsForThisUser) {
							//update userData model with userEvents
							registeredUserData.updateAllUserEventsLocally(allEventsForThisUser);
						})
						.catch(function(message) { $log.info(message); })

					})
					.catch(function(message) { $log.info(message); })

					//redirect to the next page 
					registeredUserSherpa.redirectTo('/userInformation', uid);

				})
				.catch(function(message) { 
					//if there was an error logging in, let the user know
					//vm.errors.message = message;
					//vm.errors.passesAllTests = false;
				})

				//use uid to collect user bio
				
			}

		}

		//actions
		checkLoginStatus();

		//watchers
		$scope.$on('$routeChangeStart', function(next, current) {
			
			checkLoginStatus();
		})
	}

	return  directive;
		
};