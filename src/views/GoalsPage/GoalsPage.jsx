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

import styles from "assets/jss/material-dashboard-react/views/goalsPageStyle";
const useStyles = makeStyles(styles);

export default function GoalsPage() {
  const classes = useStyles();
  const { getAccessTokenSilently, user } = useAuth0();
  const [state, setState] = useState(initialData.default);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);

  // this function is used to persist the order of the column, it's fired on drag end of a draggable component into a droppable component
  const onDragEnd = (result) => {
    // destructure info from the result of the drag end
    const { destination, source, draggableId, type } = result;

    // if there was no destination, there is no action that has to happen
    if (!destination) {
      return;
    }

    // check to see if the location of the draggable changed
    // if the if statement is true, the user dropped the item in the same spot they moved it from
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //----------------- logic for reordering a column -----------------------//
    //-----------------------------------------------------------------------//
    if (type === "column") {
      // create a new column order array with the values from before
      const newColumnOrder = Array.from(state.columnOrder);
      // remove the old column id from the index
      newColumnOrder.splice(source.index, 1);
      // insert the new column id into the new position
      newColumnOrder.splice(destination.index, 0, draggableId);

      // create a new state object, which is the same as our old state object, but with the new column order array
      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      setState(newState);
      // console.log("column", newState);
      return;
    }

    //--------- logic for reordering a goal within its start column ---------//
    //-----------------------------------------------------------------------//
    // get the column from the state
    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    // if start and finsh column of drag event are the same
    if (start === finish) {
      // create an array with the same data from the last array
      const newGoalIds = Array.from(start.goalIds);

      // move the goal id from the old index to the new index in the array
      newGoalIds.splice(source.index, 1);
      newGoalIds.splice(destination.index, 0, draggableId);

      // create a new column, with the same properties as the old column, but with the new goalId array
      const newColumn = {
        ...start,
        goalIds: newGoalIds,
      };

      // set a new state value by spreading in the old state and overwriting the columns
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      // update the state
      setState(newState);

      return;
    }

    //-------------- logic for moving a goal to another column --------------//
    //-----------------------------------------------------------------------//

    // create a new start goals array, with the ids from the old array
    const startGoalIds = Array.from(start.goalIds);
    // remove the dragged goal id from this array
    startGoalIds.splice(source.index, 1);

    // create a new start column, which has the same properties as the old array, but with the new startGoalIds array
    const newStart = {
      ...start,
      goalIds: startGoalIds,
    };

    // create a new finished goal array with the goals from the last finish goal array
    const finishGoalIds = Array.from(finish.goalIds);

    // insert the draggable id at the destination index
    finishGoalIds.splice(destination.index, 0, draggableId);

    // create a new column, with the new goal ids for that column
    const newFinish = {
      ...finish,
      goalIds: finishGoalIds,
    };

    // create new state object, with the same values as the old values, but update the column map with the updated goals id
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);
    // console.log("moving goal to anouther column", newState);
    return;
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
