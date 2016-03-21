angular
    .module('meetUpEventApp')
    .config(config);
/* @ngInject */
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
        controllerAs: 'vm',
        resolve: { /* @ngInject */
            userAuthenticationService: userAuthenticationService
        }
    })
    .when('/userEvents/:uid?/:token?', {
        templateUrl: 'views/userEvents.htm',
        controller: 'UserEventsController',
        controllerAs: 'vm',
        resolve: { /* @ngInject */
            userAuthenticationService: userAuthenticationService
        }
    })
    .when('/event/:eventId?/:hostId?/:uid?/:token?', {
        templateUrl: 'views/anEvent.htm',
        controller: 'AnEventController',
        controllerAs: 'vm',
        resolve: { /* @ngInject */
            userAuthenticationService: userAuthenticationService
        }
    })
    .otherwise({
        redirectTo: '/'
    });
}

function userAuthenticationService(authService) {
    authService.isLoggedIn();
}