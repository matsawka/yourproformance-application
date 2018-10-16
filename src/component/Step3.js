import React from 'react';
import validator from 'validator';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export default class Step3 extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
          startDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleStep3 = this.handleStep3.bind(this);
        
        
        
    }
    componentDidMount() {
      this.componentDidUpdate()
      console.log('did mount 3');
  }
    componentDidUpdate() {
      if (this.props.currentStep === 3) {
        if (localStorage.getItem("firstname") !== null) {
          var ls_firstname = localStorage.getItem("firstname");
          document.getElementById("firstName").value = ls_firstname;
        };
        if (localStorage.getItem("lastname") !== null) {
          var ls_lastname = localStorage.getItem("lastname");
          document.getElementById("lastName").value = ls_lastname;
        };
        if (localStorage.getItem("country") !== null) {
          var ls_country = localStorage.getItem("country");
          document.getElementById("country").value = ls_country;
        }; 
        if (localStorage.getItem("state") !== null) {
          var ls_state = localStorage.getItem("state");
          if(ls_state.length !== 0) {
            document.getElementById("usState").value = ls_state;
            document.getElementById("usState_div").classList.remove("displayNone");
            document.getElementById("usState_div").classList.add("displayBlock");
          }
        }; console.log('did update 3');
      }
    }
    handleChange(date) {
      this.setState({
        startDate: date
      });
    }
    
    handleStep3(e) {
      
      e.preventDefault(e);
      console.log('step3 handler');
      let socialSecurity = e.target.elements.socialSecurity.value.trim();
      socialSecurity = socialSecurity.replace(/\D/g,'');
      
      let zipCode = e.target.elements.zipCode.value.trim();
      zipCode = zipCode.replace(/\D/g,'');
     
      const streetAddress = e.target.elements.streetAddress.value.trim();
      
      let birthDate = this.state.startDate;
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
      if(streetAddressResult && zipCodeResult && SocialSecuirtyResult && birthDateResults) {
        this.props.next();
      }
    }
    render(props) {
      if (this.props.currentStep !== 3) {
        return null;
     } 
     
      return (
        <div>
          <h2 className="subheader">LAST STEP! Please confirm your identity</h2>
          <div className="container">
            <form onSubmit={this.handleStep3}>
            
              <div className="row">
                <div className="col-12 col-sm-6">
                  <b><label>First Name:</label></b><br/>
                  <input className="add-option__input" type="text" name="firstName" id="firstName" value="PreFilled Disabled" disabled/>
                </div>
                <div className="col-12 col-sm-6">
                  <b><label>Last Name:</label></b><br/>
                   <input className="add-option__input" type="text" name="lastName" id="lastName" value="PreFilled Disabled" disabled/>
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
                <div className="col-12 col-sm-6 displayNone" id="usState_div">
                  <b><label>State</label></b><br/>
                  <input className="add-option__input" type="text" name="usState" id="usState" value="PreFilled Disabled" disabled/>
                </div>
                <div className="col-12 col-sm-6">
                  <b><label>Country</label></b><br/>
                   <input className="add-option__input" type="text" name="country" id="country" value="PreFilled Disabled" disabled/>
                 </div>
              </div>
              <button className="button">Submit</button>
            </form>
          </div> 
        </div> 
      );
  }
}

