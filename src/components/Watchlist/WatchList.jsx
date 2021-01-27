import React, { useEffect } from "react";
import WatchlistModal from "components/Modal/WatchlistModal";
import { useAuth0 } from "@auth0/auth0-react";

export default function WatchList(props) {
  const { getAccessTokenSilently } = useAuth0();
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
        props.setWatchList(responseData.shares_preferences);
      } catch (e) {
        console.error("Error: ", e.message);
      }
    };
    getWatchList();
  }, []);
  return <WatchlistModal watchList={props.watchList} />;
}
