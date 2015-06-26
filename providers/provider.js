var app = angular.module("providerApp", []);

// Value
app.value("appName", "itunes music search");

app.factory("musicService", ['$http', '$q', function($http, $q) {
    var baseUrl = "https://itunes.apple.com/search?term=";
    var suffixUrl = "&callback=JSON_CALLBACK"
    var _artist = '';

    var makeUrl = function() {
        return baseUrl + _artist + suffixUrl;
    };

    return {

        setArtist: function(artist) {
            _artist = artist;
        },

        query: function() {
            var defered = $q.defer();
            $http({
                method: 'JSONP',
                url: makeUrl(),
            }).success(function(data) {
                defered.resolve(data);
            }).error(function() {
                defered.reject("query music on itunes fail.");
            });
            return defered.promise;
        }
    };
}]);

app.controller("musicSearchController", ['$scope', 'appName', 'musicService', function($scope, appName, musicsService) {
    $scope.appName = appName;
    $scope.artist = '';
    $scope.musices = [];
    $scope.search = function() {
        musicsService.setArtist($scope.artist);
        musicsService.query().then(function(data) {
            $scope.musices = data.results;
        });
    }
}]);
