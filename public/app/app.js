var app = angular.module('crypto', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'app/views/dashboard.html',
            controller  : 'DashboardController',
        })
        .when('/:id', {
            templateUrl : 'app/views/dashboard.html',
            controller  : 'DashboardController',
        })
        .otherwise({ redirectTo: '/' });
}]);

app.factory('UserProfile', function($resource) {
    return $resource('http://localhost:3000/profile/:user', { user: "@user"});
});
