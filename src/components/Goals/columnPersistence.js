// this function is used to persist the order of the column, it's fired on drag end of a draggable component into a droppable component
export function columnPersistence(result, state, setState) {
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
}
