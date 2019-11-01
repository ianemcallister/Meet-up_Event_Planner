meetUpEventApp.controller('MainController', MainController);

MainController.$inject = ['$log', '$location', '$document', '$window'];

/* @ngInject */
function MainController($log, $location, $document, $window) {
	var vm = this;
	var fbURL = 'https://meetupplanner.firebaseio.com/';
	var ref = new Firebase(fbURL); 

	function resizeBGImage() {
		var body = angular.element($document);
		$document.css('hight', $window.outerHeight)
	}

	vm.logout = function() {
		alert('logging you out!');
		ref.unauth();
		$location.path('/');
	};

	angular.element($document).ready(function() {
		//FastClick.attach($document.body);
		resizeBGImage();
	})
}