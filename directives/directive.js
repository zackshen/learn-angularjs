var app = angular.module('directiveApp', []);
// load template into cache
app.run(function($templateCache) {
    $templateCache.put("dropdown.tpl", "<select><option>10</option><<option>20</option></select>");
    $templateCache.put("unIsolate.tpl", "<div><input type='text' ng-model='something'/><span>{{something}}</span></div>")
});

// controller
app.controller("directiveController", function($scope, $log) {
    $scope.selectPage = function(page) {
        //alert("选中了第"+page+"页");
        $log.debug("选中了第"+page+"页");
    };
    $scope.users = [
        {'seq': 1,'firstName': 'Mark', 'lastName': 'Otto', 'userName': '@mdo'},
        {'seq': 2,'firstName': 'Jacob', 'lastName': 'Thornton', 'userName': '@fat'},
        {'seq': 3,'firstName': 'Larry', 'lastName': 'the Bird', 'userName': '@twitter'},
        {'seq': 4,'firstName': 'Zack', 'lastName': 'Shen', 'userName': '@zack'},
        {'seq': 5,'firstName': 'Wenddy', 'lastName': 'Wang', 'userName': '@wenddy'},
        {'seq': 6,'firstName': 'Felix', 'lastName': 'Zhu', 'userName': '@felix'},
        {'seq': 7,'firstName': 'Timmy', 'lastName': 'Yuan', 'userName': '@timmy'},
        {'seq': 8,'firstName': 'Brain', 'lastName': 'Zhang', 'userName': '@brain'},
        {'seq': 9,'firstName': 'Tony', 'lastName': 'Li', 'userName': '@tony'},
        {'seq': 10,'firstName': 'Jasper', 'lastName': 'Li', 'userName': '@jasper'},
        {'seq': 11,'firstName': 'Shirly', 'lastName': 'Hu', 'userName': '@shirly'},
        {'seq': 12,'firstName': 'Eva', 'lastName': 'Jiang', 'userName': '@eva'},
        {'seq': 13,'firstName': 'Jeff', 'lastName': 'Xu', 'userName': '@jeff'},
        {'seq': 14,'firstName': 'Mike', 'lastName': 'Zhao', 'userName': '@mike'},
        {'seq': 15,'firstName': 'Jacob', 'lastName': 'Du', 'userName': '@jacob'},
        {'seq': 16,'firstName': 'William', 'lastName': 'Cai', 'userName': '@william'},
        {'seq': 17,'firstName': 'Vincent', 'lastName': 'Ye', 'userName': '@vicent'},
        {'seq': 18,'firstName': 'Max', 'lastName': 'Zhou', 'userName': '@max'},
    ];
    $scope.pageInfo = {
        currentPage : 1,
        pageCount : 10
    };
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
        templateUrl: "./huge.html.tpl"
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
        restrict: 'AE',
        require: '?^datagrid',
        scope: {
            pageCount: '=', // 和外层的controller中得scope属性进行双向绑定
            currentPage: '=',
            pageSize: '=',
            selectPage: '&onSelectPage' //回调方法，和外层通信
        },
        transclude: true,
        templateUrl: 'directives/paginator.html.tpl',//模板使用的是bootstrap的nav, 修改成angular语法的tpl
        link: function(scope, element, attrs, controller) {
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
                if (controller) {
                    controller.refresh(scope.currentPage, scope.pageSize);
                }
            }
            scope.isCurrentPage = function(page) {
                return scope.currentPage == page;
            }
        }
    }
});

// combine directives
// directive: datagrid
app.directive('datagrid', function() {
    var _this = {};
    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: 'directives/table.html.tpl',
        scope: {
            records: '=datasource',
            headers: '='
        },
        link: function(scope, element, attrs) {
            _this.records = scope.records;
        },
        controller: function($scope) {
            this.refresh = function(currentPage, pageSize) {
                var newRecords = _this.records.slice().splice((currentPage-1)*pageSize, pageSize);
                $scope.records = newRecords;
            }
        }
    };
});
