import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";

import "./index.css";

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