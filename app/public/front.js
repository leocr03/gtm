var gtmModule = angular.module('gtmModule', ['ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav']);

gtmModule.controller("gtmController", function ($scope, $http, $q, $interval) {
    $scope.gridOptions = {};

    $scope.insert = function() {
        $http.post('/api/insert')
            .success(function(data) {
                $scope.show();
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.show = function() {
        $http.get('/api/show')
            .success(function(data) {
                $scope.gridOptions.data = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.clean = function() {
        $http.delete('/api/clean')
            .success(function(data) {
                $scope.show();
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.removeRow = function(id) {
        $http.delete('/api/clean/' + id)
            .success(function(data) {
                $scope.show();
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.count = function() {
        $http.get('/api/count')
            .success(function(data) {
                $scope.show();
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.gridOptions.columnDefs = [
        { name: '_id', enableCellEdit: false },
        { displayName: 'Name', name: 'name'},
        { displayName: 'Options', name: 'options', cellTemplate: '<button class="btn primary" ng-click="grid.appScope.deleteRow(row)">Remove</button>'}
    ];

    $scope.saveRow = function( rowEntity ) {
        var promise = $q.defer();
        $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise.promise );
        $interval( function() {
            promise.resolve();
        }, 3000, 1);
    };

    $scope.deleteRow = function(row) {
        var index = $scope.gridOptions.data.indexOf(row.entity);
        var id = row.entity._id;
        $scope.gridOptions.data.splice(index, 1);
        $scope.removeRow(id)
    };

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        $scope.gridApi = gridApi;
        gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    };

    $scope.show();
});