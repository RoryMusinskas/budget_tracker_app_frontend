/* -------- Import React core ------------ */
import React from "react";
/* -------- Import MaterialUI core ------------ */
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
/* -------- Import Custom Components ---------- */

export default function populateList(props) {
  const { watchList, setWatchList, deleteShareFromDatabase } = props;

  // add all the elements from the watchlist to a list with a delete button each
  return (
    <List>
      {watchList.map((share, index) => (
        <ListItem key={index}>
          <ListItemText>{`${share.symbol} - ${share.description}`}</ListItemText>
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => {
                const updatedWatchList = watchList.filter(
                  (i) => i.id !== share.id
                );
                setWatchList(updatedWatchList);
                deleteShareFromDatabase(share.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}
