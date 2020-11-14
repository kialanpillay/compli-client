import React from "react";
import "../sidebar.css";
import { SidebarData } from "./SidebarData";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

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
          <h2
            style={{ color: "white", textAlign: "center", paddingTop: "1rem" }}
          >
            Complì
          </h2>
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
      </ul>

      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  );
}

export default Sidebar;
