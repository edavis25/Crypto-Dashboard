angular.module('crypto')
    .controller('NavigationController', ['$scope', '$routeParams', 'userProfile', function($scope, $routeParams, userProfile) {
        // ng-class flags for triggering the sidenav
        $scope.sidenavOpen = false;
        $scope.closeIcon = false;

        $scope.toggleSidenav = function() {
            if ($scope.sidenavOpen) {
                $scope.sidenavOpen = false;
                $scope.closeIcon = false;
            }
            else {
                $scope.sidenavOpen = true;
                $scope.closeIcon = true;
            }
        }
    }]);
