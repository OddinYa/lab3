angular.module('familyFinanceApp', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix(''); 
        
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainController'
            })
            .when('/users', {
                templateUrl: 'views/users.html',
                controller: 'UserController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
