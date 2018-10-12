import React from 'react';
import validator from 'validator';
import { CountryDropdown } from 'react-country-region-selector';
import SelectUSState from 'react-select-us-states';

export default class Step1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { country: '', us_state : ''};
        this.handleAddOption = this.handleAddOption.bind(this);
        this.setNewValue = this.setNewValue.bind(this);
        this.state = {  
            error: undefined
        
        };
          
    }
    componentDidMount() {
        localStorage.clear();
        
    }
    selectCountry (val) {
        this.setState({ country: val });
        if(val === "United States") {
            document.getElementById("add-option__state").classList.remove("displayNone");
            document.getElementById("add-option__state").classList.add("displayBlock");
        } else {
            document.getElementById("add-option__state").classList.add("displayNone");
            document.getElementById("add-option__state").classList.remove("displayBlock");
        }
    }
    setNewValue(newValue) {
        this.setState({ us_state: newValue });
    }
    handleAddOption(e) {
        e.preventDefault();
        const firstName = e.target.elements.firstName.value.trim();
        const lastName = e.target.elements.lastName.value.trim();
        const email = e.target.elements.email.value.trim();
        let phoneNumber = e.target.elements.phoneNumber.value.trim();
        phoneNumber = phoneNumber.replace(/\D/g,'');

        const regEx = "/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im";

        validator.isEmpty(firstName) ? 
        document.getElementById("firstName_validation").innerHTML = '<span class="required">*</span>First Name: <span class="required">required</span>' : 
        document.getElementById("firstName_validation").innerHTML = '<span class="required">*</span>First Name:';
        
        validator.isEmpty(lastName) ? 
        document.getElementById("lastName_validation").innerHTML = '<span class="required">*</span>Last Name: <span class="required">required</span>' :  
        document.getElementById("lastName_validation").innerHTML = '<span class="required">*</span>Last Name';
        
        validator.isEmail(email) ? 
        document.getElementById("email_validation").innerHTML = '<span class="required">*</span>*Email:' :  
        document.getElementById("email_validation").innerHTML = '<span class="required">*</span>Email: <span class="required">required</span>';

       validator.isEmpty(phoneNumber) ? 
       document.getElementById("phoneNumber_validation").innerHTML = '<span class="required">*</span>Phone Number: <span class="required">required</span>' :
        document.getElementById("phoneNumber_validation").innerHTML = '<span class="required">*</span>Phone Number:' ; 
        
       if(this.state.country != undefined && this.state.country != "") {
            document.getElementById("Country_validation").innerHTML = '<span class="required">*</span>Country:'; 
        } else {
            document.getElementById("Country_validation").innerHTML = '<span class="required">*</span>Country: <span class="required">required</span>';
        }
        if(this.state.us_state != undefined &&  document.getElementById('add-option__state').classList.contains('displayBlock')){
            document.getElementById("State_validation").innerHTML = '<span class="required">*</span>State:'; 
        } else {
            document.getElementById("State_validation").innerHTML = '<span class="required">*</span>State: <span class="required">required</span>';
        }
        if(document.getElementById("over18Checkbox").checked == true) {
        } else { console.log('not checked');}
 
        if(
             !validator.isEmpty(firstName) && 
            !validator.isEmpty(lastName) && 
            !validator.isEmpty(phoneNumber) && 
            validator.isEmail(email) && 
            (this.state.country != undefined))
            {
                localStorage.setItem('firstname', firstName);
                localStorage.setItem('lastname', lastName);
                localStorage.setItem('email', email);
                localStorage.setItem('phone-number', phoneNumber);
                localStorage.setItem('country', this.state.country);
                if(this.state.us_state == undefined || this.state.country != 'United States')  { this.state.us_state = ''}
                localStorage.setItem('state', this.state.us_state);
                
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
                <h2 className="subheader">Create your account</h2>
                <div className="container">
                    <form onSubmit={this.handleAddOption}>
                        <div className="row">
                            <div className="col-12 col-sm-6">
                            <b><label id="firstName_validation"><span className="required">*</span>First Name:</label></b><br/>
                            <input className="add-option__input" type="text" name="firstName" id="firstName"/>
                            </div>
                            
                            <div className="col-12 col-sm-6">
                            <b><label id="lastName_validation"><span className="required">*</span>Last Name:</label></b><br/>
                            <input className="add-option__input" type="text" name="lastName"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <b><label id="email_validation"><span className="required">*</span>Email:</label></b><br/>
                                <input className="add-option__input" type="email" name="email" id="email"/>
                            </div>
                            <div className="col-12 col-sm-6">
                                <b><label id="phoneNumber_validation"><span className="required">*</span>Phone Number:</label></b><br/>
                                <input className="add-option__input" type="text" name="phoneNumber" id="phoneNumber"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <b><label id="Country_validation"><span className="required">*</span>Country:</label></b><br/>
                                <CountryDropdown
                                    value={country}
                                    onChange={(val) => this.selectCountry(val)} />
                            </div>
                            
                            <div className="displayNone col-sm-6" id="add-option__state">
                                <b><label id="State_validation"><span className="required">*</span>State:</label></b><br/>
                                <SelectUSState id="" className="" onChange={this.setNewValue}/>
                            </div>
                        </div>
                        <div className="row">
                        <div className="col-12">
                        <label>
                            <input type="checkbox" id="over18Checkbox" name="over18Checkbox" value="" />&nbsp;
                            I certify I am 18 years of age or older, and I agree to the <a target="_blank" href="https://www.residualtoken.com/terms-of-use">Terms &amp; Conditions</a></label>
                            </div>
                            
                        </div>
                        <button className="button">Continue</button>
                    </form>
                </div>
            </div>
        );
    }
}

//<button onClick={this.props.next}>Next</button>