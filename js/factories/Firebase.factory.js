angular
    .module('meetUpEventApp')
    .factory('FirebaseFactory', FirebaseFactory);

FirebaseFactory.$inject = [$firebaseObject];

function FirebaseFactory() {
	var ref = new Firebase("https://meetupplanner.firebaseio.com");
	var model = this;

	// download the data into a local object
  	model.data = $firebaseObject(ref);	
}