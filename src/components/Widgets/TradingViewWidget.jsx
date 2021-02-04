import React, { useEffect } from "react";

export default function TradingViewWidget(props) {
  useEffect(() => {
    // Search the DOM for the chart element, this is a script tag added in the body
    const script = document.getElementById("trading-view-chart");

    // set the array for the watchList
    const watchListArray = [];
    props.watchList.map((element) => {
      return watchListArray.push(element.symbol);
    });

    // Set the innerHTML for a new TradingView widget, these are the settings for the widget
    script.innerHTML = new window.TradingView.widget({
      height: "100%",
      width: "100%",
      symbol: "ETHAUD",
      interval: "60",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      watchlist: watchListArray,
      details: true,
      hotlist: true,
      calendar: true,
      container_id: "tradingview_widget",
    });
  }, [props.watchList]);

  return (
    <div id="trading-view-widget-container">
      <div id="tradingview_widget"></div>
    </div>
  );
}
