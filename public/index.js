
var app = angular.module("myApp", ['ngRoute', 'chart.js']);
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'dashboard.html',
			controller : 'dashboardCtrl'
		}).when('/dashboard', {
			templateUrl: 'dashboard.html',
			controller : 'dashboardCtrl'
		});
}]);

app.controller('colCtrl',['$scope','$http', function($scope, $http){
	$scope.cols = [];
	$scope.menuVisibility = true;
	$scope.menuClass = 'menu-expand';
	$scope.showMenu = function(){ 
		$scope.menuVisibility = !$scope.menuVisibility;
		if($scope.menuVisibility)
			$scope.menuClass = 'menu-expand';
		else
			$scope.menuClass = 'menu-collapse';
	};

	$http.get('json/cols.json').success(function(data){
		$scope.cols = data;
			//console.log($scope.cols);
	});
}]);
app.controller('dashboardCtrl',['$scope','$http',function($scope, $http){
	$scope.topTiles = [];
	$scope.sideTiles = [];
	$scope.title = "Dashboard";
	$scope.tooltip = "This is SPA dashboard.";
	$scope.currView = 'view_Sales.html';
	$scope.data = [[]];
	$scope.lables = [];


	$http.get('json/toptile.json').success(function(data){
		$scope.topTiles = data;
			
	});
	$http.get('json/sidetile.json').success(function(data){
		$scope.sideTiles = data;
	});

	$scope.tileClicked = function(type) {
		$scope.data[0] = [];
		$scope.labels = [];
		$scope.type = [];
		$scope.currView = 'view_' + type + '.html';
		$scope.currView2 = 'view_lineChart_' + type + '.html';

		var path = 'json/' + type + '.json';
		$http.get(path).success(function(response){
			for (var i = 0; i < response.length; i++) {
				$scope.data[0].push(response[i].number);
				$scope.labels.push(response[i].name);
			}
			$scope.type.push(type);
			localStorage.setItem('data', JSON.stringify($scope.data));
			localStorage.setItem('label', JSON.stringify($scope.labels));
			localStorage.setItem('type', JSON.stringify($scope.type));
		});
	}

	$scope.tileClicked('Sales');
}]);

/*app.controller('barCtrl',['$scope',function($scope){
	$scope.labels = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
	$scope.data = [[29.77, 0.00, 32.81, 196.46, 0.19, 98.08, 13.93, 5.14]];
}]);
app.controller('doughCtrl', ['$scope',function($scope){
	$scope.labels = ["Foo", "a", "b","c"];
	$scope.data = [70, 15, 10, 5];
}]);

app.controller('lineCtrl', function($scope) {
	$scope.labels = ["January", "February", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
	$scope.series = ['Series A', 'Series B'];
	$scope.data = [
		[65, 59, 80, 81, 56, 55, 40, 33, 22, 46, 78, 12],
		[28, 48, 40, 19, 86, 27, 90, 45, 13, 90, 67, 37]
	];
});*/