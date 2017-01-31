var gtmModule = angular.module('gtmModule', []);

function gtmController($scope, $http) {
    $scope.result = -1;

    $scope.insert = function() {
        $http.post('/insert')
            .success(function(data) {
                $scope.result = data;
                console.log(data);
            })
            .error(function(data) {
                $scope.result = data;
                console.log('Error: ' + data);
            });
    }

    $scope.show = function() {
        $http.get('/show')
            .success(function(data) {
                $scope.result = data;
                console.log(data);
            })
            .error(function(data) {
                $scope.result = data;
                console.log('Error: ' + data);
            });
    }

    $scope.clean = function() {
        $http.delete('/clean')
            .success(function(data) {
                $scope.result = data;
                console.log(data);
            })
            .error(function(data) {
                $scope.result = data;
                console.log('Error: ' + data);
            });
    }
}