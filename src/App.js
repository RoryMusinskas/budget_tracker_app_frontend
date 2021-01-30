// Import React code
import React from "react";
import { Route, Switch } from "react-router-dom";

// Import Components/Views/Styles
import "assets/css/material-dashboard-react.css?v=1.9.0";
import Admin from "layouts/Admin";
import RTL from "layouts/RTL";
import LandingPage from "views/LandingPage/LandingPage";
import SharesPage from "views/SharesPage/SharesPage";
import { Profile } from "./components/UserProfile";
import { Expenses } from "./components/Expenses";
import Loading from "./components/Loading";

// Import Auth0 code
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  // Grab useAuth0 hooks
  const { isLoading } = useAuth0();

  // If loading, display the loading spinner
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <ProtectedRoute path="/admin" component={Admin} />
        <ProtectedRoute path="/rtl" component={RTL} />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/expenses" component={Expenses} />
        <ProtectedRoute path="/shares" component={SharesPage} />
      </Switch>
    </>
  );
}
