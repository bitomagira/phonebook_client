import React, { Component } from "react";
import { FormControl, Button } from "react-bootstrap";
class AddEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      telephone: ""
    };
  }

  // validation function to make sure that a name won't contain a digit
  validationName = input => {
    return input.match(/^[A-Za-z-\s]*$/);
  };
  //  validation function to  verify the input for the telephone
  telephonevalidation = input => {
    return input.match(/^\+\d{2}\s\d{2}\s\d{6,}$/) || input.length < 1;
  };

  // change the state everytime the user type something
  changehandle = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // validate the form before submitting
  allDataValidated = () => {
    return (
      (this.state.first_name.length > 0) &
      (this.state.last_name.length > 0) &
      (this.state.telephone.length >= 13) &
      (this.validationName(this.state.first_name) !== null) &
      (this.validationName(this.state.last_name) !== null) &
      (this.telephonevalidation(this.state.telephone) !== null)
    );
  };

  // save the data from the form
  handleSubmit = () => {
    const { history } = this.props;
    const data = this.state;
    fetch("http://localhost:5000/phonebook/newentry", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        history.push("/");
      })
      .catch(error => console.log("error"));
  };

  render() {
    return (
      <React.Fragment>
        <form style={{ width: "50%", margin: "auto" }}>
          <br />
          first-name :
          <FormControl onChange={this.changehandle} name="first_name" />
          {!this.validationName(this.state.first_name) ? (
            <p style={{ color: "red" }}>First-name can't contain a number!</p>
          ) : null}
          last-name:
          <FormControl onChange={this.changehandle} name="last_name" />
          {!this.validationName(this.state.last_name) ? (
            <p style={{ color: "red" }}>Last-name can't contain a number!</p>
          ) : null}
          telephone:
          <FormControl onChange={this.changehandle} name="telephone" />
          {!this.telephonevalidation(this.state.telephone) ? (
            <p style={{ color: "red" }}>
              Telephone must be of format +xx xx xxxxxx....!
            </p>
          ) : null}
          {this.allDataValidated() === 1 ? (
            <Button onClick={this.handleSubmit}>Save</Button>
          ) : null}
        </form>
      </React.Fragment>
    );
  }
}

export default AddEntry;
