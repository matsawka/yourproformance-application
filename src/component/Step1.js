import React from "react";
import validator from "validator";
import { CountryDropdown } from "react-country-region-selector";
import SelectUSState from "react-select-us-states";
import { Link } from "react-router-dom";

export default class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      us_state: ""
    };
  }
  selectCountry = val => {
    this.setState({ country: val });
    if (val === "United States") {
      document
        .getElementById("add-option__state")
        .classList.remove("displayNone");
      document
        .getElementById("add-option__state")
        .classList.add("displayBlock");
    } else {
      document.getElementById("add-option__state").classList.add("displayNone");
      document
        .getElementById("add-option__state")
        .classList.remove("displayBlock");
      this.setState({ us_state: "" });
    }
  }
  setNewValue = newValue => {
    this.setState({ us_state: newValue });
  }
  onFormSubmit = e => {
    e.preventDefault();

    //get values from form
    const firstName = e.target.elements.firstName.value.trim();
    const middleInitial = e.target.elements.middleInitial.value.trim();
    const lastName = e.target.elements.lastName.value.trim();
    const email = e.target.elements.email.value.trim();
    let phoneNumber = e.target.elements.phoneNumber.value.trim();
    phoneNumber = phoneNumber.replace(/\D/g, "");

    //validate form inputs
    firstName
      ? (document.getElementById("firstName_validation").innerHTML =
          '<span class="required">*</span>First Name:')
      : (document.getElementById("firstName_validation").innerHTML =
          '<span class="required">*</span>First Name: <span class="required">required</span>');

    lastName
      ? (document.getElementById("lastName_validation").innerHTML =
          '<span class="required">*</span>Last Name')
      : (document.getElementById("lastName_validation").innerHTML =
          '<span class="required">*</span>Last Name: <span class="required">required</span>');

    validator.isEmail(email)
      ? (document.getElementById("email_validation").innerHTML =
          '<span class="required">*</span>Email:')
      : (document.getElementById("email_validation").innerHTML =
          '<span class="required">*</span>Email: <span class="required">required</span>');

    phoneNumber
      ? (document.getElementById("phoneNumber_validation").innerHTML =
          '<span class="required">*</span>Phone Number:')
      : (document.getElementById("phoneNumber_validation").innerHTML =
          '<span class="required">*</span>Phone Number: <span class="required">required</span>');

    this.state.country
      ? (document.getElementById("Country_validation").innerHTML =
          '<span class="required">*</span>Country:')
      : (document.getElementById("Country_validation").innerHTML =
          '<span class="required">*</span>Country: <span class="required">required</span>');

    if (
      this.state.us_state != undefined &&
      document
        .getElementById("add-option__state")
        .classList.contains("displayBlock")
    ) {
      document.getElementById("State_validation").innerHTML =
        '<span class="required">*</span>State:';
    } else {
      document.getElementById("State_validation").innerHTML =
        '<span class="required">*</span>State: <span class="required">required</span>';
    }
    if (document.getElementById("over18Checkbox").checked == true) {
      var over18Checkboxchecked = true;
    }
    //if validation passes, add to state and more to step 2
    if (
      firstName &&
      lastName &&
      phoneNumber &&
      validator.isEmail(email) &&
      this.state.country &&
      over18Checkboxchecked
    ) {
    let step1Array = [firstName, lastName, email, phoneNumber, this.state.country, this.state.us_state, middleInitial, over18Checkboxchecked];
      this.props.handleForm(step1Array);
      this.props.next();
    }
  }
  render(props) {
    if (this.props.currentStep !== 1) {
      return null;
    }
    const { country } = this.state;
    return (
      <div>
        <h2 className="subheader">Apply for a Loan</h2>
        <div className="container">
          <form onSubmit={this.onFormSubmit}>
            <div className="row">
              <div className="col-12 col-sm-5">
                <b>
                  <label id="firstName_validation">
                    <span className="required">*</span>First Name:
                  </label>
                </b>
                <br />
                <input
                  className="add-option__input"
                  type="text"
                  name="firstName"
                />
              </div>
              <div className="col-12 col-sm-1">
                <b>
                  <label>Initial</label>
                </b>
                <br />
                <input
                  className="add-option__input"
                  type="text"
                  name="middleInitial"
                  maxLength="1"
                />
              </div>
              <div className="col-12 col-sm-6">
                <b>
                  <label id="lastName_validation">
                    <span className="required">*</span>Last Name:
                  </label>
                </b>
                <br />
                <input
                  className="add-option__input"
                  type="text"
                  name="lastName"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6">
                <b>
                  <label id="email_validation">
                    <span className="required">*</span>Email:
                  </label>
                </b>
                <br />
                <input
                  className="add-option__input"
                  type="email"
                  name="email"
                />
              </div>
              <div className="col-12 col-sm-6">
                <b>
                  <label id="phoneNumber_validation">
                    <span className="required">*</span>Phone Number:
                  </label>
                </b>
                <br />
                <input
                  className="add-option__input"
                  type="text"
                  name="phoneNumber"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6">
                <b>
                  <label id="Country_validation">
                    <span className="required">*</span>Country:
                  </label>
                </b>
                <br />
                <CountryDropdown
                  value={country}
                  onChange={val => this.selectCountry(val)}
                />
              </div>

              <div className="displayNone col-sm-6" id="add-option__state">
                <b>
                  <label id="State_validation">
                    <span className="required">*</span>State:
                  </label>
                </b>
                <br />
                <SelectUSState className="" onChange={this.setNewValue} />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <label>
                  <input
                    type="checkbox"
                    id="over18Checkbox"
                    name="over18Checkbox"
                    value=""
                  />
                  &nbsp; I certify I am 18 years of age or older, and I agree to
                  the{" "}
                  <Link to="/terms-and-conditions" target="_blank">
                    Terms &amp; Conditions
                  </Link>
                </label>
              </div>
            </div>
            <button className="button">Continue</button>
          </form>
        </div>
      </div>
    );
  }
}
