import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function Expenses() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userAccessToken, setUserAccessToken] = useState(null);
  const [expenses, setExpenses] = useState([]);

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

  // A cleaner way to fetch with token
    const getData = async () => {
      try {
        const token = await getAccessTokenSilently()
        const response = await fetch("http://localhost:3001/expenses",{
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        const responseData = await response.json()
        setExpenses(responseData);
      } catch (e) {
        console.error("Error: ", e.message);
      }
    };

  // useEffect(() => {
  //   getData();
  // }, [userAccessToken]);

    const postExpense = async () => {
      try{
        const token = await getAccessTokenSilently()
        await fetch("http://localhost:3001/expenses", {
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
            payload:{
              email: user.email,
            }
          }),
        });
      }catch(e){
        console.error(e.message)
      }
  };

  // const getData = () => {
  //   isAuthenticated &&
  //     fetch("http://localhost:3001/expenses", {
  //       headers: {
  //         Authorization: `bearer ${userAccessToken}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((responseData) => setExpenses(responseData));
  // };

  return (
    <>
    <h1>Expenses</h1>
    <button onClick={getData}>get data</button>
    <button onClick={postExpense}>Post random expense</button>
    <ul>
      {expenses.map((expense) => {
      return <li>{expense.description}</li>})}
    </ul>
    </>
  );
// }
  };