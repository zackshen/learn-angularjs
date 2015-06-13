angular.module("eventDemo", [])
.controller("ParentController", function($scope) {
    $scope.count = 0;
    $scope.$on('ChildEvent', function() {
        $scope.count += 1;
    })
    $scope.broadcastEvent = function() {
        $scope.$broadcast('ParentEvent');
    }
})
.controller("ChildController1", function($scope) {
    $scope.count = 0;
    $scope.$on('ParentEvent', function() {
        $scope.count += 1;
    })
    $scope.emitEvent = function() {
        $scope.$emit('ChildEvent');
    }
})
.controller("ChildController2", function($scope) {
    $scope.count = 0;
    $scope.$on('ParentEvent', function() {
        $scope.count += 1;
    })
    $scope.emitEvent = function() {
        $scope.$emit('ChildEvent');
    }
});
