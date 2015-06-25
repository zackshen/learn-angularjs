var app = angular.module("providerApp", []);

// Value
app.value("token", "abcdef1234567890");
app.value("idPrefix", "myId:");

// factory
app.factory("clientId", function() {
    return '11230456';
});
app.factory('tokenService', ['clientId', function(clientId) {
    var secret = window.localStorage.getItem('providerApp.secret')||"bbbccc";
    var apiToken = clientId + ':' + secret;
    return apiToken.toUpperCase();
}]);

// Service
app.factory('idGenerator', ['idPrefix', function(idPrefix) {
    var generator = function(prefix, initValue) {
        var _this = this;
        _this.val = initValue;
        this.next = function() {
            return prefix + (++_this.val);
        };
    }
    return new generator(idPrefix, 0);
}]);

app.controller('providerController', ['$scope', '$interval', 'token', 'tokenService', 'idGenerator', function($scope, $interval, tokenValue, tokenService, idGenerator) {
    $scope.tokenValue = tokenValue;
    $scope.tokenValue2 = tokenService;
    $scope.generator = 0;

    stop = $interval(function() {
        $scope.generator = idGenerator.next();
        var val = idGenerator.val;
        if (val > 10) {
            $interval.cancel(stop);
        }
    }, 1000);

}]);
