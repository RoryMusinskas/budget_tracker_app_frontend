/* -------- Import React core ------------ */
import React from "react";
/* -------- Import MaterialUI core ------------ */
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
/* -------- Import Custom Components ---------- */
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import Goal from "components/Goals/Goal";
import GoalTitle from "./GoalTitle";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Button from "components/CustomButtons/Button";

import styles from "assets/jss/material-dashboard-react/views/goalsPageStyle";
const useStyles = makeStyles(styles);

export default function Column(props) {
  const classes = useStyles();
  const { state, setState, count, column, goals, index } = props;

  // logic to create a goal for a selected column
  const createGoal = () => {
    const newGoalId = `goal-${count}`;
    const newGoal = {
      id: newGoalId,
      content: "",
      description: "",
      percentage: 0,
    };

    // push in the new goal to the selected column goal id array
    column.goalIds.push(newGoalId);

    // update the state, adding the new goal into the goal object
    setState((prevState) => ({
      ...state,
      goals: {
        ...prevState.goals,
        [`${newGoalId}`]: newGoal,
      },
    }));
  };

  // logic to remove a goal from a column
  const removeGoal = (goalToRemove) => {
    // remove the passed in goal from the columns array of goals
    const columnGoals = column.goalIds.filter(
      (goal) => goal !== goalToRemove.id
    );
    // delete the state.goals object property that the user is trying to delete
    delete state.goals[`${goalToRemove.id}`];
    // set the state for the above changes
    setState((prevState) => ({
      ...state,
      // set the goal state
      goals: { ...prevState.goals },
      // set the column state
      columns: {
        ...prevState.columns,
        // set the individual column state
        [`${column.id}`]: {
          id: column.id,
          title: column.title,
          goalIds: columnGoals,
        },
      },
    }));
  };

  return (
    // this is a draggable column that contains goals as children
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Grid
          item
          xs={4}
          md={4}
          lg={4}
          className={classes.columnContainer}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {/* the column card */}
          <Card className={classes.column}>
            <CardHeader {...provided.dragHandleProps}>
              <GoalTitle state={state} setState={setState} column={column} />
            </CardHeader>
            <CardBody>
              {/* the droppable section of the card, where you can drag in goals */}
              <Droppable droppableId={column.id} type="goal">
                {(provided, snapshot) => (
                  <List
                    ref={provided.innerRef}
                    // set the backgroundColour of the list when a goal is being dragged over the container
                    style={{
                      backgroundColor: snapshot.isDraggingOver
                        ? "lightgrey"
                        : "white",
                    }}
                    {...provided.droppableProps}
                  >
                    {/* map out each goal card for a goals assigned to the column */}
                    {goals.map((goal, index) => (
                      <div key={index}>
                        {typeof goal !== "undefined" && (
                          <Card key={goal.id}>
                            <Goal
                              key={goal.id}
                              goal={goal}
                              index={index}
                              state={state}
                              setState={setState}
                              createGoal={createGoal}
                              removeGoal={removeGoal}
                            />
                          </Card>
                        )}
                      </div>
                    ))}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
              <Button onClick={createGoal}>New Goal</Button>
            </CardBody>
          </Card>
        </Grid>
      )}
    </Draggable>
  );
}
