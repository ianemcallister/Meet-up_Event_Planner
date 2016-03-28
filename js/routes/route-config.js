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
    .when('/signup', {
        templateUrl: 'views/newUserSignup.htm',
        controller: 'NewUserSignUpController',
        controllerAs: 'vm'
    })
    .when('/login', {
        templateUrl: 'views/registeredUserLogin.htm',
        controller: 'RegUserLoginController',
        controllerAs: 'vm'
    })
    .when('/userInformation/:uid?', {
        templateUrl: 'views/userInformation.htm',
        controller: 'UserInformationController',
        controllerAs: 'vm',
        resolve: { /* @ngInject */
            userAuthenticationService: userAuthenticationService
        }
    })
    .when('/userEvents/:uid?', {
        templateUrl: 'views/userEvents.htm',
        controller: 'UserEventsController',
        controllerAs: 'vm',
        resolve: { /* @ngInject */
            userAuthenticationService: userAuthenticationService
        }
    })
    .when('/event/host/:eventId/:uid/:section', {
        templateUrl: 'views/hostEvent.htm',
        controller: 'HostEventController',
        controllerAs: 'vm',
        resolve: { /* @ngInject */
            userAuthenticationService: userAuthenticationService,
        }
    })
    .when('/event/guest/:eventId/:uid/:hostId', {
        templateUrl: 'views/guestEvent.htm',
        controller: 'GuestEventController',
        controllerAs: 'vm',
        resolve: { /* @ngInject */
            userAuthenticationService: userAuthenticationService,
        }
    })
    .when('/event/:eventId?/:hostId?/:uid?/:section?', {
        templateUrl: 'views/anEvent.htm',
        controller: 'AnEventController',
        controllerAs: 'vm',
        resolve: { /* @ngInject */
            userAuthenticationService: userAuthenticationService,
            eventViewChanger: eventViewChanger
        }
    })
    .otherwise({
        redirectTo: '/'
    });
}

function userAuthenticationService(authService) {
    authService.isLoggedIn();
};

function eventViewChanger(trafficValet, $route) {
    trafficValet.eventRoute($route.current.params.eventId, 
                            $route.current.params.hostId, 
                            $route.current.params.uid,
                            $route.current.params.section);
};