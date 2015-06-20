var app = angular.module('myApp', []);
// load template into cache
app.run(function($templateCache) {
    $templateCache.put("dropdown.tpl", "<select><option>10</option><<option>20</option></select>");
    $templateCache.put("unIsolate.tpl", "<div><input type='text' ng-model='something'/><span>{{something}}</span></div>")
});

// controller
app.controller("directiveController", function($scope) {
    $scope.pageInfo = {
        currentPage : 1,
        pageCount : 10
    };
    $scope.selectPage = function(page) {
        alert("选中了第"+page+"页");
    }
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

//分页器实现

app.directive('paginator', function() {

    return {
        restrict: 'E',
        scope: {
            pageCount: '=', // 和外层的controller中得scope属性进行双向绑定
            currentPage: '=',
            selectPage: '&onSelectPage'
        },
        replace: true,
        templateUrl: './paginator.tpl',//模板使用的是bootstrap的nav, 修改成angular语法的tpl
        link: function(scope, element, attrs) {
            scope.$watch("pageCount", function(pageCount) {
                scope.pages = []
                for (var i=0; i < scope.pageCount; i++) {
                    scope.pages.push(i+1);
                }
                scope.gotoPage(scope.currentPage);
            });
            scope.noPrev = function() {
                return scope.currentPage <= 1;
            }
            scope.noNext = function() {
                return scope.currentPage >= scope.pageCount;
            }
            scope.prevPage = function() {
                scope.gotoPage(scope.currentPage-1);
            }
            scope.nextPage = function() {
                scope.gotoPage(scope.currentPage+1);
            }
            scope.gotoPage = function(page) {
                if (page <= 1) {
                    scope.currentPage = 1;
                } else if (page >= scope.pageCount) {
                    scope.currentPage = scope.pageCount;
                } else {
                    scope.currentPage = page;
                }
                //这里传递的参数结构比较特殊
                scope.selectPage({'page':scope.currentPage});
            }
            scope.isCurrentPage = function(page) {
                return scope.currentPage == page;
            }
        }
    }

});

