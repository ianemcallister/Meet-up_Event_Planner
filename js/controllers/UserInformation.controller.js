angular
    .module('meetUpEventApp')
    .controller('UserInformationController', UserInformationController);

UserInformationController.$inject = ['$log'];

function UserInformationController($log) {
	$log.info('user information controller');
}