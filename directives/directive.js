var app = angular.module('myApp', []);
// custom directives
// clock
app.directive('clock', ['$log', '$interval',function($log, $interval) {
    return {
        scope: {},
        restrict: 'E',
        replace: true,
        template: '<h1>{{tsStr}}</h1>',
        link: function(scope, element, attr) {
            if (attr.refresh != "") {
                scope.tsStr = moment().format('YYYY-MM-DD HH:mm:ss');
                $interval(function() {
                    scope.tsStr = moment().format('YYYY-MM-DD HH:mm:ss');
                }, parseInt(attr.refresh)*1000);
            }
        }
    }
}]);

// laad template from server
app.directive('complexHugeDirective', function() {
    return {
        templateUrl: "./huge.tpl"
    }
});
