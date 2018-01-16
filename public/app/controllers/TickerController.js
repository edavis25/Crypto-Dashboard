angular.module('crypto')
    .controller('TickerController', ['$scope', '$interval', 'marketTickers', 'socket', function($scope, $interval, marketTickers, socket) {
        // Get tickers
        $scope.tickers = marketTickers.query();
        $interval(function() {
            $scope.tickers = marketTickers.query();
        }, 60000);


        socket.on('refresh_tickers', function(data) {
            var parsed = JSON.parse(data);
            console.log(parsed.RAW.ETH.USD.PRICE);
            $scope.sock = parsed;
        });
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
