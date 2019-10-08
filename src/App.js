import React, { Component } from "react";
import Routes from "./routes/routes";
import Menu from "./components/Menu";
import "./App.css";

class App extends Component {
  state = {};
  // the application
  render() {
    return (
      <React.Fragment>
        <Menu></Menu>
        <Routes></Routes>
      </React.Fragment>
    );
  }
}

export default App;
