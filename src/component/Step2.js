import "babel-polyfill";
import React from "react";
import validator from "validator";
import { FaEthereum } from "react-icons/fa";
import { FaBitcoin } from "react-icons/fa";
import numeral from "numeral";
import { Link } from "react-router-dom";
import axios from "axios";
import cheerio from "cheerio";

const addtlAPRFee = 0.45;

export default class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.handleBitcoin = this.handleBitcoin.bind(this);
    this.handleEther = this.handleEther.bind(this);
    this.getRates = this.getRates.bind(this);
    this.getPrimeRate = this.getPrimeRate.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.handleStep2 = this.handleStep2.bind(this);
    this.selectorChangeC = this.selectorChangeC.bind(this);
    this.selectorChangeI = this.selectorChangeI.bind(this);
    this.getbitCoinValue = this.getbitCoinValue.bind(this);
    this.clearBoxes = this.clearBoxes.bind(this);
    this.checkEscrow = this.checkEscrow.bind(this);
    this.state = {
      currencyType: "bitcoin",
      margin: "",
      rate: "",
      primeRate: "",
      APR: ""
    };
  }
  getbitCoinValue() {
    let request = new XMLHttpRequest();
    request.open(
      "GET",
      "https://api.coinbase.com/v2/prices/BTC-USD/spot?currency=USD",
      true
    );
    request.onload = function() {
      // Begin accessing JSON data here
      let data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
        let bitCoinPrice = data.data.amount;
        document.getElementById("bitCoinHolder").innerHTML = bitCoinPrice;
      } else {
        console.log("error");
      }
    };
    request.send();
  }
  getEtherValue() {
    let request = new XMLHttpRequest();
    request.open(
      "GET",
      "https://api.coinbase.com/v2/prices/ETH-USD/spot?currency=USD",
      true
    );
    request.onload = function() {
      // Begin accessing JSON data here
      let data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
        let etherPrice = data.data.amount;
        document.getElementById("etherHolder").innerHTML = etherPrice;
      } else {
        console.log("error");
      }
    };
    request.send();
  }

  getPrimeRate() {
    let htmlData = axios.get(
      "https://www.bankrate.com/rates/interest-rates/wall-street-prime-rate.aspx"
    );

    var request = new XMLHttpRequest();
    request.open(
      "GET",
      "https://www.bankrate.com/rates/interest-rates/wall-street-prime-rate.aspx",
      false
    ); // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {
      console.log(request.responseText);
    }

    console.log("htmlData.data", request.responseText);
    const h = cheerio.load(request.responseText);
    console.log("h", h);
    let primert = h(
      "div.editorial.--push-down > main > div.story__content > table > tbody > tr > td:nth-child(2)"
    ).text();
    console.log("primert3:", primert);
    return Number(primert);
  }

  getRates(loanAmount, LTV) {
    const myLoanAmount = loanAmount;
    const myLTV = LTV;
    const baseSpread = 4.5;

    const primeRate = this.getPrimeRate(); // right now its 5.5, need to get dynamically!!

    console.log("primeRate:::", primeRate);
    let rate = baseSpread + primeRate;

    // For APR, please use the rates you are using, but can you add (0.45%) to each value, and amend the footnote to say, "This is a variable interest rate loan and the APR shown above is estimated. APR may range from 10% to 18% and will change depending on a number of factors. Please see the loan agreement for the actual APR."

    // For the financing charge, please add to the calculation $200 plus (Loan Amount/LTV x 0.30%)

    // Print rate plus base spread times lev
    let riskSpreadInterest = 0;
    switch (true) {
      case myLoanAmount <= 10000 && myLTV == 0.15:
        riskSpreadInterest = 2.75;
        break;
      case myLoanAmount <= 10000 && LTV == 0.25:
        riskSpreadInterest = 4.0;
        break;
      case myLoanAmount <= 10000 && LTV == 0.35:
        riskSpreadInterest = 5.5;
        break;
      case myLoanAmount <= 10000 && LTV == 0.5:
        riskSpreadInterest = 7.0;
        break;
      case myLoanAmount <= 25000 && LTV == 0.15:
        riskSpreadInterest = 2.25;
        break;
      case myLoanAmount <= 25000 && LTV == 0.25:
        riskSpreadInterest = 3.5;
        break;
      case myLoanAmount <= 25000 && LTV == 0.35:
        riskSpreadInterest = 5.0;
        break;
      case myLoanAmount <= 25000 && LTV == 0.5:
        riskSpreadInterest = 6.5;
        break;
      case myLoanAmount <= 50000 && LTV == 0.15:
        riskSpreadInterest = 0.75;
        break;
      case myLoanAmount <= 50000 && LTV == 0.25:
        riskSpreadInterest = 2.0;
        break;
      case myLoanAmount <= 50000 && LTV == 0.35:
        riskSpreadInterest = 3.5;
        break;
      case myLoanAmount <= 50000 && LTV == 0.5:
        riskSpreadInterest = 5.0;
        break;
      case myLoanAmount > 50000 && LTV == 0.15:
        riskSpreadInterest = 0;
        break;
      case myLoanAmount > 50000 && LTV == 0.25:
        riskSpreadInterest = 1.25;
        break;
      case myLoanAmount > 50000 && LTV == 0.35:
        riskSpreadInterest = 2.75;
        break;
      case myLoanAmount > 50000 && LTV == 0.5:
        riskSpreadInterest = 4.25;
        break;
    }
    console.log("APR", APR, " riskSpreadInterest", riskSpreadInterest);
    rate = rate + riskSpreadInterest;

    const margin = baseSpread + riskSpreadInterest;

    const APR = rate + addtlAPRFee;

    console.log(`primeRate: ${primeRate}`);
    console.log(`rate: ${rate}`);
    console.log(`margin: ${margin}`);
    console.log(`APR: ${APR}`);
    this.setState({
      margin: margin,
      rate: rate,
      primeRate: primeRate,
      APR: APR
    });

    return { rate, APR, primeRate, margin };
  }

  handleBitcoin(e) {
    e.preventDefault();
    this.setState({
      currencyType: "bitcoin"
    });
    document
      .getElementById("button__ether")
      .classList.add("button__cyrpto__unselected");
    document
      .getElementById("button__ether")
      .classList.remove("button__crypto__selected");
    document
      .getElementById("button__bitcoin")
      .classList.remove("button__cyrpto__unselected");
    document
      .getElementById("button__bitcoin")
      .classList.add("button__crypto__selected");
    document.getElementById("amount_granted").value = "";
    document.getElementById("amount_granted").placeholder = "0.00000";
    this.clearBoxes();
  }
  handleEther(e) {
    e.preventDefault();
    this.setState({
      currencyType: "ether"
    });
    document
      .getElementById("button__ether")
      .classList.remove("button__cyrpto__unselected");
    document
      .getElementById("button__ether")
      .classList.add("button__crypto__selected");
    document
      .getElementById("button__bitcoin")
      .classList.add("button__cyrpto__unselected");
    document
      .getElementById("button__bitcoin")
      .classList.remove("button__crypto__selected");
    document.getElementById("amount_granted").value = "";
    document.getElementById("amount_granted").placeholder = "0.00000";
    this.clearBoxes();
  }
  clearBoxes() {
    document.getElementById("apr_rate").innerHTML = "&nbsp;";
    document.getElementById("monthly_payment").innerHTML = "&nbsp;";
    document.getElementById("total_interest").innerHTML = "&nbsp;";
    document.getElementById("margin_call").innerHTML = "&nbsp;";
  }
  checkEscrow(loanAmount) {
    console.log("checkE");
    if (loanAmount >= 100000) {
      document.getElementById("escrowDiv").classList.add("displayBlock");
      document.getElementById("escrowDiv").classList.remove("displayNone");
    } else {
      document.getElementById("escrowDiv").classList.add("displayNone");
      document.getElementById("escrowDiv").classList.remove("displayBlock");
    }
  }
  selectorChangeC() {
    const sourceCollateral = document.getElementById("source_collateral");
    var sourceCollateralValue =
      sourceCollateral.options[sourceCollateral.selectedIndex].value;
    if (sourceCollateralValue != "Select an option") {
      document.getElementById("source_collateral_validation").innerHTML = "";
    } else {
      document.getElementById("source_collateral_validation").innerHTML =
        '<b><span class="required">*Please Select an Option</span></b>';
    }
  }
  selectorChangeI() {
    const intendedUse = document.getElementById("intended_use");
    var intendedUseValue = intendedUse.options[intendedUse.selectedIndex].value;
    if (intendedUseValue != "Select an option") {
      document.getElementById("intended_use_validation").innerHTML = "";
    } else {
      document.getElementById("intended_use_validation").innerHTML =
        '<b><span class="required">*Please Select an Option</span></b>';
    }
  }
  handleCalculate(e) {
    e.preventDefault();
    let loanAmount = document.getElementById("enter_loan_amount").value.trim();
    const regexp = "^d+(.d{1,2})?$";
    loanAmount = loanAmount.replace(regexp, "");
    loanAmount = loanAmount.replace(/[,]+/g, ""); //remove commas
    loanAmount = parseFloat(loanAmount).toFixed(2); //make loan amount .XX

    const loan_to_value = document.getElementById("loan_to_value");

    //must make decimal!
    let LTV = loan_to_value.options[loan_to_value.selectedIndex].value;

    let etherPrice = document.getElementById("etherHolder").innerHTML;
    etherPrice = parseFloat(etherPrice.replace(/,/g, ""));
    let bitCoinPrice = document.getElementById("bitCoinHolder").innerHTML;
    bitCoinPrice = parseFloat(bitCoinPrice.replace(/,/g, ""));
    // get escrow checkbox:
    this.checkEscrow(loanAmount);
    if (!validator.isDecimal(loanAmount)) {
      document.getElementById("enter_loan_amount_validation").innerHTML =
        '<b><span class="required">*Please Enter a Number</span></b>';
      document.getElementById("amount_granted").setAttribute("currency", "");
    } else if (loanAmount < 2000) {
      document.getElementById("enter_loan_amount_validation").innerHTML =
        '<b><span class="required">*Minimum Loan Amount $2000</span></b>';
      document.getElementById("amount_granted").setAttribute("currency", "");
    } else {
      document.getElementById("enter_loan_amount").value = numeral(
        loanAmount
      ).format("0,0.00");
      document.getElementById("enter_loan_amount_validation").innerHTML = "";
      console.log("LTV:", LTV);
      const collateralDollars = (1 / LTV) * loanAmount;
      console.log(
        "LTV",
        LTV,
        "loanAmount",
        loanAmount,
        "collateralDollars:",
        collateralDollars
      );

      var currencyType = this.state.currencyType;
      if (currencyType == "bitcoin") {
        var amountGranted = collateralDollars / bitCoinPrice;
        var marginCallCurrency = bitCoinPrice;
        currencyType = "btc";
      } else if (currencyType == "ether") {
        var amountGranted = collateralDollars / etherPrice;
        var marginCallCurrency = etherPrice;
      } else {
        console.log("error in calculation");
      }

      const amount_granted = document.getElementById("amount_granted"); // Get the first <h1> element in the document
      amount_granted.setAttribute("currency", amountGranted);
      let amountValueDisplay = numeral(amountGranted).format("0,0.00000");
      amount_granted.value = amountValueDisplay;

      //GET APR RATE
      const rates = this.getRates(loanAmount, LTV);
      const rate = rates.rate;
      const APR = rates.APR;
      console.log("APR:", APR);
      document.getElementById("apr_rate").innerHTML = APR + "%";

      //Monthly PAYMENT
      const monthlyPayment = (rate / 1200) * loanAmount;
      document.getElementById("monthly_payment").innerHTML =
        "$" + numeral(monthlyPayment).format("0,0.00");

      //Total Interest
      // $200 plus (Loan Amount/LTV x 0.30%)
      const yearsOfLoan = 5;
      console.log(
        "loanAmount:",
        loanAmount,
        "rate",
        rate,
        "calc",
        rate / 100,
        "years",
        yearsOfLoan
      );
      let totalInterest = loanAmount * (rate / 100) * yearsOfLoan;

      //add in extra fees associated with loan. howard can breakdown formula, what is business name
      // for $200 fee?
      totalInterest = totalInterest + 200;

      //what is business name for additionalFee here?
      const collateralDispositionFee = collateralDollars * 0.003;
      totalInterest = totalInterest + collateralDispositionFee;

      document.getElementById("total_interest").innerHTML =
        "$" + numeral(totalInterest).format("0,0.00");
      //Margin Call

      const marginCall = loanAmount / 0.6 / amountGranted;
      document.getElementById("margin_call").innerHTML =
        "$" + numeral(marginCall).format("0,0.00");
    }
  }
  handleStep2(e) {
    e.preventDefault();
    let cryptoCurrency = document.getElementsByClassName(
      "button__crypto__selected"
    )[0].id;
    let amount_granted = document
      .getElementById("amount_granted")
      .getAttribute("currency");
    let loan_amount = document.getElementById("enter_loan_amount").value.trim();
    loan_amount = numeral(loan_amount).format("0,0.00");
    cryptoCurrency = cryptoCurrency.substr(8); //get crypto coin type - striping out the id
    let LTV = loan_to_value.options[loan_to_value.selectedIndex].value;

    if (amount_granted != null && amount_granted != "") {
      var amount_granted_pass = true;
      amount_granted = numeral(amount_granted).format("0,0.00");
    } else {
      document.getElementById("enter_loan_amount_validation").innerHTML =
        '<b><span class="required">*Please Enter a Number</span></b>';
    }
    const sourceCollateral = document.getElementById("source_collateral");
    var sourceCollateralValue =
      sourceCollateral.options[sourceCollateral.selectedIndex].value;
    if (sourceCollateralValue != "Select an option") {
      var sourceCollateralValueResult = true;
    } else {
      document.getElementById("source_collateral_validation").innerHTML =
        '<b><span class="required">*Please Select an Option</span></b>';
    }
    const intendedUse = document.getElementById("intended_use");
    var intendedUseValue = intendedUse.options[intendedUse.selectedIndex].value;
    if (intendedUseValue != "Select an option") {
      var intendedUseValueResult = true;
    } else {
      document.getElementById("intended_use_validation").innerHTML =
        '<b><span class="required">*Please Select an Option</span></b>';
    }
    //const APR = document.getElementById("apr_rate").innerHTML;
    //const APR = document.getElementById("apr_rate").innerHTML;
    let monthlyPayment = document.getElementById("monthly_payment").innerHTML;
    monthlyPayment = monthlyPayment.replace(/,/g, '');
    monthlyPayment = parseFloat(monthlyPayment.replace(/\$/g, ''));
    let totalInterest = document.getElementById("total_interest").innerHTML;
    totalInterest = totalInterest.replace(/,/g, '');
    totalInterest = parseFloat(totalInterest.replace(/\$/g, ''));
    let marginCall = document.getElementById("margin_call").innerHTML;
    marginCall = marginCall.replace(/,/g, '');
    marginCall = parseFloat(marginCall.replace(/\$/g, ''));
    loan_amount = loan_amount.replace(/,/g, '');
    loan_amount = parseFloat(loan_amount.replace(/\$/g, ''));
    const escrowValue = document.getElementById('escrowService').checked;
    amount_granted = amount_granted.replace(/,/g, '');
    amount_granted = parseFloat(amount_granted.replace(/\$/g, ''));
    console.log('amount_granted step2: ' + amount_granted);
    LTV = parseFloat(LTV);
    if (
      amount_granted_pass &&
      sourceCollateralValueResult &&
      sourceCollateralValueResult &&
      intendedUseValueResult
    ) {
      let step2Array = [
        cryptoCurrency,
        loan_amount,
        amount_granted,
        LTV,
        sourceCollateralValue,
        intendedUseValue,
        this.state.APR,
        monthlyPayment,
        totalInterest,
        marginCall,
        escrowValue,
        this.state.margin,
        this.state.rate,
        this.state.primeRate
      ];
      this.props.handleForm(step2Array);
      console.log(step2Array);
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
                <b>Bitcoin Price:</b> $
                <span id="bitCoinHolder">{this.getbitCoinValue()}</span> USD
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="box">
                <b>Ethereum Price:</b> $
                <span id="etherHolder">{this.getEtherValue()}</span> USD
              </div>
            </div>
          </div>
          <form onSubmit={this.handleStep2}>
            <div className="row">
              <div className="add-option__div col-12 text-center">
                WHAT KIND OF CRYPTOASSET WILL YOU USE AS COLLATERAL?
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6">
                <button
                  onClick={this.handleBitcoin}
                  className="button button__crypto button__crypto__selected"
                  id="button__bitcoin"
                >
                  <FaBitcoin />
                  &nbsp;Bitcoin
                </button>
              </div>
              <div className="col-12 col-sm-6">
                <button
                  onClick={this.handleEther}
                  className="button button__crypto button__cyrpto__unselected"
                  id="button__ether"
                >
                  <FaEthereum />
                  &nbsp;Ethereum
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-sm-6">
                <p>
                  <b>Loan Amount (USD)</b>
                </p>
                <input
                  className="add-option__input"
                  type="text"
                  name="enter_loan_amount"
                  id="enter_loan_amount"
                  placeholder="$ Enter Loan Amount"
                />
                <label id="enter_loan_amount_validation" />
              </div>

              <div className="col-12 col-sm-6">
                <p>
                  <b>Collateral Needed</b>
                </p>
                <input
                  className="add-option__input"
                  type="text"
                  name="amount_granted"
                  id="amount_granted"
                  currency=""
                  placeholder="0.00000"
                  disabled
                />
              </div>

              <div className="col-12 col-sm-6">
                <p>
                  <b>Loan to Value</b>
                </p>
                <select id="loan_to_value">
                  <option value=".15">15%</option>
                  <option value=".25">25%</option>
                  <option value=".35">35%</option>
                  <option value=".50">50%</option>
                </select>
                <label id="loan_to_value_validation" />
              </div>
              <div className="displayNone col-sm-6" id="escrowDiv">
                <label>
                  <input
                    type="checkbox"
                    id="escrowService"
                    name="escrowService"
                    value=""
                  />
                  &nbsp; Would you prefer escrow services?
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-12 ">
                <button className="button" onClick={this.handleCalculate}>
                  Calculate
                </button>
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
                  <p>Total Financing Charge</p>
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
                <p>
                  <b>What is the source of your collateral</b>
                </p>
                <select id="source_collateral" onChange={this.selectorChangeC}>
                  <option value="Select an option">Select an option</option>
                  <option value="Purchased from income from job">
                    Purchased from income from job
                  </option>
                  <option value="Business Revenue">Business Revenue</option>
                  <option value="Personal Savings">Personal Savings</option>
                  <option value="Crypto Mining">Crypto Mining</option>
                  <option value="Company ICO">Company ICO</option>
                  <option value="Other">Other</option>
                </select>
                <label id="source_collateral_validation">&nbsp;</label>
              </div>
              <div className="col-12 col-sm-6">
                <p>
                  <b>What is the intended use of this form</b>
                </p>
                <select id="intended_use" onChange={this.selectorChangeI}>
                  <option value="Select an option">Select an option</option>
                  <option value="Purchase Real Estate">
                    Purchase Real Estate
                  </option>
                  <option value="Purchase Traditional Investments">
                    Purchase Traditional Investments
                  </option>
                  <option value="Purchase More Cryptoassets">
                    Purchase More Cryptoassets
                  </option>
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
          <p className="smalltext">
            *All loans are variable rate at Prime + Spread. APR shown reflects
            Prime at 5.25%. See{" "}
            <Link to="/terms-and-conditions" target="_blank">
              Terms &amp; Conditions
            </Link>{" "}
            for further details. This is a variable interest rate loan and the
            APR shown above is estimated. APR may range from 10% to 18% and will
            change depending on a number of factors. Please see the loan
            agreement for the actual APR.
          </p>
        </div>
      </div>
    );
  }
}
