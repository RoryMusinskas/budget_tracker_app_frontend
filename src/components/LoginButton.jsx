import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "components/CustomButtons/Button";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      onClick={() =>
        loginWithRedirect({
          scope: "read:current_user",
        })
      }
    >
      Log In
    </Button>
  );
};

export default LoginButton;
