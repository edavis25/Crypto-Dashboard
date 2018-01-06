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

app.factory('userProfile', function($resource) {
    return $resource('http://localhost:3000/profile/:user', { user: "@user"});
});

app.factory('marketTickers', function($resource) {
    return $resource('http://localhost:3000/tickers');
});
