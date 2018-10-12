import React from 'react';
import validator from 'validator';
import { FaEthereum } from 'react-icons/fa';
import { FaBitcoin } from 'react-icons/fa';

export default class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.handleBitcoin = this.handleBitcoin.bind(this);
        this.handleEther = this.handleEther.bind(this);
        this.handleCalculate = this.handleCalculate.bind(this);
        this.handleStep2 = this.handleStep2.bind(this);
        this.selectorChangeC = this.selectorChangeC.bind(this);
        console.log(props);
        
        this.state = {  
            
        };
    }
    handleBitcoin(e) {
      e.preventDefault();
      document.getElementById("button__ether").classList.add('button__cyrpto__unselected');
      document.getElementById("button__ether").classList.remove("button__cypto__selected");
      document.getElementById("button__bitcoin").classList.remove('button__cyrpto__unselected');
      document.getElementById("button__bitcoin").classList.add("button__cypto__selected");
      document.getElementById("amount_granted").value='';
      document.getElementById("amount_granted").placeholder='btc 0.000000';
    }
    handleEther(e) {
      e.preventDefault();
      document.getElementById("button__ether").classList.remove('button__cyrpto__unselected');
      document.getElementById("button__ether").classList.add("button__cypto__selected");
      document.getElementById("button__bitcoin").classList.add('button__cyrpto__unselected');
      document.getElementById("button__bitcoin").classList.remove("button__cypto__selected");
      document.getElementById("amount_granted").value='';
      document.getElementById("amount_granted").placeholder='ether 0.000000';
    }
    selectorChangeC() {
      const sourceCollateral = document.getElementById("source_collateral")
      var sourceCollateralValue = sourceCollateral.options[sourceCollateral.selectedIndex].value;
      if(sourceCollateralValue != "Select an option") { 
        document.getElementById("source_collateral_validation").innerHTML = '';
      }
        else {
          document.getElementById("source_collateral_validation").innerHTML = '<b><span class="required">*Please Select an Option</span></b>';
        }
    }
    selectorChangeI() {
      const intendedUse = document.getElementById("intended_use");
      var intendedUseValue = intendedUse.options[intendedUse.selectedIndex].value;
      if(intendedUseValue != "Select an option" ) {
        document.getElementById("source_collateral_validation").innerHTML = '';
      } 
        else {
          document.getElementById("intended_use_validation").innerHTML = '<b><span class="required">*Please Select an Option</span></b>'
        console.log(' intended usebad');
      } 
    }
    handleCalculate(e) {
      e.preventDefault();
      let enter_loan_amount = document.getElementById("enter_loan_amount").value.trim();
      
      const regexp = '^\d+(\.\d{1,2})?$';
      const rate = .35;
      enter_loan_amount = enter_loan_amount.replace(regexp,'');
      enter_loan_amount = parseFloat(enter_loan_amount).toFixed(2); //make loan amount .XX
      if (!validator.isDecimal(enter_loan_amount)) {
        document.getElementById("enter_loan_amount_validation").innerHTML = '<b><span class="required">*Please Enter a Number</span></b>';
        document.getElementById("amount_granted").setAttribute('currency', '');
      }
      else if(enter_loan_amount <  2000) {
        document.getElementById("enter_loan_amount_validation").innerHTML = '<b><span class="required">*Minimum Loan Amount $2000</span></b>';
        document.getElementById("amount_granted").setAttribute('currency', '');
      }
      else {
        console.log(enter_loan_amount);
        document.getElementById("enter_loan_amount").value= enter_loan_amount;
        document.getElementById("enter_loan_amount_validation").innerHTML = '';
        const collateral_needed = (parseFloat(enter_loan_amount) + parseFloat(enter_loan_amount * rate)).toFixed(2);
        const amount_granted = document.getElementById("amount_granted");   // Get the first <h1> element in the document
        //var att = document.createAttribute("currency");       // Create a "class" attribute
        //att.value = collateral_needed;
        amount_granted.setAttribute('currency', collateral_needed); 
        amount_granted.value = collateral_needed;
      } 
    }  
    handleStep2(e) {
      e.preventDefault();
      let cryptoCurrency = document.getElementsByClassName("button__cypto__selected")[0].id;
      const amount_granted = document.getElementById("amount_granted").getAttribute('currency');
      const loan_amount = document.getElementById("enter_loan_amount").value.trim();
      cryptoCurrency = cryptoCurrency.substr(8); //get crypto coin type - striping out the id
     
      if(amount_granted != null && amount_granted != "") { 
        console.log('good'); var amount_granted_pass = true;
      } else {
        console.log('null'); 
        document.getElementById("enter_loan_amount_validation").innerHTML = '<b><span class="required">*Please Enter a Number</span></b>';
        
      }
      
      const sourceCollateral = document.getElementById("source_collateral");
      var sourceCollateralValue = sourceCollateral.options[sourceCollateral.selectedIndex].value;
      if(sourceCollateralValue != "Select an option") { 
        console.log('good'); var sourceCollateralValueResult= true;
      }
        else {
          document.getElementById("source_collateral_validation").innerHTML = '<b><span class="required">*Please Select an Option</span></b>';
         console.log('bad');
        }
      const intendedUse = document.getElementById("intended_use");
      var intendedUseValue = intendedUse.options[intendedUse.selectedIndex].value;
      if(intendedUseValue != "Select an option" ) {
        console.log('intended use good'); var intendedUseValueResult = true;
      } 
        else {
          document.getElementById("intended_use_validation").innerHTML = '<b><span class="required">*Please Select an Option</span></b>'
        console.log(' intended usebad');
      } 
      
      if(amount_granted_pass && sourceCollateralValueResult && sourceCollateralValueResult) {
                localStorage.setItem('currency-type', cryptoCurrency);
                localStorage.setItem('loan-amount', loan_amount);
                localStorage.setItem('collateral', amount_granted);
                localStorage.setItem('source', sourceCollateralValue);
                localStorage.setItem('intended', intendedUseValue);
        
        this.props.next();
      }
    }
    render(props) {
        if (this.props.currentStep !== 2) {
          return null;
       } 
       
        return (
          <div>
          <h2 className="subheader">Start Your Loan Application!</h2>
          <div className="container">
          <form onSubmit={this.handleStep2}>
            <div className="row">
              <div className="add-option__div col-12 text-center">
                WHAT KIND OF CRYTOASSET WILL YOU USE AS COLLATERAL?
              </div>  
            </div>
                <div className="row">
                  <div className="col-12 col-sm-6">
                     <button onClick={this.handleBitcoin} className="button button__crypto button__cypto__selected" id="button__bitcoin"><FaBitcoin/>&nbsp;Bitcoin</button>  
                  </div>  
                  <div className="col-12 col-sm-6">
                        <button onClick={this.handleEther} className="button button__crypto button__cyrpto__unselected" id="button__ether"><FaEthereum />&nbsp;Ether</button>
                  </div>
                </div>

                <div className="row">
                    <div className="col-12 col-sm-6">
                      <p><b>Loan Amount</b></p>
                        <input className="add-option__input" type="text" name="enter_loan_amount" id="enter_loan_amount" placeholder="$ Enter Loan Amount"/>
                        <label id="enter_loan_amount_validation"></label>
                    </div>
                    
                    <div className="col-12 col-sm-6">
                      <p><b>Collateral Needed</b></p>
                      <input className="add-option__input" type="text" name="amount_granted" id="amount_granted" currency="" placeholder="btc 0.000000" disabled/>
                      <p>Collateral amount based on 35% LTV</p>
                    </div>
                  </div>
                  <div className="row">
                      <div className="col-12 ">
                      <button className="button" onClick={this.handleCalculate}>Calculate</button>  
                      </div>
                  </div>
                
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <p><b>What is the source of your collateral</b></p>
                    <select id="source_collateral" onChange={this.selectorChangeC}>
                      <option value="Select an option">Select an option</option>
                      <option value="Purchased from income from job">Purchased from income from job</option>
                      <option value="Business Revenue">Business Revenue</option>
                      <option value="Personal Savings">Personal Savings</option>
                      <option value="Cypto Mining">Cypto Mining</option>
                      <option value="Company ICO">Company ICO</option>
                      <option value="Other">Other</option>
                    </select>
                    <p id="source_collateral_validation">&nbsp;</p>
                  </div> 
                  <div className="col-12 col-sm-6">
                    <p><b>What is the intended use of this form</b></p>
                    <select id="intended_use">
                      <option value="Select an option">Select an option</option>
                      <option value="Purchase Real Estate">Purchase Real Estate</option>
                      <option value="Purchase Traditional Investments">Purchase Traditional Investments</option>
                      <option value="Purchase More Crytoassets">Purchase More Crytoassets</option>
                      <option value="Start a Business">Start a Business</option>
                      <option value="Pay Down Debt">Pay Down Debt</option>
                      <option value="General Expense">General Expense</option>
                      <option value="Other">Other</option>
                    </select>
                    <p id="intended_use_validation">&nbsp;</p>
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