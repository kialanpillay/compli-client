import React from "react";
import "../sidebar.css";
import { SidebarData } from "./SidebarData";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import heart from "../img/heart.png";
function Sidebar() {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        <li>
          <p
            style={{ color: "white", textAlign: "center", paddingTop: "1rem" }}
          > <img className="logo" src={heart} class="mr-2" alt="" style={{width:"36px", fontSize:"26px"}} />
            Complì
          </p>
        </li>
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={window.location.pathname == val.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div id="icon">{val.icon}</div> <div id="title">{val.title}</div>
            </li>
           
          );
        })}
        <li>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</li>
      </ul>

      
    </div>
  );
}

export default Sidebar;
