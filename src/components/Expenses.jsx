import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function Expenses() {
  const { getAccessTokenSilently } = useAuth0();
  const [expenses, setExpenses] = useState([]);

  // A cleaner way to fetch with token
  const getData = async () => {
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
      setExpenses(responseData);
    } catch (e) {
      console.error("Error: ", e.message);
    }
  };

  // A way to post expenses to the backend
  const postExpense = async () => {
    try {
      const token = await getAccessTokenSilently();
      await fetch(`${process.env.REACT_APP_RAILS_API_URL}/expenses`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          expense: {
            description: "Placeholder",
            amount: 100,
            category_id: 1,
          },
        }),
      });
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <>
      <h1>Expenses</h1>
      <button onClick={getData}>get data</button>
      <button onClick={postExpense}>Post random expense</button>
      <ul>
        {expenses.map((expense, index) => {
          return <li key={index}>{expense.description}</li>;
        })}
      </ul>
    </>
  );
  // }
}
