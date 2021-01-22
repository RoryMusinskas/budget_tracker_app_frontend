import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import { Profile } from "./components/UserProfile";
import { Expenses } from "./components/Expenses";

// core components
import Admin from "layouts/Admin";
import RTL from "layouts/RTL";

import "assets/css/material-dashboard-react.css?v=1.9.0";

export default function App() {
  return (
    <div>
      <Switch>
        <ProtectedRoute path="/admin" component={Admin} />
        <ProtectedRoute path="/rtl" component={RTL} />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/expenses" component={Expenses} />
      </Switch>
    </div>
  );
}
