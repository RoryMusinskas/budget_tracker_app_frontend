import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useAuth0 } from "@auth0/auth0-react";

export function ExpensesAnalysis() {
  const { getAccessTokenSilently } = useAuth0();
  const [ expenseData, setExpenseData ] = useState([]);
  const [ yearOfExpense, setYearOfExpense ] = useState([]);
  const [ selectedYear, setSelectedYear ] = useState(`${new Date().getFullYear()}`); // Initial state of the current year
  const yearArray = [];
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const colourForBar = ["rgba(46, 134, 193, 0.6)", "rgba(211, 84, 0, 0.6)", ]
 
  
  useEffect(() => {
    async function fetchExpensesForChart() {
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
        setOptionSelect(responseData) // Sets option select
        setGraphData(responseData, selectedYear) // Sets graph data according to year
      } catch (e) {
        console.error("Error: ", e.message);
      }
    };
    fetchExpensesForChart();
  }, [selectedYear]);

  function setOptionSelect(responseArray) {
    responseArray.forEach(response => {
      yearArray.push(response.date.split('-')[0])
    })
    setYearOfExpense([...new Set(yearArray)])
  }

  function setGraphData(responseData, year) {
    const tempArray = [];
    const tempData = [];
    responseData.map(response => {
      if(response.date.split('-')[0] === year) { // Need to swap to filter to make use of title as well. WIP
        tempData.push(response);
        switch (response.date.split('-')[1]) {
          case '01':
            tempArray.push([response.amount, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
            break;
          case '02':
            tempArray.push([0, response.amount, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            break;
          case '03':
            tempArray.push([0, 0, response.amount, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            break;
          case '04':
            tempArray.push([0, 0, 0, response.amount, 0, 0, 0, 0, 0, 0, 0, 0]);
            break;
          case '05':
            tempArray.push([0, 0, 0, 0, response.amount, 0, 0, 0, 0, 0, 0, 0]);
            break;
          case '06':
            tempArray.push([0, 0, 0, 0, 0, response.amount, 0, 0, 0, 0, 0, 0]);
            break;
          case '07':
            tempArray.push([0, 0, 0, 0, 0, 0, response.amount, 0, 0, 0, 0, 0]);
            break;
          case '08':
            tempArray.push([0, 0, 0, 0, 0, 0, 0, response.amount, 0, 0, 0, 0])
            break;
          case '09':
            tempArray.push([0, 0, 0, 0, 0, 0, 0, 0, response.amount, 0, 0, 0]);
            break;
          case '10':
            tempArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, response.amount, 0, 0]);
            break;
          case '11':
            tempArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, response.amount, 0]);
            break
          case '12':
            tempArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, response.amount]);
            break;
        }
      }
    })
    formatGraphData(tempArray, tempData)
  }
  
  function formatGraphData(array, data) {
    let count = 0;
    const final = [];
    array.forEach(item => {
      final.push({
      label: `${data[count].title}`,
      data: item,
      backgroundColor: `${"#" + ((1<<24)*Math.random() | 0).toString(16)}`
    })
      count++;
    })
    setExpenseData(final)
  }

  function yearSelectedChange(e) {
    setSelectedYear(e.target.value)
  }

  const barGraphData = {
    labels: labels,
    datasets: expenseData,
  }
  
  const barGraphOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        stacked: true
      }],
      xAxes: [{
        stacked: true
      }]
    }
  }

  return (
    <>
      <div className="year-select-div">
        <label>Year: </label>
        <select value={selectedYear} onChange={yearSelectedChange} >
          {yearOfExpense.map((array, key) => {
            return(
              <option key={key} value={array}>{array}</option>
            );
          })}
        </select>
      </div>
      <Bar data={barGraphData} options={barGraphOptions} />
    </>
  );
}