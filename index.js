var httpRequest = new XMLHttpRequest();

httpRequest.onload = function () {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      console.log(httpRequest.responseText);
      console.log("ticker: ", ticker, "ticker2: ", ticker2);
      var currentPrice = JSON.parse(httpRequest.responseText);
      $(".marketPrice").html(currentPrice.c);
    } else {
      console.log(httpRequest.statusText);
    }
  }
};

httpRequest.onerror = function () {
  console.log(httpRequest.statusText);
};

//need to make that URL pull for each one

//need to make custom URL to grab value for one and pull in custom URL

var ticker = "ESTC";

var ticker2 = $(".name").length;

httpRequest.open(
  "GET",
  "https://finnhub.io/api/v1/quote?symbol=" +
    ticker +
    "&token=bspk5a7rh5rehfh23jbg"
);
httpRequest.send();

var updateMarketValue = function (ele) {
  var sharesOwned = parseFloat($(ele).find(".shares input").val());
  var marketPrice = parseFloat($(ele).find(".marketPrice input").val());

  var marketValue = sharesOwned * marketPrice;
  $(ele).children(".marketValue").html(marketValue);

  return marketValue;
};

var updateProfit = function (ele, marketValue) {
  var sharesOwned = parseFloat($(ele).find(".shares input").val());
  var costPerShare = parseFloat($(ele).find(".cost input").val());
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

  var remove = $(document).on("click", ".btn.remove", function (event) {
    $(this).closest("tr").remove();
    updatePortfolioValueAndProfit();
  });

  var timeout;

  $(document).on("input", "tr input", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updatePortfolioValueAndProfit();
    }, 1000);
  });

  $("#addStock").on("submit", function (event) {
    event.preventDefault();
    var name = $(this).children("[name=name]").val();
    var shares = $(this).children("[name=shares]").val();
    var cost = $(this).children("[name=cost]").val();
    var marketPrice = $(this).children("[name=price]").val();
    console.log(name, shares, cost, marketPrice);

    $("tbody").append(
      "<tr>" +
        '<td class="name">' +
        name +
        "</td>" +
        '<td class="shares"><input type="number" value="' +
        shares +
        '" /></td>' +
        '<td class="cost"><input type="number" value="' +
        cost +
        '" /></td>' +
        '<td class="marketPrice"><input type="number" value="' +
        marketPrice +
        '" /></td>' +
        '<td class="marketValue"></td>' +
        '<td class="profit"></td>' +
        '<td><button class="btn btn-light btn-sm remove">Remove</button></td>' +
        "</tr>"
    );

    updatePortfolioValueAndProfit();

    $(this).children("[name=name]").val();
    $(this).children("[name=shares]").val();
    $(this).children("[name=cost]").val();
    $(this).children("[name=price]").val();
  });
});
