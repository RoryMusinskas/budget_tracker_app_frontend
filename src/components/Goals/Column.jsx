/* -------- Import React core ------------ */
import React from "react";
/* -------- Import MaterialUI core ------------ */
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Icon from "@material-ui/core/Icon";
/* -------- Import Custom Components ---------- */
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import CardBody from "components/Card/CardBody";
import Goal from "components/Goals/Goal";
import { Droppable, Draggable } from "react-beautiful-dnd";

import styles from "assets/jss/material-dashboard-react/views/goalsPageStyle";
const useStyles = makeStyles(styles);

export default function Column(props) {
  const classes = useStyles();

  return (
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
          <Card className={classes.column}>
            <CardHeader {...provided.dragHandleProps}>
              <CardIcon color="warning">
                <Icon>announcement</Icon>
              </CardIcon>
              <h6>{props.column.title}</h6>
            </CardHeader>
            <CardBody>
              <Droppable droppableId={props.column.id} type="goal">
                {(provided, snapshot) => (
                  <List
                    ref={provided.innerRef}
                    // set the backgroundColour of the list when a goal is being dragged over the container
                    style={{
                      backgroundColor: snapshot.isDraggingOver
                        ? "cornflowerblue"
                        : "white",
                    }}
                    {...provided.droppableProps}
                  >
                    {props.goals.map((goal, index) => (
                      <Goal key={goal.id} goal={goal} index={index} />
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
