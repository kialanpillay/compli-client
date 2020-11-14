import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./button.css";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      class="btn btn-lg btn-success btn-pill align-self-center"
      style={{marginLeft: 50}}
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
