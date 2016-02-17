angular
    .module('meetUpEventApp')
    .config(config);

function config($routeProvider) {
    $routeProvider
    .when('/login', {
        templateUrl: 'Login.html',
        controller: 'LoginsController',
        controllerAs: 'vm'
    })
    .when('/accountsettings/:uid', {
        templateUrl: 'AccountSettings.html',
        controller: 'AccountSettingsController',
        controllerAs: 'vm'
    })
    .when('/user/:uid', {
            templateUrl: 'UserEvents.html',
            controller: 'UserEventsController',
            controllerAs: 'vm'
        })
        .when('/event/:eventid', {
            templateUrl: 'SelectedEvent.html',
            controller: 'SelectedEventsController',
            controllerAs: 'vm'
        })
        .when('/usercontacts/:uid', {
            templateUrl: 'UserContacts.html',
            controller: 'UsersContactsController',
            controllerAs: 'vm'
        })
        .otherwise('/', {
            templateUrl: 'NewVisitorConverter.html',
            controller: 'NewVisitorConversionsController',
            controllerAs: 'vm'
        });
}
