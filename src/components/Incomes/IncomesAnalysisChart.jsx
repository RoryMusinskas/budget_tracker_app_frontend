//React import
import React, { useState, useEffect } from "react";
// React-chart-js-2 import
import { Bar } from "react-chartjs-2";
// Material ui import
import Box from "@material-ui/core/Box";

export function IncomesAnalysis({ incomes }) {
  //  React hooks
  const [incomeData, setIncomeData] = useState([]);
  const [yearOfIncome, setYearOfIncome] = useState([]);
  const [selectedYear, setSelectedYear] = useState(
    `${new Date().getFullYear()}`
  ); // Initial state of the current year
  const [yearlyTotal, setYearlyTotal] = useState();
  // Constants
  const yearArray = [];
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const colourForBar = [
    "rgba(220, 20,	60, 0.4)",
    "rgba(255, 192, 203, 0.4)",
    "rgba(218, 112, 214, 0.4)",
    "rgba(75, 0, 130, 0.4)",
    "rgba(0, 0, 205, 0.4)",
    "rgba(152, 245, 255, 0.4)",
    "rgba(0, 255, 127, 0.4)",
    "rgba(255, 255,	0, 0.4)",
    "rgba(255, 165, 0, 0.4)",
    "rgba(255, 97, 3, 0.4)",
    "rgba(255, 0, 0, 0.4)",
  ];
  const colourForOutline = [
    "rgba(220, 20,	60, 1)",
    "rgba(255, 192, 203, 1)",
    "rgba(218, 112, 214, 1)",
    "rgba(75, 0, 130, 1)",
    "rgba(0, 0, 205, 1)",
    "rgba(152, 245, 255, 1)",
    "rgba(0, 255, 127, 1)",
    "rgba(255, 255,	0, 1)",
    "rgba(255, 165, 0, 1)",
    "rgba(255, 97, 3, 1)",
    "rgba(255, 0, 0, 1)",
  ];

  // useEffect to re-render based on selectedYears state change
  useEffect(() => {
    fetchIncomesForChart();
  }, [selectedYear, incomes]);

  function fetchIncomesForChart() {
    setOptionSelect(incomes); // Sets option select
    setGraphData(incomes, selectedYear); // Sets graph data according to year
  }

  // function to set sorted existing years to array
  function setOptionSelect(responseArray) {
    responseArray.forEach((response) => {
      yearArray.push(response.date.split("-")[0]);
    });
    setYearOfIncome([...new Set(yearArray)].sort());
  }

  // setGraphData sets the state for yearTotalIncome and is
  // responsible for setting up correct array format for react-chart-js
  function setGraphData(responseData, year) {
    const tempArray = [];
    const tempData = [];
    responseData.forEach((response) => {
      if (response.date.split("-")[0] === year) {
        // This is to push data that corresponds to the year selected. Later used for populating title.
        tempData.push(response);
        switch (response.date.split("-")[1]) {
          case "01":
            tempArray.push([response.amount, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            break;
          case "02":
            tempArray.push([0, response.amount, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            break;
          case "03":
            tempArray.push([0, 0, response.amount, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            break;
          case "04":
            tempArray.push([0, 0, 0, response.amount, 0, 0, 0, 0, 0, 0, 0, 0]);
            break;
          case "05":
            tempArray.push([0, 0, 0, 0, response.amount, 0, 0, 0, 0, 0, 0, 0]);
            break;
          case "06":
            tempArray.push([0, 0, 0, 0, 0, response.amount, 0, 0, 0, 0, 0, 0]);
            break;
          case "07":
            tempArray.push([0, 0, 0, 0, 0, 0, response.amount, 0, 0, 0, 0, 0]);
            break;
          case "08":
            tempArray.push([0, 0, 0, 0, 0, 0, 0, response.amount, 0, 0, 0, 0]);
            break;
          case "09":
            tempArray.push([0, 0, 0, 0, 0, 0, 0, 0, response.amount, 0, 0, 0]);
            break;
          case "10":
            tempArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, response.amount, 0, 0]);
            break;
          case "11":
            tempArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, response.amount, 0]);
            break;
          case "12":
            tempArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, response.amount]);
            break;
          default:
            console.error("Wrong place");
        }
      }
    });
    formatGraphData(tempArray, tempData); // Formatted graph array and data passed
    setYearTotalIncome(tempArray); // sets state for yearTotalIncome
  }

  // Set yearly total
  function setYearTotalIncome(array) {
    const total = array.map((arr) =>
      arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    );
    const final = total.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    setYearlyTotal(final);
  }

  // formatGraphData formats the passed array and data to be
  // set IncomeData state to be displayed in react-chart-js barchart
  function formatGraphData(array, data) {
    let colourCount = 0;
    const final = [];
    array.forEach((item, index) => {
      if (colourCount === 10) {
        colourCount = 0;
      }
      final.push({
        label: [`${data[index].title}`],
        data: item,
        backgroundColor: `${colourForBar[colourCount]}`,
        borderColor: `${colourForOutline[colourCount]}`,
        hoverBorderColor: "rgba(0,0,0,1)",
        hoverBackgroundColor: `${colourForOutline[colourCount]}`,
        borderWidth: 1,
        stack: 1,
      });
      colourCount++;
    });
    setIncomeData(final);
  }

  // react-chart-js data
  const barGraphData = {
    labels: labels,
    datasets: incomeData, // Data populated from backend
  };

  // react-chart-js options
  const barGraphOptions = {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true, // y-axis begins at 0
          },
          stacked: true,
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

  // Onchange function for dropdown select
  function yearSelectedChange(e) {
    setSelectedYear(e.target.value);
  }

  return (
    <>
      <div className="yearSelectDiv" style={{ marginBottom: "50px" }}>
        <label>Year: </label>
        <select value={selectedYear} onChange={yearSelectedChange}>
          {yearOfIncome.map((array, key) => {
            return (
              <option key={`${key} - ${array[key]}`} value={array}>
                {array}
              </option>
            );
          })}
        </select>
      </div>
      <Bar data={barGraphData} options={barGraphOptions} />
      <div>
        <Box component="div" display="inline">
          <h4>
            <strong>Total:</strong> ${yearlyTotal}{" "}
          </h4>
        </Box>
      </div>
    </>
  );
}
