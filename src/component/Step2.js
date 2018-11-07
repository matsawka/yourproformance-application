import React from 'react';
import validator from 'validator';
import { FaEthereum } from 'react-icons/fa';
import { FaBitcoin } from 'react-icons/fa';
import numeral from 'numeral';

export default class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.handleBitcoin = this.handleBitcoin.bind(this);
        this.handleEther = this.handleEther.bind(this);
        this.getAPR = this.getAPR.bind(this);
        this.handleCalculate = this.handleCalculate.bind(this);
        this.handleStep2 = this.handleStep2.bind(this);
        this.selectorChangeC = this.selectorChangeC.bind(this);
        this.selectorChangeI = this.selectorChangeI.bind(this);
        this.getbitCoinValue = this.getbitCoinValue.bind(this);
        this.state = {  
          currencyType: 'bitcoin',
        };
    }
    getbitCoinValue(){
        let request = new XMLHttpRequest();
        request.open('GET', 'https://api.coinmarketcap.com/v2/ticker/1/', true);
        request.onload = function () {
          // Begin accessing JSON data here
          let data = JSON.parse(this.response);    
          if (request.status >= 200 && request.status < 400) {
            let bitCoinPrice =  data.data.quotes.USD.price.toFixed(2);
            bitCoinPrice = numeral(bitCoinPrice).format('0,0.00');
            document.getElementById("bitCoinHolder").innerHTML = bitCoinPrice;
            
          } else {
            console.log('error');
          }
        }
        request.send();
        
      }
      getEtherValue(){
        let request = new XMLHttpRequest();
        request.open('GET', 'https://api.coinmarketcap.com/v2/ticker/1027/', true);
        request.onload = function () {
          // Begin accessing JSON data here
          let data = JSON.parse(this.response);    
          if (request.status >= 200 && request.status < 400) {
            let etherPrice =  data.data.quotes.USD.price.toFixed(2);
            etherPrice = numeral(etherPrice).format('0,0.00');
            document.getElementById("etherHolder").innerHTML = etherPrice;
          } else {
            console.log('error');
          }
        }
        request.send();
        
      }
    getAPR(loanAmount, LTV) {
      const myLoanAmount = loanAmount;
      const myLTV = LTV;
      switch(true) {
        case (myLoanAmount <= 10000 && myLTV == .15):
          return '12.75';
          break;
        case (myLoanAmount <= 10000 && LTV == .25):
          return '14.00';
          break; 
        case (myLoanAmount <= 10000 && LTV == .35):
          return '15.50';
          break;
        case (myLoanAmount <= 10000 && LTV == .50):
          return '17.00';
          break; 
        case (myLoanAmount <= 25000 && LTV == .15):
          return '12.25';
          break;
        case (myLoanAmount <= 25000 && LTV == .25):
          return '13.50';
          break;
        case (myLoanAmount <= 25000 && LTV == .35):
          return '15.00';
          break;
        case (myLoanAmount <= 25000 && LTV == .50):
          return '16.50';
          break;
        case (myLoanAmount <= 50000 && LTV == .15):
          return '10.75';
          break;
        case (myLoanAmount <= 50000 && LTV == .25):
          return '12.00';
          break;
        case (myLoanAmount <= 50000 && LTV == .35):
          return '13.50';
          break;
        case (myLoanAmount <= 50000 && LTV == .50):
          return '15.00';
          break;
        case (myLoanAmount > 50000 && LTV == .15):
          return '10.00';
          break;
        case (myLoanAmount > 50000 && LTV == .25):
          return '11.25';
          break;
        case (myLoanAmount > 50000 && LTV == .35):
          return '12.75';
          break;
        case (myLoanAmount > 50000 && LTV == .50):
          return '14.25';
          break;
      }
    }
    handleBitcoin(e) {
      e.preventDefault();
      this.setState({
        currencyType: 'bitcoin'
      });
      document.getElementById("button__ether").classList.add('button__cyrpto__unselected');
      document.getElementById("button__ether").classList.remove("button__cypto__selected");
      document.getElementById("button__bitcoin").classList.remove('button__cyrpto__unselected');
      document.getElementById("button__bitcoin").classList.add("button__cypto__selected");
      document.getElementById("amount_granted").value='';
      document.getElementById("amount_granted").placeholder='0.00000';
    }
    handleEther(e) {
      e.preventDefault();
      this.setState({
        currencyType: 'ether'
      });
      document.getElementById("button__ether").classList.remove('button__cyrpto__unselected');
      document.getElementById("button__ether").classList.add("button__cypto__selected");
      document.getElementById("button__bitcoin").classList.add('button__cyrpto__unselected');
      document.getElementById("button__bitcoin").classList.remove("button__cypto__selected");
      document.getElementById("amount_granted").value='';
      document.getElementById("amount_granted").placeholder='0.00000';
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
        document.getElementById("intended_use_validation").innerHTML = '';
      } 
        else {
          document.getElementById("intended_use_validation").innerHTML = '<b><span class="required">*Please Select an Option</span></b>'
      } 
    }
    handleCalculate(e) {
      e.preventDefault();
      let loanAmount = document.getElementById("enter_loan_amount").value.trim();
      const regexp = '^\d+(\.\d{1,2})?$';
      loanAmount = loanAmount.replace(regexp,'');
      loanAmount = loanAmount.replace(/[,]+/g, ""); //remove commas
      loanAmount = parseFloat(loanAmount).toFixed(2); //make loan amount .XX
      
      const loan_to_value = document.getElementById("loan_to_value")
      let LTV = loan_to_value.options[loan_to_value.selectedIndex].value;
      
      let etherPrice = document.getElementById("etherHolder").innerHTML;
      etherPrice = parseFloat(etherPrice.replace(/,/g, ''))
      let bitCoinPrice = document.getElementById("bitCoinHolder").innerHTML;
      bitCoinPrice = parseFloat(bitCoinPrice.replace(/,/g, ''))

      if (!validator.isDecimal(loanAmount)) {
        document.getElementById("enter_loan_amount_validation").innerHTML = '<b><span class="required">*Please Enter a Number</span></b>';
        document.getElementById("amount_granted").setAttribute('currency', '');
      }
      else if(loanAmount <  2000) {
        document.getElementById("enter_loan_amount_validation").innerHTML = '<b><span class="required">*Minimum Loan Amount $2000</span></b>';
        document.getElementById("amount_granted").setAttribute('currency', '');
      }
      else {
        document.getElementById("enter_loan_amount").value= numeral(loanAmount).format('0,0.00');
        document.getElementById("enter_loan_amount_validation").innerHTML = '';
        
        const c = (1/LTV) * loanAmount;
        let currencyType = this.state.currencyType;
        if(currencyType == "bitcoin") {
          var amountGranted = c /bitCoinPrice;
          currencyType = "btc";
        }
        else if(currencyType == "ether") {
          var amountGranted = c /etherPrice;
        }
        else {
          console.log('error in calculation');
        }
        const amount_granted = document.getElementById("amount_granted");   // Get the first <h1> element in the document
        amount_granted.setAttribute('currency', amountGranted); 
        let amountValueDisplay = numeral(amountGranted).format('0,0.00000');
        amount_granted.value = amountValueDisplay;
        //GET APR RATE
        const APR = this.getAPR(loanAmount, LTV); 
        document.getElementById("apr_rate").innerHTML = APR + "%";
        //Monthly PAYMENT
        const monthlyPayment = APR/1200 * loanAmount;
        document.getElementById("monthly_payment").innerHTML = "$" + numeral(monthlyPayment).format('0,0.00');
        //Total Interest
        const totalInterest = APR/100 * loanAmount * 5;
        document.getElementById("total_interest").innerHTML = "$" + numeral(totalInterest).format('0,0.00');
      } 
    }  
    handleStep2(e) {
      e.preventDefault();
      let cryptoCurrency = document.getElementsByClassName("button__cypto__selected")[0].id;
      let amount_granted = document.getElementById("amount_granted").getAttribute('currency');
      let loan_amount = document.getElementById("enter_loan_amount").value.trim();
      loan_amount = numeral(loan_amount).format('0,0.00');
      cryptoCurrency = cryptoCurrency.substr(8); //get crypto coin type - striping out the id
      let LTV = loan_to_value.options[loan_to_value.selectedIndex].value;

      if(amount_granted != null && amount_granted != "") { 
        var amount_granted_pass = true;
        amount_granted = numeral(amount_granted).format('0,0.00');
      } else {
        document.getElementById("enter_loan_amount_validation").innerHTML = '<b><span class="required">*Please Enter a Number</span></b>';
      }
      const sourceCollateral = document.getElementById("source_collateral");
      var sourceCollateralValue = sourceCollateral.options[sourceCollateral.selectedIndex].value;
      if(sourceCollateralValue != "Select an option") { 
        var sourceCollateralValueResult= true;
      }
        else {
          document.getElementById("source_collateral_validation").innerHTML = '<b><span class="required">*Please Select an Option</span></b>';
        }
      const intendedUse = document.getElementById("intended_use");
      var intendedUseValue = intendedUse.options[intendedUse.selectedIndex].value;
      if(intendedUseValue != "Select an option" ) {
        var intendedUseValueResult = true;
      } 
        else {
          document.getElementById("intended_use_validation").innerHTML = '<b><span class="required">*Please Select an Option</span></b>'
      } 
      const APR = document.getElementById("apr_rate").innerHTML;
      const monthlyPayment = document.getElementById("monthly_payment").innerHTML;
      const totalInterest = document.getElementById("total_interest").innerHTML;
      const marginCall = document.getElementById("margin_call").innerHTML;
      if(amount_granted_pass && sourceCollateralValueResult && sourceCollateralValueResult && intendedUseValueResult) {

        let step2Array = [cryptoCurrency, loan_amount, amount_granted, LTV, sourceCollateralValue, intendedUseValue, APR, monthlyPayment, totalInterest, marginCall];
        this.props.handleForm(step2Array);
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
            <div className="row">
              <div className="col-12 col-sm-6">
                  <div className="box">
                        <b>Bitcoin Price:</b> $<span id="bitCoinHolder">{this.getbitCoinValue()}</span> USD
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="box">
                        <b>Ethereum Price:</b> $<span id="etherHolder">{this.getEtherValue()}</span> USD
                  </div>
                </div>
            </div>
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
                        <button onClick={this.handleEther} className="button button__crypto button__cyrpto__unselected" id="button__ether"><FaEthereum />&nbsp;Ethereum</button>
                  </div>
                </div>

                <div className="row">
                    <div className="col-12 col-sm-6">
                      <p><b>Loan Amount (USD)</b></p>
                        <input className="add-option__input" type="text" name="enter_loan_amount" id="enter_loan_amount" placeholder="$ Enter Loan Amount"/>
                        <label id="enter_loan_amount_validation"></label>
                    </div>
                    
                    <div className="col-12 col-sm-6">
                      <p><b>Collateral Needed</b></p>
                      <input className="add-option__input" type="text" name="amount_granted" id="amount_granted" currency="" placeholder="0.00000" disabled/>
                    </div>
                  
                      <div className="col-12 col-sm-6">
                      <p><b>Loan to Value</b></p>
                      <select id="loan_to_value">
                          <option value=".15">15%</option>
                          <option value=".25">25%</option>
                          <option value=".35">35%</option>
                          <option value=".50">50%</option>
                        </select>
                        <label id="loan_to_value_validation"></label>
                      </div>
                    </div>
                  <div className="row">
                      <div className="col-12 ">
                      <button className="button" onClick={this.handleCalculate}>Calculate</button>  
                      </div>
                  </div>
                  <div className="row display-flex">
                      <div className="col-12 col-sm-3">
                        <div className="box payments">
                        <p>Monthly Payment</p>
                        <div id="monthly_payment">&nbsp;</div>
                        </div> 
                      </div>
                      <div className="col-12 col-sm-3">
                        <div className="box payments">
                        <p>Total Interest</p>
                        <div id="total_interest">&nbsp;</div>
                        </div> 
                      </div>
                      <div className="col-12 col-sm-3">
                        <div className="box payments">
                        <p>APR*</p>
                        <div id="apr_rate">&nbsp;</div>
                        </div> 
                      </div>
                      <div className="col-12 col-sm-3">
                        <div className="box payments">
                        <p>Margin Call Price</p>
                        <div id="margin_call">&nbsp;</div>
                        </div> 
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
                    <label id="source_collateral_validation">&nbsp;</label>
                  </div> 
                  <div className="col-12 col-sm-6">
                    <p><b>What is the intended use of this form</b></p>
                    <select id="intended_use" onChange={this.selectorChangeI}>
                      <option value="Select an option">Select an option</option>
                      <option value="Purchase Real Estate">Purchase Real Estate</option>
                      <option value="Purchase Traditional Investments">Purchase Traditional Investments</option>
                      <option value="Purchase More Crytoassets">Purchase More Crytoassets</option>
                      <option value="Start a Business">Start a Business</option>
                      <option value="Pay Down Debt">Pay Down Debt</option>
                      <option value="General Expense">General Expense</option>
                      <option value="Other">Other</option>
                    </select>
                    
                    <label id="intended_use_validation">&nbsp;</label>
                  </div>  
                </div>
                <button className="button">Continue</button>
              </form>  
              <p className="smalltext">*All loans are variable rate at Prime + Spread. APR shown reflects Prime at 5.25%. See <a href="" target="_blank">Terms and Conditions</a> for further details.</p>
            </div>
          </div>
        );
    }
}