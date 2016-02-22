angular
    .module('meetUpEventApp')
    .run(runBlock);

runBlock.$inject = ['$location', 'Auth', 'userData'];

function runBlock($location, Auth, userData) {

	if(!Auth.isLoggedIn()) {
		//alert('Denied');
		$location.path('/');
	} else {
		//alert('congrats!');
		$location.path('/user');
	}

	userData.initialize('0841e1bc-91b8-4033-a868-5a9a85a08380');
}