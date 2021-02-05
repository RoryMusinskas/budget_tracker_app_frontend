/* -------- Import React core ------------ */
import React, { useState } from "react";
/* -------- Import MaterialUI core ------------ */
import { makeStyles } from "@material-ui/core/styles";
import { ClickAwayListener } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
/* -------- Import Custom Components ---------- */
import { Draggable } from "react-beautiful-dnd";
import GoalsModal from "./GoalsModal.jsx";

import styles from "assets/jss/material-dashboard-react/views/goalsPageStyle";
const useStyles = makeStyles(styles);

export default function Goal(props) {
  const classes = useStyles();
  const { state, setState, goal, createGoal, removeGoal } = props;
  const [inputValue, setInputValue] = useState(goal.content);
  // these are the styles for each goal when they are being dragged
  const getGoalStyle = (isDragging, draggableStyle) => ({
    // styles to apply on draggable
    ...draggableStyle,

    // when it's being dragged, add a background color
    ...(isDragging && {
      background: "rgb(235,235,235)",
    }),
  });

  // set the value of the input state to the value of the event target
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // run this function when the user clicks anywhere apart from the input
  // this will then set the state of the title
  const handleClickAway = () => {
    if (inputValue === "") {
      removeGoal(goal);
    } else {
      setGoalState();
    }
  };

  // run this function when the user presses a key, and set the state if the key is enter
  const handleEnter = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setGoalState();
      // remove the focus from the input
      event.target.blur();
      createGoal();
    }
  };

  // set the state of the Goal to update the title of the column
  const setGoalState = () => {
    if (inputValue !== goal.content) {
      goal.content = inputValue;
      setState((prevState) => ({
        ...state,
        goals: {
          ...prevState.goals,
        },
      }));
    }
  };

  // when a user adds a new goal, we want to add the focus to that goal, so they can instantly start typing
  // input is passed in from the inputRef on the input
  const autoFocus = (input) => {
    const lastGoal = Object.keys(state.goals)[
      Object.keys(state.goals).length - 1
    ];

    if (goal.id === lastGoal && goal.content === "") {
      input && input.value === "" && input.focus();
    }
  };

  return (
    <Grid container>
      <Grid item xs={10}>
        <Draggable draggableId={props.goal.id} index={props.index}>
          {(provided, snapshot) => (
            <ListItem
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getGoalStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              <ClickAwayListener onClickAway={handleClickAway}>
                <Grid item xs={12}>
                  <Input
                    value={inputValue}
                    onChange={handleChange}
                    onKeyPress={handleEnter}
                    inputProps={{ "aria-label": "description" }}
                    className={classes.goalInput}
                    inputRef={(input) => {
                      autoFocus(input);
                    }}
                  />
                </Grid>
              </ClickAwayListener>
            </ListItem>
          )}
        </Draggable>
      </Grid>
      <Grid item xs={2} className={classes.editGrid}>
        <GoalsModal state={state} setState={setState} goal={goal} />
      </Grid>
    </Grid>
  );
}
