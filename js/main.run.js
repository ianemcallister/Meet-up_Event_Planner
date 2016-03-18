angular
	.module('meetUpEventApp')
	.run(runBlock);

runBlock.$inject = ['$document'];

function runBlock($document) {
	angular.element($document).ready(function() {
		//FastClick.attach($document.body);
	});
	
}