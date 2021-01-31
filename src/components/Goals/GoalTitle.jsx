/* -------- Import React core ------------ */
import React, { useState } from "react";
/* -------- Import MaterialUI core ------------ */
import { makeStyles } from "@material-ui/core/styles";
import { ClickAwayListener } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
/* -------- Import Custom Components ---------- */
import Input from "@material-ui/core/Input";

import styles from "assets/jss/material-dashboard-react/views/goalsPageStyle";
const useStyles = makeStyles(styles);

export default function GoalTitle(props) {
  const classes = useStyles();
  const { state, setState, column } = props;
  const [inputValue, setInputValue] = useState(column.title);

  // set the value of the input state to the value of the event target
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // run this function when the user clicks anywhere apart from the input
  // this will then set the state of the title
  const handleClickAway = () => {
    setGoalState();
  };

  // run this function when the user presses a key, and set the state if the key is enter
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      setGoalState();
    }
  };

  // set the state of the Goal to update the title of the column
  const setGoalState = () => {
    if (inputValue !== column.title) {
      column.title = inputValue;
      setState((prevState) => ({
        ...state,
        columns: {
          ...prevState.columns,
        },
      }));
    }
  };

  return (
    // wrap the input in the clickAwayListener. This will fire a function if users click away from the input
    <ClickAwayListener onClickAway={handleClickAway}>
      <Grid item xs={12}>
        <Input
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleEnter}
          inputProps={{ "aria-label": "description" }}
          className={classes.goalTitle}
        />
      </Grid>
    </ClickAwayListener>
  );
}
