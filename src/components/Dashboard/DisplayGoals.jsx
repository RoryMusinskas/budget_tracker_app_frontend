/* -------- Import React core ------------ */
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function DisplayGoals() {
  const { getAccessTokenSilently } = useAuth0();
  const [goals, setGoals] = useState([]);

  // get the user data from the database
  const getUserGoalData = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${process.env.REACT_APP_RAILS_API_URL}/goals`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      if (responseData !== undefined){
      setGoals(Object.values(responseData[0].goals_data.goals));
      } 
    } catch (err) {
      console.log(err);
    }
    // setLoading(false);
  };
  useEffect(() => {
    getUserGoalData();
  }, []);

  function goalsList() {
    if (goals.length !== 0) {
      return (
        <>
          {goals.slice(0, 15).map((goal, index) => {
            return <li key={index}>{goal.content}</li>;
          })}
        </>
      );
    } else {
      return <li>You haven't set a goal yet</li>;
    }
  }

  return (
    <>
      <ul>{goalsList()}</ul>
    </>
  );
}
