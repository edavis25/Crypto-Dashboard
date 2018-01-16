angular.module('crypto')
    .controller('DashboardController', ['$scope', '$routeParams', '$interval', 'userProfile', 'coinDetails', function($scope, $routeParams, $interval, userProfile, coinDetails) {
        $scope.title = 'Dashboard';
        // Set profile using route param or default profile id
        var userId = $routeParams.id ? $routeParams.id : '5a5e43b1de472ebf572c1b9c';
        // This bad boy is a promise, make sure to handle it appropriately!
        $scope.user = userProfile.get({ user: userId });
        // This also returns a promise
        coinDetails.get().$promise.then(function(response) {
            $scope.coinDetails = response.Data;
            //console.log($scope.coinDetails);
        });
    }]);
