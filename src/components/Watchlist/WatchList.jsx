/* -------- Import React core ------------ */
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
/* -------- Import MaterialUI core ------------ */
import WatchlistModal from "./WatchlistModal";
/* -------- Import Custom Components ---------- */

export default function WatchList(props) {
  const { getAccessTokenSilently, user } = useAuth0();

  // get the users watchlist from the database on component load
  useEffect(() => {
    getWatchList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Moved this function out of the useEffect so that the updateSharesDatabase function can call it, this will re render the trading view widget
  const getWatchList = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${process.env.REACT_APP_RAILS_API_URL}/shares`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      // set the state of the watchlist in the shares page
      props.setWatchList(responseData);
    } catch (e) {
      console.error("Error: ", e.message);
    }
  };

  // update the watchlist array for the current user in the database
  async function updateSharesDatabase(share) {
    try {
      const token = await getAccessTokenSilently();
      fetch(`${process.env.REACT_APP_RAILS_API_URL}/shares`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          share: {
            description: share.description,
            symbol: share.symbol,
            user_sub: user.sub,
          },
        }),
      });
      // call the getWatchList function, this will rerender the trading view widget
      getWatchList();
    } catch (e) {
      console.log(e.message);
    }
  }

  // update the watchlist array for the current user in the database
  async function deleteShareFromDatabase(id) {
    try {
      const token = await getAccessTokenSilently();
      fetch(`${process.env.REACT_APP_RAILS_API_URL}/shares/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <WatchlistModal
      watchList={props.watchList}
      setWatchList={props.setWatchList}
      updateSharesDatabase={updateSharesDatabase}
      deleteShareFromDatabase={deleteShareFromDatabase}
    />
  );
}
