describe("directive: paginator", function() {

    var $scope, element, lis;

    beforeEach(module('directiveApp'));
    beforeEach(module('templates'));
    beforeEach(inject(function($compile, $rootScope) {
        element = angular.element('<paginator page-count="pageCount" current-page="currentPage"></paginator>');
        $scope = $rootScope;
        $scope.pageCount = 5;
        $scope.currentPage = 1;
        $compile(element)($scope);
        $scope.$digest();
        lis = function() {
            return element.find('li');
        }
    }));

    it("paginator init, paginator buttons count should be 7", function() {
        expect(lis().length).toBe(7);
    });

    it("paginator init, previous page button is disabled", function() {
        expect(lis().eq(0).hasClass('disabled')).toBe(true);
    });

    it("paginator init, next page button is enabled", function() {
        expect(lis().eq(6).hasClass('disabled')).toBe(false);
    });


    it("paginator init, currentpage has class active", function() {
        expect(lis().eq(1).hasClass('active')).toBe(true);
    });

    it("click page4, currentpage should be 4", function() {
        var page4 = lis().eq(4).find('a').eq(0);
        page4.triggerHandler('click');
        expect($scope.currentPage).toBe(4);
    });

    it("click page5, nextPage should be disabled", function() {
        var page5 = lis().eq(5).find('a').eq(0);
        page5.triggerHandler('click');
        expect(lis().eq(6).hasClass('disabled')).toBe(true);
    });

    it("change pageCount, paginator buttons count should be 10", function() {
        $scope.pageCount = 8;
        $scope.$digest();
        expect(lis().length).toBe(10);
    });

});
