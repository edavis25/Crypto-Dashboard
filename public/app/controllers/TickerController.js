angular.module('crypto')
    .controller('TickerController', ['$scope', '$interval', 'marketTickers', function($scope, $interval, marketTickers) {
        // Get tickers
        $scope.tickers = marketTickers.query();
        $interval(function() {
            $scope.tickers = marketTickers.query();
        }, 60000);

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
