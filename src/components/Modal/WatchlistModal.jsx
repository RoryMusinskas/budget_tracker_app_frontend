import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ExchangeSelect from "components/Watchlist/ExchangeSelect";
import SymbolSelect from "components/Watchlist/SymbolSelect";
import Button from "components/CustomButtons/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import { useAuth0 } from "@auth0/auth0-react";

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
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function WatchlistModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("exchange");
  const [selectedExchange, setSelectedExchange] = useState("");
  const [selectedShare, setSelectedShare] = useState("");
  const { getAccessTokenSilently, user } = useAuth0();
  const [watchListArray, setWatchListArray] = useState(props.watchList);

  useEffect(() => {
    setWatchListArray(props.watchList);
  }, [props.watchList]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (value) => {
    const data = watchListArray.filter((i) => i !== value);
    try {
      const token = await getAccessTokenSilently();
      fetch(`${process.env.REACT_APP_RAILS_API_URL}/users/:id`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          user: {
            shares_preferences: data,
          },
        }),
      });
    } catch (e) {
      console.log(e.message);
    }
    setWatchListArray(data);
  };

  const postToWatchlist = async () => {
    watchListArray.push(selectedShare);
    try {
      const token = await getAccessTokenSilently();
      fetch(`${process.env.REACT_APP_RAILS_API_URL}/users/:id`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          user: {
            shares_preferences: watchListArray,
          },
        }),
      });
    } catch (e) {
      console.log(e.message);
    }
    handleClose();
    setPage("exchange");
  };

  const populateList = () => {
    return watchListArray.map((value, index) => (
      <ListItem key={index}>
        <ListItemText>{value}</ListItemText>
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

  const displayPage = () => {
    if (page === "exchange") {
      return (
        <>
          <h2 id="transition-modal-title">Select an exchange</h2>
          <ExchangeSelect setSelectedExchange={setSelectedExchange} />
          <Button onClick={() => setPage("symbol")}>Next</Button>
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
          <Button onClick={postToWatchlist}>Add to watchlist</Button>
        </>
      );
    } else if (page === "remove") {
      return (
        <>
          <Typography variant="h6" className={classes.title}>
            Remove stock from watchlist
          </Typography>
          <div className={classes.demo}>
            <List>{populateList()}</List>
          </div>
        </>
      );
    }
  };

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
          <div className={classes.paper}>{displayPage()}</div>
        </Fade>
      </Modal>
    </div>
  );
}
