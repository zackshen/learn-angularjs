var app = angular.module('serviceDemo', []);

app.controller("coreServiceController", function($scope, $http, $log) {
    $scope.books = [];
    $http.get('/fixtures/books.json')
    .success(function(data, status, headers, config) {
        $scope.books = data;
        $log.info(status, config);
    });
});

