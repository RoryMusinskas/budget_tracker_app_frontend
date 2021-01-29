/* -------- Import React core ------------ */
import React from "react";
/* -------- Import MaterialUI core ------------ */
// import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
/* -------- Import Custom Components ---------- */
import { Draggable } from "react-beautiful-dnd";

// import styles from "assets/jss/material-dashboard-react/views/goalsPageStyle";
// const useStyles = makeStyles(styles);

// these are the styles for each goal when they are being dragged
const getGoalStyle = (isDragging, draggableStyle) => ({
  // styles to apply on draggable
  ...draggableStyle,

  // when it's being dragged, add a background color
  ...(isDragging && {
    background: "rgb(235,235,235)",
  }),
});

export default function Goal(props) {
  // const classes = useStyles();
  return (
    <Draggable draggableId={props.goal.id} index={props.index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          // this dragHandle is what controls the drag event. You could remove this from the container and add this to a component and make the draggable section a certain size etc.
          {...provided.dragHandleProps}
          style={getGoalStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <ListItemText>{props.goal.content}</ListItemText>
        </ListItem>
      )}
    </Draggable>
  );
}
