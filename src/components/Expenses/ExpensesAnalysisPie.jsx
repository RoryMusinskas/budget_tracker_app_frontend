//React import
import React, { useState, useEffect } from "react";
// React-chart-js-2 import
import { Pie } from "react-chartjs-2";

export function ExpensesAnalysisPie(props) {
  //  React hooks
  const [ expenseData, setExpenseData ] = useState([]);
  const [ yearOfExpense, setYearOfExpense ] = useState([]);
  const [ selectedYear, setSelectedYear ] = useState(`${new Date().getFullYear()}`); // Initial state of the current year

  // Constants
  const yearArray = [];

  // Use effect runs with changes to change in prop
  // and when a user selects which year to view
  useEffect(() => {
    fetchExpensesForPie();
  }, [selectedYear, props] );

  // Fetches from prop.expense to pass into functions
  function fetchExpensesForPie() {
    setOptionSelect(props.expenses); // Sets option select
    setGraphData(props.expenses, selectedYear); // Sets graph data according to year
  }

  // Setting up data structure for pie chart. 
  // Array length of 5, where each element represents 
  // 
  function setGraphData(responseData, year) {
    // Populates array length of 5 filled with 0s
    const tempArray = Array(5).fill(0)
    responseData.forEach((response) => {
      if(response.date.split('-')[0] === year){
        switch(response.category_id) {
          case 1:
            tempArray[0] += response.amount
            break;
          case 2:
            tempArray[1] += response.amount
            break;
          case 3:
            tempArray[2] += response.amount
            break;
          case 4:
            tempArray[3] += response.amount
            break;
          case 5:
            tempArray[4] += response.amount
            break;
          default:
            console.error("wrong place")
        }
      }
    })
    setExpenseData(tempArray)
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

  // Onchange function for dropdown select
  function yearSelectedChange(e) {
    setSelectedYear(e.target.value);
  }

  // react-chart-js data structure for pie chart
  const pieChartData = {
    labels: ["Grocery", "Travel", "Entertainment", "Necessity", "Others"],
    datasets:[{
      data: expenseData,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
    }] 
  }

  return(
    <>
      <div className="year-select-div">
        <label>Year: </label>
        <select value={selectedYear} onChange={yearSelectedChange}>
          {yearOfExpense.map((array, key) => {
            return (
              <option key={key} value={array}>
                {array}
              </option>
            );
          })}
        </select>
      </div>
      <Pie data={pieChartData}></Pie>
    </>
  );
}