import React from "react";
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
    getAccessTokenSilently,
    user,
  } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }

  if (isAuthenticated === true) {
    const getUserToken = async () => {
      try {
        const UserAccessToken = await getAccessTokenSilently({
          audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
          scope: "read:current_user",
        });

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
            UserAccessToken: UserAccessToken,
          }),
        });
      } catch (e) {
        console.log(e.message);
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
