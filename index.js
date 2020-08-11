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

  var profit = sharesOwned * (marketValue - costPerShare);
  $(ele).children(".profit").html(profit);
  return profit;
};

$(document).ready(function () {
  $("tbody tr").each(function (i, ele) {
    var marketValue = updateMarketValue(ele);
    updateProfit(ele, marketValue);
  });
});
