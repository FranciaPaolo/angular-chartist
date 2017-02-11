angular-chartist
=================

Simple Chartist directive for Angular.js

Installation
=================
````
<script src="angular-chartist/chartist.js"></script>
<link rel="stylesheet" href="angular-chartist/chartist.css">  

<script src="angular-chartist/chartistAngularDirective.js"></script>
````
Usage
=================
````
var myApp = angular.module('myApp', ['chartistAngularDirective']);

````

In your html view:
````
<div ng-chartist id='graph_id1' class="ct-chart" data='pie_data' type='Pie' animate='true' options='{"showLabel": true, "donut": true, "donutWidth": 20}'></div>
````

In your controller:
````
angular.module('demo', [])
.controller('HomeController', function($scope) {   

	$scope.pie_data = {
        series: [ 2, 3, 4]
    };
});
````
