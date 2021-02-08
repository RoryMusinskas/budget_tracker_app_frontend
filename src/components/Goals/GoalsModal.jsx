/* -------- Import React core ------------ */
import React, { useState } from "react";
/* -------- Import MaterialUI core ------------ */
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
/* -------- Import Custom Components ---------- */
import ModalContent from "./ModalContent";
import Edit from "@material-ui/icons/Edit";

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
}));

// the watchlist modal that is displayed when the user clicks edit watchlist
export default function WatchlistModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { state, setState, goal } = props;

  // open the model
  const handleOpen = () => {
    setOpen(true);
  };

  // close the model
  const handleClose = () => {
    setOpen(false);
  };

  // return the modal component
  return (
    <div>
      <Edit onClick={handleOpen} />
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
            <ModalContent state={state} setState={setState} goal={goal} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
