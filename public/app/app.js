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

// Service for user profile resource
app.factory('userProfile', function($resource) {
    return $resource('http://localhost:3000/profile/:user', { user: "@user" });
});

// NOTE: Currently unused when replaced by Websockets tickers
app.factory('marketTickers', function($resource) {
    return $resource('http://localhost:3000/tickers/');
});

// Service for retrieving only the tickers subscribed by user
app.factory('userTickers', function($resource) {
    return {
        getUserTickers : function(user, allTickers) {
            // Parse the JSON + initialize the subscription array
            var allTickers = JSON.parse(allTickers);
            var subscribed = [];

            // Iterate the user profile's ticker subscriptions and add the matching
            // tickers to the local array
            for (var i = 0; i < user.tickers.length; i++) {
                // From currency to currency = BTC-USD (aka from Bitcoin to USD)
                let from = user.tickers[i].from;
                let to = user.tickers[i].to;
                subscribed.push(allTickers["RAW"][from][to]);
            }
            
            return subscribed;
        }
    }
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
