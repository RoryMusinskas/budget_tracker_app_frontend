// React import
import React, { useState } from "react";
// NewIncomeForm component import
import { NewIncomesForm } from "./NewIncomesForm";
// Material-ui import
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  formDescriptionDiv: {
    marginTop: "30px",
  },
}));

// NewIncomeModal function
export function NewIncomesModal(props) {
  const { deletedOrUpdated, setDeletedOrUpdated, incomes } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // Opens modal on call
  const handleOpen = () => {
    setOpen(true);
  };
  // Closes modal on call, is prop drilled to handle
  // exiting modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Income
      </Button>
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
            <NewIncomesForm
              handleClose={handleClose}
              classes={classes}
              deletedOrUpdated={deletedOrUpdated}
              setDeletedOrUpdated={setDeletedOrUpdated}
              incomes={incomes}
            ></NewIncomesForm>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
