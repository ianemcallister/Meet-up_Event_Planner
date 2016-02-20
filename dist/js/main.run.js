angular
    .module('meetUpEventApp')
    .run(runBlock);

runBlock.$inject = ['Auth', '$location'];

function runBlock(Auth, $location) {

	if(!Auth.isLoggedIn()) {
		//alert('Denied');
		$location.path('/');
	} else {
		//alert('congrats!');
		$location.path('/user');
	}
}