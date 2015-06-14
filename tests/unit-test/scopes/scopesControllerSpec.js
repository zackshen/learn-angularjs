describe('ScopesController', function(){

    var parentScope,
        parentCtrl,
        childScope,
        childCtrl;

    beforeEach(function() {
        module('eventDemo');

        inject(function($rootScope, $controller) {
            parentScope = $rootScope.$new();
            parentCtrl = $controller("ParentController", {$scope: parentScope});

            childScope = parentScope.$new();
            childCtrl = $controller("ChildController1", {$scope: childScope});
        });
    });

    it('first init scope, count should be 0',function() {
        expect(parentScope.count).toBe(0);
        expect(childScope.count).toBe(0);
    });


    it('emit event, parent should received , count should be 1', function() {
        childScope.emitEvent('ChildEvent');
        expect(parentScope.count).toBe(1)
        expect(childScope.count).toBe(0);
        for (var i=0; i < 10; i++) {
            childScope.emitEvent('ChildEvent');
        }
        expect(parentScope.count).toBe(11);
    });
});
