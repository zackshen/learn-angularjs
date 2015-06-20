<table class="table table-bordered">
    <thead>
        <tr>
            <th>#</th>
            <th ng-repeat="header in headers">{{header}}</th>
        </tr>
    </thead>
    <tr ng-repeat="rec in records">
        <td ng-repeat="(field, value) in rec">{{value}}</td>
    </tr>
    <tfoot ng-transclude></tfoot>
</table>
