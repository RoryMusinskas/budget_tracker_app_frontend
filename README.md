# Auth0 authentication
### First import Auth0
import { useAuth0 } from '@auth0/auth0-react'

### To get access token
- const { isAuthenticated, getAccessTokenSilently } = useAuth0()
- isAuthenticated is a method to check whether a user is authenticated or not, use as a wrapper to code

```javascript 

    const getUserAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently()
        return token
      } catch (e) {
        console.error("Error: ", e.message);
      }
    };
```  
### To POST to api DB (posting to the expenses endpoint used as example)
```javascript
    const postExpense = async () => {
      try{
        const token = await getAccessTokenSilently()
        await fetch("http://localhost:3001/expenses", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({
            expense: {
              description: "Placeholder",
              amount: 100,
              user_id: 1,
              category_id: 1,
            },
            payload:{
              email: "user@example.com",
            }
          }),
        });
      }catch(e){
        console.error(e.message)
      }
  };

```
### To GET from DB (expenses used as end point example)
```javascript
    const getData = async () => {
      try {
        const token = await getAccessTokenSilently()
        const response = await fetch("http://localhost:3001/expenses",{
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        const responseData = await response.json()
        setExpenses(responseData);
      } catch (e) {
        console.error("Error: ", e.message);
      }
    };
```

