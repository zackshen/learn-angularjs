angular.module('common.services', [])
.service('Books', function($http, $q) {
    return {
        'list': function() {
            var deferred = $q.defer();
            $http.get('/fixtures/books.json')
            .success(function(data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        },
        'query': function(price) {
            var deferred = $q.defer();
            $http.get('/fixtures/books.json')
            .success(function(books) {
                var filterBooks = [];
                for (var i=0; i < books.length; i++) {
                    var book = books[i];
                    if (book.price > price) {
                        filterBooks.push(book);
                    }
                }
                deferred.resolve(filterBooks);
            });
            return deferred.promise;
        }
    }
});

angular.module('customServiceDemo', ['common.services'])
.controller("customServiceController", function($scope, Books, $log) {
    $scope.books = [];
    $scope.filterPrice = 0;
    $scope.filterBooks = function() {
        Books.query($scope.filterPrice).then(function(books) {
            $scope.books = books;
        });
    };
    $scope.getAllBooks = function() {
        Books.list().then(function(books) {
            $scope.books = books;
            $log.info(books);
        });
    };

    Books.list().then(function(books) {
        $scope.books = books;
        $log.info(books);
    });
});
