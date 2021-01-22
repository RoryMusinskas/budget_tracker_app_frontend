import './App.css';
import { useAuth0 } from "@auth0/auth0-react";
import AuthenticationNav from './components/AuthenticationNav';
import UserProfile from './components/UserProfile'
import { Expenses } from './components/Expenses'
import Loading from './components/Loading'
import {Route, Switch} from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'

function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0();

  if (isLoading) {
    return <Loading />
  }
  
  if (isAuthenticated) {
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
                // TODO ------------------------------------------------------------------------
                // Conditonally update shares preference. THis might no be the right spot for it, but it's being passed ATM for rails backend validation. We could remove that if needed 
                shares_preferences: ['test', 'test']
              },
              UserAccessToken: UserAccessToken,
          }),
        });
      } catch (e) {
        console.log(e.message);
      }
    };
    getUserToken()
  }

  return (
    <div className="App">
      <h1>Budget Tracker App</h1>
      <hr />

      <AuthenticationNav />
      <Switch>
        <Route exact path="/" />
        <ProtectedRoute exact path="/profile" component={UserProfile} />
        <ProtectedRoute exact pach="/expenses" component={Expenses} />
      </Switch>
    </div>
  );
}

export default App;
