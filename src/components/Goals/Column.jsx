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

import styles from "assets/jss/material-dashboard-react/views/goalsPageStyle";
const useStyles = makeStyles(styles);

export default function Column(props) {
  const classes = useStyles();

  return (
    // this is a draggable column that contains goals as children
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Grid
          item
          xs={12}
          md={12}
          lg={3}
          className={classes.columnContainer}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          // the column card
          <Card className={classes.column}>
            <CardHeader {...provided.dragHandleProps}>
              <GoalTitle
                state={props.state}
                setState={props.setState}
                column={props.column}
              />
            </CardHeader>
            <CardBody>
              // the droppable section of the card, where you can drag in goals
              <Droppable droppableId={props.column.id} type="goal">
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
                    // map out each goal card for a goals assigned to the column
                    {props.goals.map((goal, index) => (
                      <Card key={goal.id}>
                        <Goal key={goal.id} goal={goal} index={index} />
                      </Card>
                    ))}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </CardBody>
          </Card>
        </Grid>
      )}
    </Draggable>
  );
}
