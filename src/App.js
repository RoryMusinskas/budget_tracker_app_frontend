import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import { Profile } from "./components/UserProfile";
import { Expenses } from "./components/Expenses";
import LandingPage from "views/LandingPage/LandingPage";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./components/Loading";

// core components
import Admin from "layouts/Admin";
import RTL from "layouts/RTL";

import "assets/css/material-dashboard-react.css?v=1.9.0";

export default function App() {
  const {
    isAuthenticated,
    isLoading,
    getAccessTokenWithPopup,
    getAccessTokenSilently,
    user,
    error,
  } = useAuth0();

  const [userAccessToken, setUserAccessToken] = useState("");

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.log("Error", error.message);
  }

  if (isAuthenticated === true) {
    // This async function will retrieve a userToken from the auth0 usermanagement endpoint
    const getUserToken = async () => {
      // try to get this token silently with no popup
      try {
        const UserAccessToken = await getAccessTokenSilently({
          audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
          scope: "read:current_user",
        });
        setUserAccessToken(UserAccessToken);
        // if it can't get it silently, it will prompt the user to enable the consent (this will only happen on first login)
      } catch (e) {
        console.log(e);
        const UserAccessToken = await getAccessTokenWithPopup({
          audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
          scope: "read:current_user",
        });
        setUserAccessToken(UserAccessToken);
      }

      // If there is a user token, run the next try catch.
      // This is needed the function to get the token above is async, this allows it to store the token first
      if (userAccessToken !== "") {
        try {
          const token = await getAccessTokenSilently();
          fetch("http://localhost:3001/users", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json",
              Authorization: `bearer ${token}`,
            },
            body: JSON.stringify({
              user: {
                email: user.email,
                shares_preferences: ["test", "test"],
              },
              UserAccessToken: userAccessToken,
            }),
          });
        } catch (e) {
          console.log(e.message);
        }
      }
    };
    getUserToken();
  }
  return (
    <>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <ProtectedRoute path="/admin" component={Admin} />
        <ProtectedRoute path="/rtl" component={RTL} />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/expenses" component={Expenses} />
      </Switch>
    </>
  );
}
