angular
    .module('meetUpEventApp')
    .controller('UserInformationController', UserInformationController);

UserInformationController.$inject = ['$log'];

function UserInformationController($log) {
	var vm = this;

	//local variables
	vm.proceedBtn = 'btn btn-primary';
	vm.dataToSave = false;
	vm.btnMssg = 'Move On...';

	vm.checkValues = function() {
		if( !(angular.isUndefined(vm.employerName) || vm.employerName === '') || 
			!(angular.isUndefined(vm.jobTitle) || vm.jobTitle === '') || 
			!(angular.isUndefined(vm.birthday) || vm.birthday === '')) 
		{
			vm.dataToSave = true;
			vm.proceedBtn = 'btn btn-success';
			vm.btnMssg = 'Save & Continue';
		} else {
			vm.dataToSave = false;
			vm.proceedBtn = 'btn btn-primary';
			vm.btnMssg = 'Move On...';	
		}

	}

}