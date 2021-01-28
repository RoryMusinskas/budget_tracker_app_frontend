// Import React code
import React from "react";
import { Route, Switch } from "react-router-dom";

// Import Components/Views/Styles
import "assets/css/material-dashboard-react.css?v=1.9.0";
import Admin from "layouts/Admin";
import RTL from "layouts/RTL";
import LandingPage from "views/LandingPage/LandingPage";
import { Profile } from "./components/UserProfile";
import { Expenses } from "./views/Expenses/Expenses";
import Loading from "./components/Loading";
import { NewExpenses } from "./views/Expenses/NewExpenses";

// Import Auth0 code
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  // Grab useAuth0 hooks
  const {
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    user,
  } = useAuth0();

  // If loading, display the loading spinner
  if (isLoading) {
    return <Loading />;
  }

  // Use Auth0 hook to check if user is authenticated
  // If they are, post to the users end point to check
  // and see if the user is already added to the users table
  if (isAuthenticated === true) {
    const getUserToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        fetch(`${process.env.REACT_APP_RAILS_API_URL}/users`, {
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
        {/* <ProtectedRoute path="/profile" component={Profile} /> */}
      </Switch>
    </>
  );
}
