var app = angular.module('myApp', []);
// load template into cache
app.run(function($templateCache) {
    $templateCache.put("dropdown.tpl", "<select><option>10</option><<option>20</option></select>");
    $templateCache.put("unIsolate.tpl", "<div><input type='text' ng-model='something'/><span>{{something}}</span></div>")
});

// custom directives
// clock
// restrict: element
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

// load template from cache
app.directive('dropDownList', function() {
    return {
        templateUrl: "dropdown.tpl"
    }
});

// restrict: attribute
app.directive('colors', function() {
    return {
        restrict:'A',
        link: function(scope, element, attrs) {
            var c = 0;
            var colors = attrs.colors.split(',');
            element.bind('mouseover', function() {
                c+=1;
                element.css('color', colors[c%colors.length]);
            });
        }
    }
});

// restrict: class
app.directive('myClass', function() {
    return {
        restrict:'C',
        scope: {}, //这里使用独立scope，因为下面的directive的link方法里会给scope一个相同的属性info，会覆盖这个directive的info
        template: '<h1>{{info}}</h1>',
        link: function(scope, element, attrs) {
            scope.info = attrs.myClass;
        }
    }
});


// restrict: comment
app.directive('myComment', function() {
    return {
        restrict:'M',
        scope: {},
        replace:true,
        template: '<h3>{{info}}</h3>',
        link: function(scope, element, attrs) {
            scope.info = attrs.myComment;
        }
    }
});

// 没有采用独立scope的directive
app.directive('unIsolateScope', function() {
    return {
        restrict: 'AE',
        templateUrl: 'unIsolate.tpl'
    }
});
// 采用独立scope的directive
app.directive('isolateScope', function() {
    return {
        scope: {},
        restrict: 'AE',
        templateUrl: 'unIsolate.tpl'
    }
});
