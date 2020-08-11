var updateMarketValue = function (ele) {
  var sharesOwned = parseFloat($(ele).children(".shares").text());
  var marketPrice = parseFloat($(ele).children(".marketPrice").text());

  var marketValue = sharesOwned * marketPrice;
  $(ele).children(".marketValue").html(marketValue);

  return marketValue;
};

var updateProfit = function (ele, marketValue) {
  var sharesOwned = parseFloat($(ele).children(".shares").text());
  var costPerShare = parseFloat($(ele).children(".cost").text());
  var costofPurchase = sharesOwned * costPerShare;

  var profit = marketValue - costofPurchase;
  $(ele).children(".profit").html(profit);
  return profit;
};

var sum = function (acc, x) {
  return acc + x;
};

var updatePortfolioValueAndProfit = function () {
  var stocksMarketValue = [];
  var stocksProfits = [];

  $("tbody tr").each(function (i, ele) {
    var marketValue = updateMarketValue(ele);
    stocksMarketValue.push(marketValue);
    var profit = updateProfit(ele, marketValue);
    stocksProfits.push(profit);
  });

  var portfolioMarketValue = stocksMarketValue.reduce(sum);
  var portfolioProfits = stocksProfits.reduce(sum);
  $("#portfolioValue").html(portfolioMarketValue);
  $("#portfolioProfit").html(portfolioProfits);
};

$(document).ready(function () {
  updatePortfolioValueAndProfit();
});
