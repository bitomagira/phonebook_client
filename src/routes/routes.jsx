import React from "react";
import "../index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import AddEntry from "../components/AddEntry";
import Update from "../components/Update";

// All the routes

export default class MyRoutes extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/addEntry" component={AddEntry} />
            <Route exact path="/updateEntry" component={Update} />
          </Switch>
        </Router>
      </div>
    );
  }
}
