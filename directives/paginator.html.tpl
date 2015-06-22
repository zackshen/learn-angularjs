<nav>
    <ul class="pagination">
        <li ng-class="{disabled: noPrev()}">
            <a href="javascript:;" aria-label="Previous" ng-click="prevPage()">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li ng-repeat="page in pages" ng-class="{active: isCurrentPage(page)}">
            <a href="javascript:;" ng-click="gotoPage(page)" >{{page}}</a>
        </li>
        <li ng-class="{disabled: noNext()}">
            <a href="javascript:;" aria-label="Next" ng-click="nextPage()">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
    <div ng-transclude></div>
</nav>
