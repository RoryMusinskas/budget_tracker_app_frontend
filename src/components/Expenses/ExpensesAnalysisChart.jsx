import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useAuth0 } from "@auth0/auth0-react";

export function ExpensesAnalysis() {
  const { getAccessTokenSilently } = useAuth0();
  const [ expensesData, setExpensesData] = useState([]);

  // async function fetchExpensesForChart() {
  //   try {
  //     const token = await getAccessTokenSilently();
  //     const response = await fetch(
  //       `${process.env.REACT_APP_RAILS_API_URL}/expenses`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const responseData = await response.json();
  //     console.log(responseData)
  //     setExpensesData(responseData.amount);
  //   } catch (e) {
  //     console.error("Error: ", e.message);
  //   }
  // }

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
        // Maps each response amount into an array to set expenses state
        const array = responseData.map(response => response.amount)
        setExpensesData(array)
      } catch (e) {
        console.error("Error: ", e.message);
      }
    };
    fetchExpensesForChart();
  }, []);

  const barGraphData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Expenses Analysis",
        data: Object.values(expensesData),
        backgroundColor: "#ffcccb",
      }
    ]
  }

  return (
    <Bar data={barGraphData} />
  //   <>
  //     <p>test</p>
  //   </>
  );
}