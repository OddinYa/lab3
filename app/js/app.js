angular.module('familyFinanceApp', ['ngRoute'])
    .config(function($routeProvider) {
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