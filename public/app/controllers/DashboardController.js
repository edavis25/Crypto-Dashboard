angular.module('crypto')
    .controller('DashboardController', ['$scope', '$routeParams', '$interval', 'userProfile', 'marketTickers', function($scope, $routeParams, $interval, userProfile, marketTickers) {
        $scope.title = 'Dashboard';
        // Set profile using route param or default profile id
        var userId = $routeParams.id ? $routeParams.id : '5a4ea86bddde84c48863ae6d';
        $scope.user = userProfile.get({ user: userId });

    }]);
