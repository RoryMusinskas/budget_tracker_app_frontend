import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export function DisplayIncome(props){
  const { setYearTotal } = props
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
      setIncome(responseData);
      setTotal(responseData); 
    } catch (e) {
      console.error("Error: ", e.message);
    }
  }

  useEffect(() => {
    getUserIncomeData();
  }, [])

  function setTotal(obj) {
    let final = 0;
    obj.forEach(item => {
      final += item.amount
    })
    setYearTotal(final)
  }

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