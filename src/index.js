import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import App from "./App";

import "assets/css/material-dashboard-react.css?v=1.9.0";

ReactDOM.render(
  <Router>
    {/* wrapping Auth0ProviderWithHistory in router, gives access to router object to auth0ProviderWithHistory*/}
    <Auth0ProviderWithHistory>
      {/* wrapping app in auth0ProviderWithHistory gives all auth0ProviderWithHistory hooks */}
      <App />
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);
