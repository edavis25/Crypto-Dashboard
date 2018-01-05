angular.module('crypto')
    .controller('DashboardController', ['$scope', '$routeParams', 'UserProfile', function($scope, $routeParams, UserProfile) {
        $scope.title = 'Dashboard';
        // Set profile using route param or default profile id
        var userId = $routeParams.id ? $routeParams.id : '5a4ea86bddde84c48863ae6d';
        $scope.user = UserProfile.get({ user: userId });
    }]);
