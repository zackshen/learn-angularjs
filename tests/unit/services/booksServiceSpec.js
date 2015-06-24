describe('BooksService', function(){

    var $httpBackend, $scope, ctrl;

    beforeEach(function() {
        module('customServiceDemo');
        inject(function($rootScope, _$httpBackend_, _$controller_) {
            $scope = $rootScope.$new();
            $httpBackend =  _$httpBackend_;
            ctrl = _$controller_('customServiceController', {
                $scope: $scope
            });
            $httpBackend.whenGET('/fixtures/books.json')
            .respond([
                {'name':'book1', 'price': 10},
                {'name':'book2', 'price': 30},
                {'name':'book3', 'price': 50}
            ]);
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('list all books , count should be 3',function() {
        $scope.getAllBooks();
        $httpBackend.flush();
        expect($scope.books.length).toBe(3);
    });

    it('filter books , price is greater than 20 should be 2',function() {
        $scope.filterPrice = 20;
        $scope.filterBooks();
        $httpBackend.flush();
        expect($scope.books.length).toBe(2);
    });
});
