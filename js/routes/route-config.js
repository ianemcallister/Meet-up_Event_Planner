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
    .when('/userInformation/:uid?/:token?', {
        templateUrl: 'views/userInformation.htm',
        controller: 'UserInformationController',
        controllerAs: 'vm'
    })
    .when('/userEvents/:uid?/:token?', {
        templateUrl: 'views/userEvents.htm',
        controller: 'UserEventsController',
        controllerAs: 'vm'
    })
    .when('/event/:eventId?/:uid?/:token?', {
        templateUrl: 'views/anEvent.htm',
        controller: 'AnEventController',
        controllerAs: 'vm'
    });
}