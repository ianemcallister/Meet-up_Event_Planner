angular
    .module('meetUpEventApp')
    .controller('LandingPageController', LandingPageController);

LandingPageController.$inject = ['$log'];

function LandingPageController($log) {
	var vm = this;

	//define local variables
	vm.showReuirnments = false;
	vm.passwordRequirnments = {
		0:{'constraint':'Is at least 16 characters long', 'style':{color:'red'}, 'met':false},
		1:{'constraint':'Is no longer than 100 characters', 'style':{color:'red'}, 'met':false},
		2:{'constraint':'Contains at least one required symbol (\!\@\#\$\%\^\&\*)', 'style':{color:'red'}, 'met':false},
		3:{'constraint':'Contains at least one number', 'style':{color:'red'}, 'met':false},
		4:{'constraint':'Contains at least one lowercase letter', 'style':{color:'red'}, 'met':false},
		5:{'constraint':'Contains at least one uppercase letter', 'style':{color:'red'}, 'met':false},
		6:{'constraint':"Doesn't have any illegal characters", 'style':{color:'red'}, 'met':false}
	};
	
	//define controller methods
	vm.displayPassReqs = function() {
		if(vm.newName && vm.newEmail) {
			vm.showReuirnments = true;
		} else {
			vm.showReuirnments = false;
		}
	}

	vm.checkNewPasswords = function(newUserPassword) {
		//for each password define the pattern that the password must match
		var constraints = {
	 		0: ['[\!\@\#\$\%\^\&\*]', " no required symbols found"],
	 		1: ['[0-9]', " no numbers found"],
	 		2: ['[a-z]', " no lowercase letters found"],
	 		3: ['[A-Z]', " no uppercase letters found"],
	 		4: ['[^A-z0-9\!\@\#\$\%\^\&\*]', " illegal characters found"]
 		};
 		//check for length
 		if(vm.newPassword) {
 			if(vm.newPassword.length > 15) vm.passwordRequirnments[0].style = {color:'green'};
 			if(vm.newPassword.length <= 100) vm.passwordRequirnments[1].style = {color:'green'};

 			for(i = 2; i < 6; i++) {
	 			//check for required symbols, uppercase, losercase, and characters
	 			var constraint = new RegExp(constraints[i][0], "");	

	 			if(constraint.test(vm.newPassword.value)) vm.passwordRequirnments[i].style = {color:'green'};
	 			}

 		}
 		
 	
	}

}