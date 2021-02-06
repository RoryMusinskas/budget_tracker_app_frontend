// Import React code
import React from "react";
import { Route, Switch } from "react-router-dom";

// Import Components/Views/Styles
import "assets/css/material-dashboard-react.css?v=1.9.0";
import Admin from "layouts/Admin";
import LandingPage from "views/LandingPage/LandingPage";
// import { Expenses } from "./views/Expenses/Expenses";
import Loading from "./components/Loading";
// import { NewExpenses } from "./views/Expenses/NewExpenses";

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
      </Switch>
    </>
  );
}
