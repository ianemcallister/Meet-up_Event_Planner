angular
    .module('meetUpEventApp')
    .controller('LandingPageController', LandingPageController);

LandingPageController.$inject = ['trafficValet'];

/* @ngInject */
function LandingPageController(trafficValet) {
	var vm = this;
	var landingSherpa = trafficValet;

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