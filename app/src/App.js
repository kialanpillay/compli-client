import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Test from "./pages/Test";
import Capture from "./pages/Capture";

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/capture">
            <Capture />
          </Route>
          <Route exact path="/test">
            <Test />
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}
