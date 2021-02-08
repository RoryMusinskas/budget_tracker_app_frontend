/* -------- Import React core ------------ */
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
/* -------- Import MaterialUI core ------------ */
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
/* -------- Import Custom Components ---------- */
import Column from "components/Goals/Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import * as initialData from "components/Goals/initial-data.json";
import Loading from "components/Loading";
import { columnPersistence } from "components/Goals/columnPersistence";

import styles from "assets/jss/material-dashboard-react/views/goalsPageStyle";
const useStyles = makeStyles(styles);

export default function GoalsPage() {
  const classes = useStyles();
  const { getAccessTokenSilently, user } = useAuth0();
  const [state, setState] = useState(initialData.default);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);

  // on drag end, call the imported columnPersistence JS module function
  const onDragEnd = (result) => {
    columnPersistence(result, state, setState);
  };

  //------ logic for persting data to the database for each user ----------//
  //-----------------------------------------------------------------------//
  useEffect(() => {
    getUserGoalData();
  }, []);

  // this is the equivilent of componentDidUpdate, this is so it doesn't run a put request on the initial load, as there is nothing in the database yet.
  // this will update the values on each subsequent state update
  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    putUserGoalData(state);
  }, [state]);

  // get the user data from the database, if they haven't got any data stored, post the default values, else update the state
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
      if (responseData.length === 0) {
        postUserGoalData(state);
      } else {
        setState(responseData[0].goals_data);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // this is to post the intial data to the database on only the first time, when the user has no data stored in the database
  const postUserGoalData = async () => {
    try {
      const token = await getAccessTokenSilently();
      await fetch(`${process.env.REACT_APP_RAILS_API_URL}/goals`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          goals_data: {
            goals: state.goals,
            columns: state.columns,
            columnOrder: state.columnOrder,
          },
          user_sub: user.sub,
        }),
      });
    } catch (e) {
      console.error(e.message);
    }
  };

  // update the users data in the database, this will run for every state update, except the first one when there is no data in the database for the user
  const putUserGoalData = async () => {
    // set the count to pass to the columns, this is used for the index for each new goal
    setCount(Object.keys(state.goals).length + 1);
    try {
      const token = await getAccessTokenSilently();
      await fetch(`${process.env.REACT_APP_RAILS_API_URL}/goals/${user.sub}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          goals_data: {
            goals: state.goals,
            columns: state.columns,
            columnOrder: state.columnOrder,
          },
          user_sub: user.sub,
        }),
      });
    } catch (e) {
      console.error(e.message);
    }
  };

  if (!loading) {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Grid
              container
              className={classes.goalsContainer}
              {...provided.droppableProps}
              ref={provided.innerRef}
              spacing={3}
            >
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];
                const goals = column.goalIds.map(
                  (goalId) => state.goals[goalId]
                );
                return (
                  <Column
                    key={column.id}
                    column={column}
                    goals={goals}
                    index={index}
                    state={state}
                    setState={setState}
                    count={count}
                  />
                );
              })}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    );
  } else {
    return <Loading />;
  }
}
