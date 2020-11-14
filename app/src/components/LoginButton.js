import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import "./login.css";
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login">
     <ExitToAppIcon className="login-icon" style={{color:"white"}}/>
       <p className="login-btn" style={{color:"white"}}
      
      onClick={() => loginWithRedirect()}
    > 
      Log In
    </p>
    </div>
   
  );
};

export default LoginButton;
