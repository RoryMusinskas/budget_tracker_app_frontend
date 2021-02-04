/* -------- Import React core ------------ */
import React, { useState } from "react";
/* -------- Import MaterialUI core ------------ */
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import { ClickAwayListener } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
/* -------- Import Custom Components ---------- */

import styles from "assets/jss/material-dashboard-react/views/goalsPageStyle";

const useStyles = makeStyles(styles);

// add all the elements from the watchlist to a list with a delete button each
// choose which page should be displayed based on the current page state
export default function ModalContent(props) {
  const classes = useStyles();
  const { state, setState, goal } = props;
  const [goalContent, setGoalContent] = useState(goal.content);
  const [goalDescription, setGoalDescription] = useState(goal.description);
  const [goalPercentage, setGoalPercentage] = useState(goal.percentage);

  // set the value of the input state to the value of the event target
  const handleContentChange = (event) => {
    setGoalContent(event.target.value);
  };

  // set the value of the textArea state to the value of the event target
  const handleDescriptionChange = (event) => {
    setGoalDescription(event.target.value);
  };

  // set the value of the ariaValue for the current percentage, convert it to an int and then set state
  const handlePercentageChange = (event) => {
    if (event.target.ariaValueText !== null) {
      const percentage = parseInt(event.target.ariaValueText);
      setGoalPercentage(percentage);
    }
  };

  // returns the value of the current ariaValue
  function valuetext(value) {
    return `${value}`;
  }

  // run this function when the user clicks anywhere apart from the input
  // this will then set the state of the title
  const handleClickAway = (element) => {
    setGoalState();
  };

  // run this function when the user presses a key, and set the state if the key is enter
  const handleEnter = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setGoalState(event.target.value);
      // remove the focus from the input
      event.target.blur();
    }
  };

  // set the state of the Goal to update the title of the column
  const setGoalState = () => {
    if (
      // if any of the properties change, update the values, then update the state
      goalContent !== goal.content ||
      goalDescription !== goal.description ||
      goalPercentage !== goal.percentage
    ) {
      goal.content = goalContent;
      goal.description = goalDescription;
      goal.percentage = goalPercentage;
      setState((prevState) => ({
        ...state,
        goals: {
          ...prevState.goals,
        },
      }));
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Grid container>
        <Grid item xs={12}>
          <Input
            name="goalContent"
            value={goalContent}
            onChange={handleContentChange}
            onKeyPress={handleEnter}
            inputProps={{ "aria-label": "description" }}
            className={classes.goalContent}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            name="goalDescription"
            value={goalDescription}
            onChange={handleDescriptionChange}
            onKeyPress={handleEnter}
            multiline
            rows={5}
            variant="outlined"
            className={classes.goalDescription}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography id="discrete-slider" gutterBottom>
            Percentage Complete
          </Typography>
          <Slider
            key={`slider-${goalPercentage}`}
            defaultValue={goalPercentage}
            aria-labelledby="discrete-slider"
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            onChange={handlePercentageChange}
            step={10}
            marks={true}
            min={0}
            max={100}
            className={classes.goalPercentage}
          />
        </Grid>
      </Grid>
    </ClickAwayListener>
  );
}
