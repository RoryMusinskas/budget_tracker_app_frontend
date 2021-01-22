import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
          scope: "read:current_user",
        });

        const userDetailsByIdUrl = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user]);

  // const getUser = async () => {
  //   try {
  //     const token = await getAccessTokenSilently();
  //     let test = await fetch("http://localhost:3001/users/1", {
  //       mode: "cors",
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `bearer ${token}`,
  //       },
  //     })
  //     .then(response => responseon())
  //     .then(responseData => console.log(responseData))
  //   } catch (e) {
  //     console.error(e.message);
  //   }
  // };
  // getUser()

  //   const postToDatabase = async () => {
  //     try{
  //       const token = await getAccessTokenSilently()
  //       await fetch("http://localhost:3001/users", {
  //         method: "POST",
  //         mode: "cors",
  //         headers: {
  //           "Content-type": "application/json",
  //           Authorization: `bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           user: {
  //             email: user.email,
  //             shares_preferences: ['btc', 'eth']
  //           },
  //         }),
  //       });
  //     }catch(e){
  //       console.error(e.message)
  //     }
  // };
  // postToDatabase()

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
        <div>
          <h3>User Data</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div>
    )
  );
};
