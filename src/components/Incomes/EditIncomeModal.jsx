// React import
import React, { useState } from "react";
// EditIncomeForm component import
import { EditIncomeForm } from "./EditIncomeForm";
// Material-ui import
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";

// Styles for modal
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
  editButton: {
    position: "absolute",
    top: "20px",
    right: "40px",
  },
}));

// EditIncomeModal function
export function EditIncomeModal(props) {
  const { incomeId, deletedOrUpdated, setDeletedOrUpdated, incomes } = props;
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
      <EditIcon onClick={handleOpen} className={classes.editButton}></EditIcon>
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
            <EditIncomeForm
              handleClose={handleClose}
              classes={classes}
              incomeId={incomeId}
              deletedOrUpdated={deletedOrUpdated}
              setDeletedOrUpdated={setDeletedOrUpdated}
              incomes={incomes}
            ></EditIncomeForm>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
