angular
    .module('meetUpEventApp')
    .controller('MainController', MainController);

MainController.$inject = ['$location'];

function MainController($location) {
	var vm = this;
	var fbURL = 'https://meetupplanner.firebaseio.com/';
	var ref = new Firebase(fbURL); 

	vm.logout = function() {
		alert('logging you out!');
		ref.unauth();
		$location.path('/');
	};
}