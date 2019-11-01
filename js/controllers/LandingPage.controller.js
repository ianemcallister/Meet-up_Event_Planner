meetUpEventApp.controller('LandingPageController', LandingPageController);

LandingPageController.$inject = ['trafficValet'];

/* @ngInject */
function LandingPageController(trafficValet) {
	//	DEFINE LOCAL VARIABLES
	var vm = this;
	var landingSherpa = trafficValet;

	//	NOTIFY PROGRESS
	console.log('in the landing page');
	
	//local methods
	//vm methods
	vm.createAnAccount = function() {
		landingSherpa.redirectTo('/signup');
	}

	vm.loginUser = function() {
		landingSherpa.redirectTo('/login');
	}

	//watchers
	//action
}