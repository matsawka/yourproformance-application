import React from "react";
import validator from "validator";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../firebase/firebase";
import uuid from "uuid";
import * as emailjs from "emailjs-com";
import { Link } from "react-router-dom";

export default class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      pullCredit: false
    };
  }
  creditState = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      pullCredit: value
    });
  }
  handleChange = date => {
    this.setState({
      startDate: date
    });
  }
  onFormSubmit = e => {
    e.preventDefault(e);
    //get values from form
    let socialSecurity = e.target.elements.socialSecurity.value.trim();
    socialSecurity = socialSecurity.replace(/\D/g, "");
    let zipCode = e.target.elements.zipCode.value.trim();
    zipCode = zipCode.replace(/\D/g, "");
    const streetAddress = e.target.elements.streetAddress.value.trim();
    const streetAddress2 = e.target.elements.streetAddress2.value.trim();
    const city = e.target.elements.city.value.trim();
    let birthDate = this.state.startDate;

    //validate form inputs
    if (birthDate != null) {
      //date exists
      document.getElementById("birthDate_validation").innerHTML =
        '<span class="required">*</span>Date of Birth:';
      birthDate = birthDate.format().substr(0, 10); //format: YYYY-DD-MM
      var birthDateResults = true;
    } else {
      document.getElementById("birthDate_validation").innerHTML =
        '<span class="required">*</span>Date of Birth: <span class="required">required</span>';
    }
    if (validator.isEmpty(city)) {
      document.getElementById("city_validation").innerHTML =
        '<span class="required">*</span>City: <span class="required">required</span>';
    } else {
      document.getElementById("city_validation").innerHTML =
        '<span class="required">*</span>City:';
      var cityResult = true;
    }
    if (validator.isEmpty(streetAddress)) {
      document.getElementById("streetAddress_validation").innerHTML =
        '<span class="required">*</span>Street Address: <span class="required">required</span>';
    } else {
      document.getElementById("streetAddress_validation").innerHTML =
        '<span class="required">*</span>Street Address:';
      var streetAddressResult = true;
    }
    if (validator.isEmpty(zipCode)) {
      document.getElementById("zipCode_validation").innerHTML =
        '<span class="required">*</span>Zip Code: <span class="required">required</span>';
    } else if (zipCode.length != 5) {
      //check for 5 digit zip
      document.getElementById("zipCode_validation").innerHTML =
        '<span class="required">*</span>Zip Code: <span class="required">must be 5 digits</span>';
    } else {
      document.getElementById("zipCode_validation").innerHTML =
        '<span class="required">*</span>Zip Code:';
      var zipCodeResult = true;
    }
    if (validator.isEmpty(socialSecurity)) {
      document.getElementById("socialSecurity_validation").innerHTML =
        '<span class="required">*</span>Social Security Number: <span class="required">required</span>';
    } else if (socialSecurity.length != 9) {
      //check for 9 digit S.S. #
      document.getElementById("socialSecurity_validation").innerHTML =
        '<span class="required">*</span>Social Security Number: <span class="required">must be 9 digits</span>';
    } else {
      document.getElementById("socialSecurity_validation").innerHTML =
        '<span class="required">*</span>Social Security Number:';
      var SocialSecuirtyResult = true;
    }

    //if validation passes, push to firebase and more to step 4
    if (
      streetAddressResult &&
      zipCodeResult &&
      SocialSecuirtyResult &&
      birthDateResults &&
      cityResult &&
      this.state.pullCredit
    ) {
      var momentDate = moment()
        .tz("America/New_York")
        .format("MMMM Do YYYY, h:mm:ss a z");
      var momentDay = moment()
        .tz("America/New_York").format('L');
      var db = firebase.firestore();
      // const database  = firebase.database();
      const uniqueId = uuid();

      var dbCall = db
        .collection("users")
        .doc(uniqueId)
        .set({
          dateApplied: momentDate,
          firstName: this.props.currentData[0],
          middleInitial: this.props.currentData[6],
          lastName: this.props.currentData[1],
          email: this.props.currentData[2],
          phoneNumber: this.props.currentData[3],
          dateOfBirth: birthDate,
          socialSecurity: socialSecurity,
          agreeTerms: this.props.currentData[7],
          location: {
            street: streetAddress,
            street2: streetAddress2,
            city: city,
            state: this.props.currentData[5],
            country: this.props.currentData[4],
            zip: zipCode
          },
          loan: {
            currencyType: this.props.currentData[8],
            loanAmoun: this.props.currentData[9],
            collateral: this.props.currentData[10],
            LTV: this.props.currentData[11],
            source: this.props.currentData[12],
            intended: this.props.currentData[13],
            apr: this.props.currentData[14],
            monthlyPayment: this.props.currentData[15],
            totalInterest: this.props.currentData[16],
            marginCall: this.props.currentData[17],
            escrowValue: this.props.currentData[18],
            margin: this.props.currentData[19],
            rate: this.props.currentData[20],
            prime: this.props.currentData[21],
            pullcredt: this.state.pullCredit
          }
        });
      this.props.handleId(uniqueId);
      //send email
      var templateParams = {
        firstName: this.props.currentData[0],
        lastName: this.props.currentData[1],
        id: uniqueId,
        time: momentDate
      };

      // also save to airtable, leav ein firebase for now
      // console.log(
      //   "process.env.AIRTABLE_API_KEY:",
      //   process.env.AIRTABLE_API_KEY,
      //   "process.env.AUTHDOMAIN",
      //   process.env.AUTHDOMAIN
      // );
      var Airtable = require("airtable");

      var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
      "app07QDgAAsXbpFax"
      );
      base("MISSION CONTROL").create(
        {
          LOAN_APP_ID: uniqueId,
          APPLICATION_DATE: momentDay
        },
        function(err, record) {
          if (err) {
            console.error(err);
            return;
          }
          console.log(record.getId());
        }
      );
      base("BORROWER").create(
        {
          LOAN_APP_ID: uniqueId,
          BORR_FIRSTNAME: this.props.currentData[0],
          BORR_MI: this.props.currentData[6],
          BORR_LASTNAME: this.props.currentData[1],
          BORR_SUFFIX: "",
          BORR_STREET: streetAddress,
          BORR_ADDRESS_2: streetAddress2,
          BORR_CITY: city,
          BORR_STATE: this.props.currentData[5],
          BORR_ZIP: zipCode,
          BORR_COUNTRY: this.props.currentData[4],
          BORR_PHONE_NO: this.props.currentData[3],
          BORR_EMAIL: this.props.currentData[2],
          BORR_ESCROW_YN: this.props.currentData[18],
          BORR_SSNO: socialSecurity,
          BORR_DOB: birthDate,
          SOURCE: this.props.currentData[12],
          USE: this.props.currentData[13],
          BORR_TERM_AGREE_YN: this.props.currentData[7]
        },
        function(err, record) {
          if (err) {
            console.error(err);
            return;
          }
          console.log(record.getId());
        }
      );
      base("LOAN DETAIL").create(
        {
          LOAN_APP_ID: uniqueId,
          COLLTYPE: this.props.currentData[8],
          PRINC_BAL: this.props.currentData[9],
          COLL_REQ_CALC: this.props.currentData[10],
          LTV: this.props.currentData[11],
          APR: this.props.currentData[14],
          PMT_MONTHLY: this.props.currentData[15],
          TOTAL_INTEREST: this.props.currentData[16],
          COLL_PRICE: this.props.currentData[17],
          ESCROW_SERVICE: this.props.currentData[18],
          MARGIN: this.props.currentData[19],
          RATE: this.props.currentData[20],
          PRIME: this.props.currentData[21],
          PULL_CREDIT: this.state.pullCredit
        },
        function(err, record) {
          if (err) {
            console.error(err);
            return;
          }
          console.log(record.getId());
        }
      );

      emailjs
        .send(
          "gmail",
          "template_0zcrjEzd",
          templateParams,
          "user_rZcSn8v3aA3gHzjiQBdu6"
        )
        .then(
          function(response) {
            console.log("SUCCESS!", response.status, response.text);
          },
          function(error) {
            console.log("FAILED...", error);
          }
        );
      this.props.next();
    }
  }
  render(props) {
    if (this.props.currentStep !== 3) {
      return null;
    }
    let us_state_render;
    if (this.props.currentData[5]) {
      us_state_render = (
        <div className="col-12 col-sm-6">
          <b>
            <label>State</label>
          </b>
          <br />
          <input
            className="add-option__input"
            type="text"
            name="usState"
            id="usState"
            value={this.props.currentData[5]}
            disabled
          />
        </div>
      );
    }

    return (
      <div>
        <h2 className="subheader">Application Continued</h2>
        <div className="container">
          <form onSubmit={this.onFormSubmit}>
            <div className="row">
              <div className="col-12 col-sm-5">
                <b>
                  <label>First Name:</label>
                </b>
                <br />
                <input
                  className="add-option__input"
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={this.props.currentData[0]}
                  disabled
                />
              </div>
              <div className="col-12 col-sm-1">
                <b>
                  <label>Initial:</label>
                </b>
                <br />
                <input
                  className="add-option__input"
                  type="text"
                  name="middleInitial"
                  id="middleInitial"
                  value={this.props.currentData[6]}
                  disabled
                />
              </div>
              <div className="col-12 col-sm-6">
                <b>
                  <label>Last Name:</label>
                </b>
                <br />
                <input
                  className="add-option__input"
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={this.props.currentData[1]}
                  disabled
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-sm-6">
                <b>
                  <label id="birthDate_validation">
                    <span className="required">*</span>Date of Birth:
                  </label>
                </b>
                <br />
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  calendarClassName="birthDate"
                />
              </div>
              <div className="col-12 col-sm-6">
                <b>
                  <label id="socialSecurity_validation">
                    <span className="required">*</span>Social Security Number:
                  </label>
                </b>
                <br />
                <input
                  className="add-option__input"
                  type="text"
                  name="socialSecurity"
                  id="socialSecurity"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-sm-6">
                <b>
                  <label id="streetAddress_validation">
                    <span className="required">*</span>Street Address:
                  </label>
                </b>
                <br />
                <input
                  className="add-option__input"
                  type="text"
                  name="streetAddress"
                  id="streetAddress"
                />
              </div>
              <div className="col-12 col-sm-6">
                <b>
                  <label>
                    Street Address #2
                  </label>
                </b>
                <br />
                <input
                  className="add-option__input"
                  type="text"
                  name="streetAddress2"
                  id="streetAddress2"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-sm-6">
                  <b>
                    <label id="city_validation">
                      <span className="required">*</span>City:
                    </label>
                  </b>
                  <br />
                  <input
                    className="add-option__input"
                    type="text"
                    name="city"
                    id="city"
                  />
                </div>
              {us_state_render}
            </div>  
            <div className="row">
              <div className="col-12 col-sm-6">
                <b>
                  <label>Country</label>
                </b>
                <br />
                <input
                  className="add-option__input"
                  type="text"
                  name="country"
                  id="country"
                  value={this.props.currentData[4]}
                  disabled
                />
              </div>
              <div className="col-12 col-sm-6">
                <b>
                  <label id="zipCode_validation">
                    <span className="required">*</span>Zip Code:
                  </label>
                </b>
                <br />
                <input
                  className="add-option__input"
                  type="text"
                  name="zipCode"
                  id="zipCode"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <label className="flex__label">
                  <input
                    type="checkbox"
                    id="background"
                    name="background"
                    value=""
                    checked={this.state.pullCredit}
                    onChange={this.creditState} 
                  />
                  &nbsp; <span className="smalltext">
                  I hereby authorize, pursuant to the federal Fair Credit Reporting Act, Proformance Management Group, LLC and its designated agents and representatives to conduct a comprehensive review of my background for the purposes of determining my eligibility for a consumer loan. 
                  &nbsp;<Link to="/fair-credit-reporting-act" target="_blank">
                    Fair Credit Reporting Act
                  </Link>
                  </span> 
                </label>
              </div>
            </div>
            <button className="button">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
