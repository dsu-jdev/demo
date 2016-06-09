function MockServer() {
}

MockServer.prototype.init = function(allData) {
	this.allData = allData;

	this.allData.forEach(function(dataItem) {
		// make price random between 0 and 200
		var price = Math.random() * 200;

		if (price < 10) {
			dataItem.fixedPoint = 4;
		} else if (price < 100) {
			dataItem.fixedPoint = 3;
		} else {
			dataItem.fixedPoint = 2;
		}

		dataItem.sell = (price * 1.01).toFixed(dataItem.fixedPoint);
		dataItem.buy = (price * 0.99).toFixed(dataItem.fixedPoint);
		dataItem.change = 0;
		dataItem.high = dataItem.buy;
		dataItem.low = dataItem.sell;
	});
};

MockServer.prototype.makeSomePriceChanges = function() {

	var n = floorRandom(this.allData.length / 2);

	if (n == 0) {
		return;
	}

	var rows = [];

	for (var i = 0; i < n; i++) {
		rows[i] = floorRandom(this.allData.length);
	}

	resetStyle();

	for (var i = 0; i < rows.length; i++) {
		var index = rows[i];

		var dataItem = this.allData[index];

		dataItem.sell = dataItem.sell / 1;
		dataItem.buy = dataItem.buy / 1;

		var change = Math.random() * (dataItem.sell * 0.01) - (dataItem.sell * 0.005);

		dataItem.change = parseFloat((change / dataItem.sell * 100).toFixed(2));

		dataItem.sell = (dataItem.sell + change * 1.01).toFixed(dataItem.fixedPoint);
		dataItem.buy = (dataItem.buy + change * 0.99).toFixed(dataItem.fixedPoint);

		if (change > 0) {
			changeStyle(index, "green", "&#9650;");
		} else if (change < 0) {
			changeStyle(index, "red", "&#9660;");
		}

		dataItem.high = (parseFloat(dataItem.high) > parseFloat(dataItem.buy)) ? dataItem.high : dataItem.buy;

		dataItem.low = (parseFloat(dataItem.low) < parseFloat(dataItem.sell)) ? dataItem.low : dataItem.sell;
	}
};

function floorRandom(n) {
	return Math.floor(Math.random() * n);
}

function resetStyle() {
	$("div[colid='sell'], div[colid='buy'], div[colid='symbol']").css({"font-weight": "normal", "color": "black"});
	$("div[colid='symbol']").html("");
}

function changeStyle(index, color, symbol) {
	$("div[row=" + index + "]").children("div[colid='sell'], div[colid='buy'], div[colid='symbol']").css({"font-weight": "bold", "color": color});
	$("div[row=" + index + "] > div[colid='symbol']").html(symbol);
}
