describe('ScopesController', function(){

    beforeEach(module('eventDemo'));

    it('first init scope, count should be 0', inject(function($rootScope, $controller) {
        var scope = $rootScope.$new(),
        ctrl = $controller('ParentController', {$scope:scope});
        expect(scope.count).toBe(0);
    }));
});
