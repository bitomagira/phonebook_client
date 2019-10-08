import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
class Menu extends Component {
  state = {};

  // The navbar of the application with all the menu

  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">Phonebook</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/AddEntry">Add Entry</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Menu;
