import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [{}]
    };
  }

  // fetch all the data from the database when this page mount

  componentDidMount = () => {
    fetch("http://localhost:5000/phonebook/")
      .then(resultat => resultat.json())
      .then(data => this.setState({ entries: data }));
  };

  // search function that fetch all the data that matches the input

  searchHandle = event => {
    let data = { input: event.target.value };
    fetch("http://localhost:5000/phonebook/search/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(resultat => resultat.json())
      .then(data => this.setState({ entries: data }));
  };

  render() {
    return (
      <div>
        <br />
        <div style={{ display: "flex", width: "50%", margin: "auto" }}>
          <FormControl
            style={{ width: "80%" }}
            onChange={this.searchHandle}
            placeholder="Search"
          />
        </div>
        <br />
        <Table
          striped
          bordered
          hover
          variant="bleu"
          style={{
            width: "80%",
            margin: "auto"
          }}
        >
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>telephone</th>
              <th>edit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.entries.map((entry, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black" }}>
                  {entry.first_name}
                </td>
                <td style={{ border: "1px solid black" }}>{entry.last_name}</td>
                <td style={{ border: "1px solid black" }}>{entry.telephone}</td>
                <td style={{ border: "1px solid black" }}>
                  <Link
                    to={{
                      pathname: "/updateEntry",
                      data: entry
                    }}
                  >
                    edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
