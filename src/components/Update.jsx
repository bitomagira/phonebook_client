import React, { Component } from "react";
import { FormControl, Button } from "react-bootstrap";
import Dialog from "react-bootstrap-dialog";
import { Redirect } from "react-router";

class Update extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.location.data;
  }

  // verify if only the name was modified

  modifyNameOnly = oldData => {
    return (
      (oldData.first_name !== this.state.first_name ||
        oldData.last_name !== this.state.last_name) &&
      oldData.telephone === this.state.telephone
    );
  };

  // verify if only the telephone was modified

  modifyTelephoneOnly = oldData => {
    return (
      oldData.first_name === this.state.first_name &&
      oldData.last_name === this.state.last_name &&
      oldData.telephone !== this.state.telephone
    );
  };

  handleSubmit = oldData => {
    const { history } = this.props;

    //  the user can modify the name or the telephone
    //  he can't modify all the info at the same time
    // because this would means that he is creating a new entry in the phonebook

    if (this.modifyNameOnly(oldData) || this.modifyTelephoneOnly(oldData)) {
      const data = this.state;
      data.id = oldData.telephone;
      fetch("http://localhost:5000/phonebook/update", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          alert("saved ");
          history.push("/");
        })
        .catch(error => console.log("error"));
    } else {
      this.dialog.showAlert(
        "you can't modify name and telephone at the same time!"
      );
    }
  };

  // save instantaneously all the changes in the form

  changehandle = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const oldData = this.props.location.data;
    return !this.state ? (
      <Redirect to="/" />
    ) : (
      <React.Fragment>
        <form style={{ width: "50%", margin: "auto" }}>
          <br />
          first-name :
          <FormControl
            onChange={this.changehandle}
            name="first_name"
            value={this.state.first_name}
          />
          last-name:
          <FormControl
            onChange={this.changehandle}
            name="last_name"
            value={this.state.last_name}
          />
          telephone:
          <FormControl
            onChange={this.changehandle}
            name="telephone"
            value={this.state.telephone}
          />
          <Button onClick={() => this.handleSubmit(oldData)}>Save</Button>
          <Dialog
            ref={component => {
              this.dialog = component;
            }}
          />
        </form>
      </React.Fragment>
    );
  }
}

export default Update;
