angular.module('crypto')
    .controller('TickerController', ['$scope', '$interval', 'userTickers', 'socket', function($scope, $interval, userTickers, socket) {
        // Get tickers (resolve user promise before setting websocket event listener)
        $scope.user.$promise.then(function(user) {
            socket.on('refresh_tickers', function(tickers) {
                $scope.tickers = userTickers.getUserTickers(user, tickers);
                console.log($scope.tickers);
            });
        });

        $scope.$watch('tickers', function(newTickers, oldTickers, scope) {
            if (!oldTickers) {
                return;
            }
            // Iterate the new tickers array
            for (var i = 0; i < newTickers.length; i++) {
                // Then iterate the old tickers array
                for (var j = 0; j < oldTickers.length; j++) {
                    // Check if ticker pair matches
                    if (newTickers[i].fromSymbol == oldTickers[j].fromSymbol
                        && newTickers[i].toSymbol == oldTickers[j].toSymbol) {
                        // Set price change
                        if (newTickers[i].price < oldTickers[j].price) {
                            newTickers[i].priceChange = 'decrease';
                        }
                        else if (newTickers[i].price > oldTickers[j].price) {
                            newTickers[i].priceChange = 'increase';
                        }
                        // Ticker price change defaults to 'even'
                        break;
                    }
                }
            }
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
