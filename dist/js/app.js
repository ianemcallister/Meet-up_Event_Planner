angular.module('meetUpEventApp', [
	'ngRoute',
	'ngResource',
	'firebase'
])

.config(function($logProvider){
	$logProvider.debugEnabled(true);
});
