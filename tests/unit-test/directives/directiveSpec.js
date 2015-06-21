describe("directive: paginator", function() {

    var $scope, element, lis;

    beforeEach(module('directiveApp'));
    beforeEach(module('/directives/paginator.tpl'));
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
        console.log(lis())
        expect(lis().length).toBe(7);
    });

});
