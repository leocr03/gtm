var gtmModule = angular.module('gtmModule', []);

function gtmController($scope, $http) {
    $scope.result = -1;

    $scope.insert = function() {
        $http.post('/api/insert')
            .success(function(data) {
                $scope.result = data;
                console.log(data);
            })
            .error(function(data) {
                $scope.result = data;
                console.log('Error: ' + data);
            });
    };

    $scope.show = function() {
        $http.get('/api/show')
            .success(function(data) {
                $scope.result = data;
                console.log(data);
            })
            .error(function(data) {
                $scope.result = data;
                console.log('Error: ' + data);
            });
    };

    $scope.clean = function() {
        $http.delete('/api/clean')
            .success(function(data) {
                $scope.result = data;
                console.log(data);
            })
            .error(function(data) {
                $scope.result = data;
                console.log('Error: ' + data);
            });
    };

    $scope.count = function() {
        $http.get('/api/count')
            .success(function(data) {
                $scope.result = data;
                console.log(data);
            })
            .error(function(data) {
                $scope.result = data;
                console.log('Error: ' + data);
            });
    };
}