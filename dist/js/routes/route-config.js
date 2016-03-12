angular
    .module('meetUpEventApp')
    .config(config);

function config($routeProvider) {   
    $routeProvider
    .when('/login', {
        templateUrl: 'views/Login.htm',
        controller: 'LoginsController',
        controllerAs: 'vm'
    })
    .when('/accountsettings/:uid', {
        templateUrl: 'views/AccountSettings.htm',
        controller: 'AccountSettingsController',
        controllerAs: 'vm'
    })
    .when('/user/', {
        templateUrl: 'views/UserEvents.htm',
        controller: 'UserEventsController',
        controllerAs: 'vm'
    })
    .when('/event/:eventid', {
        templateUrl: 'views/SelectedEvent.htm',
        controller: 'SelectedEventsController',
        controllerAs: 'vm'
    })
    .when('/usercontacts/:uid', {
        templateUrl: 'views/UserContacts.htm',
        controller: 'UsersContactsController',
        controllerAs: 'vm'
    })
    .when('/', {
        templateUrl: 'views/NewVisitorConverter.htm',
        controller: 'NewVisitorConversionsController',
        controllerAs: 'vm'
    })
    .otherwise('/', {
        templateUrl: 'views/NewVisitorConverter.htm',
        controller: 'NewVisitorConversionsController',
        controllerAs: 'vm'
    });
}
