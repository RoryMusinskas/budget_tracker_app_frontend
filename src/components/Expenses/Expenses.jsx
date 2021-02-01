// Import React
import React, { useEffect, useState } from "react";

// Import Auth0
import { useAuth0 } from "@auth0/auth0-react";

// Import from react-router-dom
import { Link } from "react-router-dom";

// Icon import from material ui
import { DeleteForever } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';

export function Expenses() {
  // Hooks  
  const [expenses, setExpenses] = useState([]);

  // Auth0 Hook
  const { getAccessTokenSilently, user } = useAuth0();

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

  // Onclick delete function
  async function onClickDelete (e, expense) {
    try {
      // Prevent default page reload on submit
      e.preventDefault();
      // Confirmation to delete expense
      if(window.confirm(`Delete expense: ${expense.title}?`)) {
        const token = await getAccessTokenSilently();
        await fetch(`${process.env.REACT_APP_RAILS_API_URL}/expenses/${expense.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({
            expense: {
              title: expense.title, // title for expense
              description: expense.description,
              category_id: parseInt(expense.category), // ParseInt to convert string to integer
              amount: expense.amount,
              user_sub: user.sub, // user_sub for identifying each unique user
            },
          }),
        });
        fetchExpenses();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
        {expenses.map((expense, index) => {
            return (
            <>
                <ul key={index} >
                    <li>Title: {expense.title}</li>
                    <li>Description: {expense.description}</li>
                    <li>Amount: ${expense.amount}</li>
                </ul>
                <Link onClick={(e) => onClickDelete(e, expense)}><DeleteForever></DeleteForever></Link>
                <Link to={`expenses/${expense.id}/edit`}><EditIcon></EditIcon></Link>
            </>
            );
        })}
    </>
  );
}
