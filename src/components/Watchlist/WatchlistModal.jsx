/* -------- Import React core ------------ */
import React, { useState } from "react";
/* -------- Import MaterialUI core ------------ */
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
/* -------- Import Custom Components ---------- */
import Button from "components/CustomButtons/Button";
import ModalPage from "components/Watchlist/ModalPage";

// the styles for the modal
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  background: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  closeIcon: {
    cursor: "pointer",
    marginLeft: "100%",
  },
  button: {
    marginTop: "20px",
  },
}));

// the watchlist modal that is displayed when the user clicks edit watchlist
export default function WatchlistModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("exchange");
  const [selectedShare, setSelectedShare] = useState("");
  const [selectedExchange, setSelectedExchange] = useState("");

  // open the model
  const handleOpen = () => {
    setOpen(true);
  };

  // close the model
  const handleClose = () => {
    setOpen(false);
    setPage("exchange");
  };

  // return the modal component
  return (
    <div>
      <Button onClick={handleOpen}>Edit watch list</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <ModalPage
              page={page}
              setPage={setPage}
              selectedExchange={selectedExchange}
              setSelectedExchange={setSelectedExchange}
              selectedShare={selectedShare}
              setSelectedShare={setSelectedShare}
              classes={classes}
              handleClose={handleClose}
              watchList={props.watchList}
              setWatchList={props.setWatchList}
              updateSharesDatabase={props.updateSharesDatabase}
              deleteShareFromDatabase={props.deleteShareFromDatabase}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
