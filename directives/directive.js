var app = angular.module('myApp', []);
app.directive('date', ['$log', '$interval',function($log, $interval) {
    return {
        scope: {},
        restrict: 'E',
        replace: true,
        template: '<h1>{{tsStr}}</h1>',
        link: function(scope, element, attr) {
            if (attr.refresh != "") {
                $interval(function() {
                    scope.tsStr = moment().format('YYYY-MM-DD HH:mm:ss');
                }, parseInt(attr.refresh)*1000);
            }
        }
    }
}]);
