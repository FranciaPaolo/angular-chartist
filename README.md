angular-chartist
=================

Simple Chartist directive for Angular.js.
Chartist is simple and lightweight javascript charting 
library https://gionkunz.github.io/chartist-js/

Installation
=================
````html
<!-- Chartist dependencies -->
<script src="angular-chartist/chartist.js"></script>
<link rel="stylesheet" href="angular-chartist/chartist.css">  

<!-- Angular directive -->
<script src="angular-chartist/chartistAngularDirective.js"></script>
````
Usage
=================
````js
var myApp = angular.module('myApp', ['chartistAngularDirective']);

````

In your html view:
````html
<div ng-chartist id='graph_id1' class="ct-chart" data='pie_data' type='Pie' animate='true' options='{"showLabel": true, "donut": true, "donutWidth": 20}'></div>
````

In your controller:
````js
angular.module('demo', [])
.controller('HomeController', function($scope) {   

	$scope.pie_data = {
        series: [ 2, 3, 4]
    };
});
````

Demo
=================
View demo page that shaw a simple donut chart with animation: 
<a href="https://rawgit.com/FranciaPaolo/angular-chartist/master/demo/index.html" target="_blank">demo</a>

