angular.module('myApp', ['chartistAngularDirective']).
controller('appController', ['$scope','$timeout',function($scope, $timeout) {
	
	$scope.reloadChart=function(){
		$scope.pie_data = {
        	series: []
    	};

    	var i=0;
    	for(i=0;i<3;i++){
    		$scope.pie_data.series.push(Math.floor(Math.random() * 6) + 1);
    	}
	};

	$timeout(function(){
		
		$scope.reloadChart();

	},1000);
}]);