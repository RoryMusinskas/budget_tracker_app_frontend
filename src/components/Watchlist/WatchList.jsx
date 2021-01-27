/* -------- Import React core ------------ */
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
/* -------- Import MaterialUI core ------------ */
import WatchlistModal from "./WatchlistModal";
/* -------- Import Custom Components ---------- */

export default function WatchList(props) {
  const { getAccessTokenSilently } = useAuth0();

  // get the users watchlist from the database on component load
  useEffect(() => {
    const getWatchList = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(
          `${process.env.REACT_APP_RAILS_API_URL}/users/:id`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = await response.json();
        // set the state of the watchlist in the shares page, to then pass to the trading view widget
        props.setWatchList(responseData.shares_preferences);
      } catch (e) {
        console.error("Error: ", e.message);
      }
    };
    getWatchList();
  }, []);

  // update the watchlist array for the current user in the database
  async function updateUserWatchList(data) {
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
  }

  return (
    <WatchlistModal
      watchList={props.watchList}
      setWatchList={props.setWatchList}
      updateUserWatchList={updateUserWatchList}
    />
  );
}
