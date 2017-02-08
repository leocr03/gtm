var gtmModule = angular.module('gtmModule', []);

function gtmController($scope, $http) {
    $scope.result = -1;

    $scope.insert = function() {
        $http.post('http://localhost:8000/insert')
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
        $http.get('http://localhost:8000/show')
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
        $http.delete('http://localhost:8000/clean')
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
        $http.get('http://localhost:8000/count')
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