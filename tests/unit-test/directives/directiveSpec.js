describe("directive: paginator", function() {

    var $scope, element, lis;

    beforeEach(module('directiveApp'));
    //beforeEach(module('directives/paginator.tpl'));
    beforeEach(module('templates'));
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope;
        $scope.pageCount = 5;
        $scope.currentPage = 1;
        element = $compile('<paginator page-count="pageCount" current-page="currentPage"></paginator>')($scope);
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

    it("click page2, currentpage should be 2", function() {
        // TODO
        // var page2 = lis().eq(2).find('a').eq(0);
        // $scope.$digest();
        // page2.click();
        // expect($scope.currentPage).toBe(2);
    });

    it("change pageCount, paginator buttons count should be 8", function() {
        $scope.pageCount = 6;
        $scope.$digest();
        expect(lis().length).toBe(8);
    });


});
