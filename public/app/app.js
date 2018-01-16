var app = angular.module('crypto', ['ngRoute', 'ngResource']);
//var socket = io();

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
    return $resource('http://localhost:3000/profile/:user', { user: "@user" });
});

app.factory('marketTickers', function($resource) {
    return $resource('http://localhost:3000/tickers/');
});

// This factory's code written by Brian Ford, many thanks!
// https://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/#disqus_thread
app.factory('socket', function($rootScope) {
    var socket = io();
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        }
    }
});
