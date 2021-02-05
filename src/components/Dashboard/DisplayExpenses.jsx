/* -------- Import React core ------------ */
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
var Chartist = require("chartist");

export default function DisplayExpenses(props) {
  const { getAccessTokenSilently } = useAuth0();
  const [titles, setTitles] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const { classes } = props;

  // variables used to create animation on charts

  var delays = 80,
    durations = 500;

  const expensesChart = {
    data: {
      labels: [...titles],
      series: [[...amounts]],
    },
    options: {
      axisY: {
        onlyInteger: true,
      },
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: Math.max(...amounts) + 50,
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    // for animations when the graph is loaded
    animation: {
      draw: function (data) {
        if (data.type === "line" || data.type === "area") {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint,
            },
          });
        } else if (data.type === "point") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: "ease",
            },
          });
        }
      },
    },
  };

  const fetchExpenses = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${process.env.REACT_APP_RAILS_API_URL}/expenses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();

      // set empty arrays for the values to be pushed into
      let tempTitles = [];
      let tempAmounts = [];

      // map through the expenses and push in the title
      responseData.map((expense) => {
        return tempTitles.push(expense.title);
      });
      setTitles(tempTitles);

      // map through the expenses and push in the amount
      responseData.map((expense) => {
        return tempAmounts.push(expense.amount);
      });
      setAmounts(tempAmounts);
    } catch (e) {
      console.error("Error: ", e.message);
    }
  };

  // on compenent load, fetch the expenses
  useEffect(() => {
    fetchExpenses();
  }, []);

  // return the chartist graph with the expenses shown
  return (
    <>
      <ChartistGraph
        className={("ct-chart", classes.expensesChart)}
        data={expensesChart.data}
        type="Line"
        options={expensesChart.options}
        listener={expensesChart.animation}
      />
    </>
  );
}
