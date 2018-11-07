import React from 'react';
import validator from 'validator';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import firebase from '../firebase/firebase';
import uuid from 'uuid';

export default class Step3 extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.giveMeValue = this.giveMeValue.bind(this);
        this.state = {
          startDate: moment()
        };
    }
    
    handleChange(date) {
      this.setState({
        startDate: date
      });
    }

    giveMeValue(value) {
      console.log('giveMeValue' , value);
    }
    onFormSubmit(e) {
      e.preventDefault(e);
      //get values from form
      let socialSecurity = e.target.elements.socialSecurity.value.trim();
      socialSecurity = socialSecurity.replace(/\D/g,'');
      let zipCode = e.target.elements.zipCode.value.trim();
      zipCode = zipCode.replace(/\D/g,'');
      const streetAddress = e.target.elements.streetAddress.value.trim();
      let birthDate = this.state.startDate;

      //validate form inputs
      if(birthDate != null) { //date exists
        document.getElementById("birthDate_validation").innerHTML = '<span class="required">*</span>Date of Birth:';
        birthDate = birthDate.format().substr(0,10); //format: YYYY-DD-MM
        var birthDateResults = true;
      }
      else {
        document.getElementById("birthDate_validation").innerHTML = '<span class="required">*</span>Date of Birth: <span class="required">required</span>';
      }

      if(validator.isEmpty(streetAddress)) {
        document.getElementById("streetAddress_validation").innerHTML = '<span class="required">*</span>Street Address: <span class="required">required</span>';
      }
      else {
        document.getElementById("streetAddress_validation").innerHTML = '<span class="required">*</span>Street Address:'; 
        var streetAddressResult= true;
      }
      if(validator.isEmpty(zipCode)) {
        document.getElementById("zipCode_validation").innerHTML = '<span class="required">*</span>Zip Code: <span class="required">required</span>';
      }
      else if (zipCode.length != 5){ //check for 5 digit zip
        document.getElementById("zipCode_validation").innerHTML = '<span class="required">*</span>Zip Code: <span class="required">must be 5 digits</span>';
      }
      else {
        document.getElementById("zipCode_validation").innerHTML = '<span class="required">*</span>Zip Code:'; 
        var zipCodeResult = true;
      }
      if(validator.isEmpty(socialSecurity)) {
        document.getElementById("socialSecurity_validation").innerHTML = '<span class="required">*</span>Social Security Number: <span class="required">required</span>';
      }
      else if (socialSecurity.length != 9){ //check for 9 digit S.S. # 
        document.getElementById("socialSecurity_validation").innerHTML = '<span class="required">*</span>Social Security Number: <span class="required">must be 9 digits</span>';
      }
      else {
        document.getElementById("socialSecurity_validation").innerHTML = '<span class="required">*</span>Social Security Number:'; 
        var SocialSecuirtyResult= true;
      }

      //if validation passes, push to firebase and more to step 4
      if(streetAddressResult 
        && zipCodeResult 
        && SocialSecuirtyResult 
        && birthDateResults) {
          var db = firebase.firestore();
               // const database  = firebase.database();
               const uniqueId = uuid();
                   
                    var dbCall = db.collection("users").doc(uniqueId).set({
                    status: 'new',
                    firstName: this.props.currentData[0],
                    lastName: this.props.currentData[1],
                    email: this.props.currentData[2],
                    phoneNumber: this.props.currentData[3],
                    dateOfBirth: birthDate,
                    socialSecurity: socialSecurity,
                    location :{
                        street: streetAddress,
                        state: this.props.currentData[5],
                        country: this.props.currentData[4],
                        zip: zipCode
                    },
                    loan: {
                      currencyType: this.props.currentData[6],
                      loanAmoun: this.props.currentData[7],
                      collateral: this.props.currentData[8],
                      LTV:  this.props.currentData[9],
                      source:  this.props.currentData[10],
                      intended: this.props.currentData[11],
                      apr: this.props.currentData[12],
                      monthlyPayment: this.props.currentData[13],
                      totalInterest: this.props.currentData[14],
                      marginCall: this.props.currentData[15]
                    }
                });
                this.props.handleId(uniqueId);
       this.props.next();
      }
    }
    render(props) {
      if (this.props.currentStep !== 3) {
        return null;
     } 
     let us_state_render;
     if(this.props.currentData[5] ){
      us_state_render = <div className="col-12 col-sm-6"><b><label>State</label></b><br/><input className="add-option__input" type="text" name="usState" id="usState" value={this.props.currentData[5]} disabled/></div>;
    }
     
      return (
        <div>
          <h2 className="subheader">LAST STEP! Please confirm your identity</h2>
          <div className="container">
            <form onSubmit={this.onFormSubmit}>
            
              <div className="row">
                <div className="col-12 col-sm-6">
                  <b><label>First Name:</label></b><br/>
                  <input className="add-option__input" type="text" name="firstName" id="firstName" value={this.props.currentData[0]} disabled/>
                </div>
                <div className="col-12 col-sm-6">
                  <b><label>Last Name:</label></b><br/>
                   <input className="add-option__input" type="text" name="lastName" id="lastName" value={this.props.currentData[1]} disabled/>
                 </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                <b><label id="birthDate_validation"><span className="required">*</span>Date of Birth:</label></b><br/>
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
                   <b><label id="socialSecurity_validation"><span className="required">*</span>Social Security Number:</label></b><br/>
                   <input className="add-option__input" type="text" name="socialSecurity" id="socialSecurity"/>
                 </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <b><label id="streetAddress_validation"><span className="required">*</span>Street Address:</label></b><br/>
                  <input className="add-option__input" type="text" name="streetAddress" id="streetAddress"/>
                </div>
                <div className="col-12 col-sm-6">
                  <b><label id="zipCode_validation"><span className="required">*</span>Zip Code:</label></b><br/>
                   <input className="add-option__input" type="text" name="zipCode" id="zipCode"/>
                 </div>
              </div>

              <div className="row">
               {us_state_render}
            
                <div className="col-12 col-sm-6">
                  <b><label>Country</label></b><br/>
                   <input className="add-option__input" type="text" name="country" id="country" value={this.props.currentData[4]} disabled/>
                 </div>
              </div>
              <button className="button">Submit</button>
            </form>
          </div> 
        </div> 
      );
  }
}

