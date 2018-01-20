angular.module('crypto')
    .controller('DashboardController', ['$scope', '$routeParams', '$interval', 'userProfile', 'coinDetails', function($scope, $routeParams, $interval, userProfile, coinDetails) {
        $scope.title = 'Dashboard';
        // Set profile using route param or default profile id
        var userId = $routeParams.id ? $routeParams.id : '5a63b1d817f93fded1266320';
        // This bad boy is a promise, make sure to handle it appropriately!
        $scope.user = userProfile.get({ user: userId });
        // This also returns a promise
        coinDetails.get().$promise.then(function(response) {
            $scope.coinDetails = response.Data;
            //console.log($scope.coinDetails);
        });
    }]);
