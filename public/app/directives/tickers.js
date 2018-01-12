angular.module('crypto')
    .directive('tickers', function() {
        return {
            restrict    : 'E',
            templateUrl : 'app/views/tickers.html'
        };
    });
