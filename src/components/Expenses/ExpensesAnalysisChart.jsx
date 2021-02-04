//React import
import React, { useState, useEffect } from "react";
// React-chart-js-2 import
import { Bar } from "react-chartjs-2";

export function ExpensesAnalysis(props) {
  //  React hooks
  const [expenseData, setExpenseData] = useState([]);
  const [yearOfExpense, setYearOfExpense] = useState([]);
  const [selectedYear, setSelectedYear] = useState(`${new Date().getFullYear()}`); // Initial state of the current year
  const [yearlyTotal, setYearlyTotal] = useState();
  // Constants
  const yearArray = [];
  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];
  const colourForBar = ["rgba(46, 134, 193, 0.6)", "rgba(211, 84, 0, 0.6)"];

  // useEffect to re-render based on selectedYears state change
  useEffect(() => {
    fetchExpensesForChart();
  }, [selectedYear, props] );
  
  function fetchExpensesForChart() {
    setOptionSelect(props.expenses); // Sets option select
    setGraphData(props.expenses, selectedYear); // Sets graph data according to year
  }

  // setOptionSelect is to set the option select for expenses that 
  // are created in which year. This will populate option selections 
  // for years into an array that only has unique years so no overlapping happens
  function setOptionSelect(responseArray) {
    responseArray.forEach((response) => {
      yearArray.push(response.date.split("-")[0]);
    });
    setYearOfExpense([...new Set(yearArray)]);
  }

  // setGraphData is responsible for converting each expense into
  // viable data structure/format to be used in react-chartjs-2
  // Each expense is created in an array of length 12, mostly filled with 0
  // and within one of the index, is where the expense data is positioned.
  // Positioning is based on which month the expense is created, from 0-11
  // which represents january - dec.
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
            console.error("Wrong place")
        }
      }
    });
    formatGraphData(tempArray, tempData); // Formatted graph array and data passed
    setYearTotalExpense(tempArray)
  }

  // Set yearly total
  function setYearTotalExpense(array) {
    const total = array.map( arr => arr.reduce(
      ( accumulator, currentValue ) => accumulator + currentValue, 0
    )
    )
    const final = total.reduce( 
      ( accumulator, currentValue ) => accumulator + currentValue, 0
    )
    setYearlyTotal(final);
  }

  // formatGraphData is used to format and return the correct format and extra 
  // options that are needed to pass to react-chartjs-2, such as background colour 
  // and labels. Count is used to correspond with the array and data to populate each 
  // labels
  function formatGraphData(array, data) {
    const final = [];
    array.forEach((item, index) => {
      final.push({
        label: `${data[index].title}`,
        data: item,
        backgroundColor: `${"#" + (((1 << 24) * Math.random()) | 0).toString(16)}`,
      });
    });
    setExpenseData(final);
  }
  
  // react-chart-js data
  const barGraphData = {
    labels: labels,
    datasets: expenseData, // Data populated from backend
  };
  
  // react-chart-js options
  const barGraphOptions = {
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
      <div className="year-select-div">
        <label>Year: </label>
        <select value={selectedYear} onChange={yearSelectedChange}>
          {yearOfExpense.map((array, key) => {
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
        Total: ${yearlyTotal}
      </div>
    </>
  );
}
