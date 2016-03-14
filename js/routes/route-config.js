angular
    .module('meetUpEventApp')
    .config(config);

function config($routeProvider) {   
    $routeProvider
    .when('/', {
        templateUrl: 'views/landingPage.htm',
        controller: 'LandingPageController',
        controllerAs: 'vm'
    })
    .when('/userInformation', {
        templateUrl: 'views/userInformation.htm',
        controller: 'UserInformationController',
        controllerAs: 'vm'
    })
    .when('/userInformation/:uid?/:token?', {
        templateUrl: 'views/userInformation.htm',
        controller: 'UserInformationController',
        controllerAs: 'vm'
    });
}