// React import
import React, { useState, useEffect } from 'react'
// Auth0 import
import { useAuth0 } from '@auth0/auth0-react'

export function DisplayIncome(props){
  const { setYearTotal, currentYear } = props
  const [income, setIncome] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  // GET request to backend api
  async function getUserIncomeData() {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${process.env.REACT_APP_RAILS_API_URL}/incomes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      setData(responseData)
    } catch (e) {
      console.error("Error: ", e.message);
    }
  }

  // Mount component
  useEffect(() => {
    getUserIncomeData();
  }, [])

  // setData function returns array that corresponds to the current year
  function setData(data) {
    const tempArr = data.filter(item => {
      return item.date.split('-')[0] === `${currentYear}`
    })
    setIncome(tempArr)
    setTotal(tempArr)
  }

  // Sets total amount for this year lifts 
  // state back to dashboard to display total
  function setTotal(array) {
    let final = 0;
    array.forEach(item => {
      final += item.amount
    })
    setYearTotal(final)
  }

  // Returns 15 of the most recent income from current year
  function incomesList() {
    if (income.length !== 0) {
      return (
        <>
          {income.slice(0, 15).map((income, index) => {
            return <li key={`${income}[${index}]`}>{income.title}</li>;
          })}
        </>
      );
    } else {
      return <li>You haven't set an income yet</li>;
    }
  }

  return (
    <>
      <ul>{incomesList()}</ul>
    </>
  );
}