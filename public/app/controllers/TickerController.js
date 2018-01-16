angular.module('crypto')
    .controller('TickerController', ['$scope', '$interval', 'userTickers', 'socket', function($scope, $interval, userTickers, socket) {
        // Get tickers (resolve user promise before setting websocket event listener)
        $scope.user.$promise.then(function(user) {
            socket.on('refresh_tickers', function(tickers) {
                $scope.tickers = userTickers.getUserTickers(user, tickers);
                console.log($scope.tickers);
            });
        });
        
        /* REFACTORED TO REMOVE THE COIN DETAILS INJECTION
        Promise.all([$scope.user.$promise, $scope.coinDetails.$promise])
               .then(function(userAndDetails) {
                   socket.on('refresh_tickers', function(tickers) {
                       $scope.tickers = userTickers.getUserTickers(userAndDetails, tickers);
                       //console.log($scope.tickers);
                   });
               });
        */


        /* NOTE: Refactored to use websockets
        $scope.tickers = marketTickers.query();
        $interval(function() {
            $scope.tickers = marketTickers.query();
        }, 60000);


        socket.on('refresh_tickers', function(data) {
            var parsed = JSON.parse(data);
            console.log(parsed.RAW.ETH.USD.PRICE);
            $scope.sock = parsed;
        });
        */

        // Function for applying classes for positive/negative percent changes
        $scope.getPercentChangeClass = function(percentChange) {
            if (percentChange > 0) {
                return 'positive';
            }
            else if (percentChange < 0) {
                return 'negative';
            }
        }
    }]);
