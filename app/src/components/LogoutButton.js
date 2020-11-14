import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import "./login.css";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div className="login">
      <ExitToAppIcon className="login-icon" style={{color:"white"}}/>
    <p className="login-btn" style={{color:"white"}}
      onClick={() => logout({ returnTo: window.location.origin })}
    > 
      Log Out
    </p>
    </div>
  );
};

export default LogoutButton;
