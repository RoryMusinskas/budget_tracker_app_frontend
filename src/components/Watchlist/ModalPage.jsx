/* -------- Import React core ------------ */
import React from "react";
/* -------- Import MaterialUI core ------------ */
import Typography from "@material-ui/core/Typography";
/* -------- Import Custom Components ---------- */
import ExchangeSelect from "components/Watchlist/ExchangeSelect";
import SymbolSelect from "components/Watchlist/SymbolSelect";
import Button from "components/CustomButtons/Button";
import PopulateList from "components/Watchlist/PopulateList";

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
    classes,
    handleClose,
    watchList,
    setWatchList,
    updateSharesDatabase,
    deleteShareFromDatabase,
  } = props;

  // choose which page should be displayed based on the current page state of the modal
  switch (page) {
    // show this when the user opens up the modal, you can select an exchange or delete one of your shares
    case "exchange":
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
    // show this after the user has selected an exchange, they can then confirm the share selection
    case "symbol":
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
                // update the database when the user has selected their share
                updateSharesDatabase(selectedShare);
                // close the modal
                handleClose();
                // set the current page
                setPage("exchange");
              }
            }}
          >
            Add to watchlist
          </Button>
        </>
      );
    // show this when the user clicks the remove button, it populates the list and then allows them to delete any share they have
    case "remove":
      return (
        <>
          <Typography variant="h6" className={classes.title}>
            Remove stock from watchlist
          </Typography>
          <div className={classes.background}>
            <PopulateList
              watchList={watchList}
              setWatchList={setWatchList}
              deleteShareFromDatabase={deleteShareFromDatabase}
            />
          </div>
          <Button onClick={handleClose}>Close</Button>
        </>
      );
    default:
      return (
        <>
          <h1>Error</h1>
          <Button>onClick={handleClose}</Button>
        </>
      );
  }
}
