angular
    .module('meetUpEventApp')
    .controller('MainController', MainController);

MainController.$inject = ['$log', '$location', '$document'];

/* @ngInject */
function MainController($log, $location, $document) {
	var vm = this;
	var fbURL = 'https://meetupplanner.firebaseio.com/';
	var ref = new Firebase(fbURL); 

	vm.logout = function() {
		alert('logging you out!');
		ref.unauth();
		$location.path('/');
	};

	if ('addEventListener' in $document) {
	    $document.addEventListener('DOMContentLoaded', function() {
	    	$log.info('adding FastClick');
	        FastClick.attach($document.body);
	    }, false);
	}
}