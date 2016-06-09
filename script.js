agGrid.initialiseAgGridWithAngular1(angular);

var app = angular.module("app", ["agGrid"]);

app.controller("ctrl", function($scope, $http, $interval) {

	var columnDefs = [
		{headerName: "Currency", field: "currency", width: 80,
			cellStyle: {color: "#29467c", "font-weight": "bold"}},
		{headerName: "Sell", field: "sell", width: 80,
			cellStyle: {padding: "5px"},
			cellRenderer: box
		},
		{headerName: "Buy", field: "buy", width: 80,
			cellStyle: {padding: "5px"},
			cellRenderer: box
		},
		{headerName: "", field: "symbol", width: 30},
		{headerName: "Change", field: "change", width: 80,
			cellRenderer: function(params) {
				return "{{data.change}}%";
			}
		},
		{headerName: "High", field: "high", width: 80,
			cellRenderer: function(params) {
				return "{{data.high}}";
			}
		},
		{headerName: "Low", field: "low", width: 80,
			cellRenderer: function(params) {
				return "{{data.low}}";
			}
		}
	];

	$scope.gridOptions = {
		columnDefs: columnDefs,
		angularCompileRows: true
	};

	$scope.gridOptions.headerHeight = 35;
	$scope.gridOptions.rowHeight = 35;

	function box(params) {
		return '<span class="box">{{data.' + params.colDef.field + '}}</span>';
	}

	$http.get("data.json").then(function(response) {
		var mockServer = new MockServer();
		mockServer.init(response.data);

		$scope.gridOptions.api.setRowData(response.data);

		$interval(function () {
			mockServer.makeSomePriceChanges();
		}, 3000);
	});
});
