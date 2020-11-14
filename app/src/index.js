import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import "./custom.scss";
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="alphaqlabs.us.auth0.com"
      clientId="Ihl5OM2t9yAMfD212nhXrB40XQS9V2ff"
      redirectUri={window.location.href}
    >
      <App />
    </Auth0Provider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
