var app = angular.module("providerApp", []);

app.filter('divideRow', function() {
    return function(input, elementCount) {
        var splittedInput = [];
        var tmp = [];
        input = input || [];
        for(var i=1; i <= input.length; i++) {
            tmp.push(input[i-1]);
            if (i % elementCount == 0) {
                splittedInput.push(tmp);
                tmp = [];
            }
        }
        return splittedInput;
    };
})

// Value
app.value("appName", "itunes music search");


/*
*
* Service的写法最简单，直接返回一个构造函数就行了
*
*/
app.service("musicService", function($http, $q) {
    var baseUrl = "https://itunes.apple.com/search?term=";
    var suffixUrl = "&callback=JSON_CALLBACK"
    var _artist = '';

    var makeUrl = function() {
        return baseUrl + _artist + suffixUrl;
    };

    this.setArtist = function(artist) {
        _artist = artist;
    },
    this.query = function() {
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
});

/*
*
* Factory比service稍复杂点，返回的是一个实例化的对象
*
*/
app.factory("musicService2", ['$http', '$q', function($http, $q) {
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


/*
*
* Provider的写法最复杂，但是可定制性比较强，可以在app配置阶段设置一些参数
* 这里没有举例子
*
*/
app.provider("musicService3", function() {
    var baseUrl = "https://itunes.apple.com/search?term=";
    var suffixUrl = "&callback=JSON_CALLBACK"
    var _artist = '';

    var makeUrl = function() {
        return baseUrl + _artist + suffixUrl;
    };

    return {
        $get: ['$http','$q',function($http, $q) {
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
            }
        }]
    }
});


// 这里可以尝试更换musicService3, 最终效果一致
app.controller("musicSearchController", ['$scope', 'appName', 'musicService3', function($scope, appName, musicService) {
    $scope.appName = appName;
    $scope.artist = 'initialD';
    $scope.search = function() {
        musicService.setArtist($scope.artist);
        musicService.query().then(function(data) {
            $scope.musices = data.results;
        });
    }
}]);
