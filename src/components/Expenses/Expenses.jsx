import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles(styles);

export function Expenses() {
  const { getAccessTokenSilently } = useAuth0();
  const [expenses, setExpenses] = useState([]);

  // A cleaner way to fetch with token
  async function fetchExpenses() {
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
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
        <ol>
        {expenses.map((expense, index) => {
            return (
            <>
                <li key={index}>
                <ul>
                    <li>Description: {expense.description}</li>
                    <li>Amount: ${expense.amount}</li>
                </ul>
                </li>
            </>
            );
        })}
        </ol>
    </>
  );
}
