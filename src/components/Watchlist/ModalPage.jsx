/* -------- Import React core ------------ */
import React from "react";
/* -------- Import MaterialUI core ------------ */
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
/* -------- Import Custom Components ---------- */
import ExchangeSelect from "components/Watchlist/ExchangeSelect";
import SymbolSelect from "components/Watchlist/SymbolSelect";
import Button from "components/CustomButtons/Button";

// add all the elements from the watchlist to a list with a delete button each
// choose which page should be displayed based on the current page state
export default function displayPage(props) {
  const {
    page,
    setPage,
    selectedExchange,
    setSelectedExchange,
    selectedShare,
    setSelectedShare,
    addToWatchlist,
    classes,
    handleClose,
    watchList,
    handleDelete,
  } = props;

  if (page === "exchange") {
    return (
      <>
        <h2 id="transition-modal-title">Select an exchange</h2>
        <ExchangeSelect setSelectedExchange={setSelectedExchange} />
        <Button
          onClick={() => {
            if (selectedExchange !== "") {
              setPage("symbol");
            }
          }}
        >
          Next
        </Button>
        <Button onClick={() => setPage("remove")}>Remove Stock</Button>
      </>
    );
  } else if (page === "symbol") {
    return (
      <>
        <h2 id="transition-modal-title">{`Select a ${selectedExchange.country} stock`}</h2>
        <SymbolSelect
          selectedExchange={selectedExchange}
          setSelectedShare={setSelectedShare}
        />
        <Button
          onClick={() => {
            if (selectedShare !== "") {
              addToWatchlist();
            }
          }}
        >
          Add to watchlist
        </Button>
      </>
    );
  } else if (page === "remove") {
    return (
      <>
        <Typography variant="h6" className={classes.title}>
          Remove stock from watchlist
        </Typography>
        <div className={classes.demo}>
          <List>{populateList(watchList, handleDelete)}</List>
        </div>
        <Button onClick={handleClose}>Close</Button>
      </>
    );
  }
}

const populateList = (watchList, handleDelete) => {
  return watchList.map((value, index) => (
    <ListItem key={index}>
      <ListItemText>{`${value.symbol} - ${value.description}`}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => handleDelete(value)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));
};
