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

app.factory('coinDetails', function($resource) {
    return $resource('http://localhost:3000/details/');
});

// NOTE: Currently unused when replaced by Websockets tickers
app.factory('marketTickers', function($resource) {
    return $resource('http://localhost:3000/tickers/');
});

// Wrapper for formatting the Cryptocompare API requests into object
app.factory('formatTicker', function() {
    function FormattedTicker(ticker) {
        this.baseUrl        = 'https://www.cryptocompare.com';
        this.fromSymbol     = ticker["FROMSYMBOL"];
        this.toSymbol       = ticker["TOSYMBOL"];
        this.price          = ticker["PRICE"];
        this.open           = ticker["OPENDAY"];
        this.low            = ticker["LOWDAY"];
        this.high           = ticker["HIGHDAY"];
        this.lastExchange   = ticker["LASTMARKET"];
        this.lastUpdate     = ticker["LASTUPDATE"];
        this.priceChange    = 'even';   // Default price change to even
    }

    return FormattedTicker;
});

app.factory('formatDetails', function() {

});

// Service for retrieving only the tickers subscribed by user
app.factory('userTickers', function($resource, formatTicker) {
    return {
        getUserTickers : function(user, allTickers) {
            // NOTE: REFACTORED TO REMOVE COINDETAILS INJECTION
            // userAndDetails is the promised array containing both the user
            // data and list of coin details
            //var user = userAndDetails[0];
            //var coinDetails = userAndDetails[1];

            // Parse the JSON + initialize the subscription array
            var allTickers = JSON.parse(allTickers);
            var subscribed = [];

            // Iterate the user profile's ticker subscriptions and add the matching
            // tickers to the local array
            for (var i = 0; i < user.tickers.length; i++) {
                // From currency to currency = BTC-USD (aka from Bitcoin to USD)
                let from = user.tickers[i].from;
                let to = user.tickers[i].to;

                //subscribed.push(new formatTicker(allTickers["RAW"][from][to], coinDetails["Data"][from]));
                subscribed.push(new formatTicker(allTickers["RAW"][from][to]));
            }

            return subscribed;
        }
    }
});

// This factory's code written by Brian Ford, many thanks!
// https://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/
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
