import React from 'react'
import moment from 'moment';
import numeral from 'numeral';



export default class Step4 extends React.Component {
    constructor(props) {
        super(props);
        
       
    }
    componentDidMount() {
        this.componentDidUpdate()
        console.log('did mount 4');
    }
      componentDidUpdate() {
          console.log(localStorage);
        if (this.props.currentStep === 4) {
            if (localStorage.getItem("firstname") !== null) {
                const ls_firstname = localStorage.getItem("firstname");
                document.getElementById("firstName").innerHTML = ls_firstname;
            };
            if (localStorage.getItem("loan-amount") !== null) {
                const ls_loanAmount = localStorage.getItem("loan-amount");
                document.getElementById("loanAmount").innerHTML = numeral(ls_loanAmount).format('$0,0.00');
            };
            if (localStorage.getItem("collateral") !== null) {
                const ls_collateralAmount = localStorage.getItem("collateral");
                document.getElementById("collateralAmount").innerHTML = numeral(ls_collateralAmount).format('0,0.00');
            };
            if (localStorage.getItem("currency-type") !== null) {
                const ls_currencyType = localStorage.getItem("currency-type");
                document.getElementById("currencyType").innerHTML = ls_currencyType;
            };
        }
      }
    render(props) {
      if (this.props.currentStep !== 4) {
        return null;
     } 
     
      return (
        <div>
          <h2 className="subheader">Success!!!</h2>
          <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <h2 id="firstName"></h2>
                        <p>We've recieved your loan application</p>
                        <p>We've reviewing your application at the moment, and will have an update within one business day.</p>
                        <p>Have any questions?</p>
                        <p>Email us at: <a href="mailto:someone@example.com?Subject=Hello%20again" target="_top">Send Mail</a></p>
                     </div> 
                     <div className="col-12 col-sm-6">
                      <div className="box">
                            <b>Loan Amount</b><br/>
                            <i><span id="loanAmount"></span></i>
                      </div>
                      <div className="box">
                            <b>COLLATERAL AMOUNT</b><br/>
                            <i><span id="currencyType"></span>: <span id="collateralAmount"></span></i>
                      </div>
                      Submitted: {moment().format('MMMM Do YYYY, h:mm a')}<br/>
                      {/*Loan ID: ID*/}
                    
                     </div>
                </div>
                <div className="row bottom-row">
                    <div className="col-12 text-center">
                    <a href="https://www.yourproformance.com/" target="_blank">Return to ProFormance</a>
                    </div>
                </div>
            </div>
        </div> 
      );
  }
}

