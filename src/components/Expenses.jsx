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
      console.log(responseData);
      // setExpenses(responseData);
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

  // FUNCTIONS I HAVE REFACTORED - LEFT FOR REFERENCE
  // A way to get access token not very clean
  // useEffect(() => {
  //   const getUserAccessToken = async () => {
  //     try {
  //       const accessToken = await getAccessTokenSilently({
  //         audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  //       });
  //       setUserAccessToken(accessToken);
  //     } catch (e) {
  //       console.error("Error: ", e.message);
  //     }
  //   };
  //   getUserAccessToken();
  // }, [getAccessTokenSilently]);

  // useEffect(() => {
  //   getData();
  // }, [userAccessToken]);

  // const getData = () => {
  //   isAuthenticated &&
  //     fetch("http://localhost:3001/expenses", {
  //       headers: {
  //         Authorization: `bearer ${userAccessToken}`,
  //       },
  //     })
  //       .then((response) => responseon())
  //       .then((responseData) => setExpenses(responseData));
  // };

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
