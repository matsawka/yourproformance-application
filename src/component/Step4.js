import React from 'react'
import moment from 'moment';
import { IoIosPrint } from 'react-icons/io';
import numeral from "numeral";

export default class Step4 extends React.Component {
    constructor(props) {
        super(props);
    }
    //let loan_amount = numeral(this.props.currentData[9]).format("0,0.00");
    render(props) {
      if (this.props.currentStep !== 4) {
        return null;
     } 
      return (
        <div>
          <h2 className="subheader">Your Application Has Been Successfully Submitted</h2>
          <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <h2 id="firstName">{this.props.currentData[0]}</h2>
                        <p>We have received your loan application</p>
                        <p>We are reviewing your application at the moment, and will have an update within one business day.</p>
                        <p>Have any questions? <a href="mailto:someone@example.com?Subject=Hello%20again" target="_top">Email us </a></p>
                        <a className="social__print" href="javascript:window.print()">
                            <IoIosPrint/>
                        </a>
                     </div> 
                     <div className="col-12 col-sm-6">
                      <div className="box">
                            <b>Loan Amount</b><br/>
                            <i><span id="loanAmount">
                            ${numeral(this.props.currentData[9]).format("0,0.00")}
                            </span></i>
                      </div>
                      <div className="box">
                            <b>Collateral Amount</b><br/>
                            <i><span id="currencyType">{this.props.currentData[8]}</span>: <span id="collateralAmount">{numeral(this.props.currentData[10]).format("0,0.00000")}</span></i>
                      </div>
                      <b>Submitted:</b><br/><i>{moment().format('MMMM Do YYYY, h:mm a')}</i><br/>
                      <b>Loan Request ID:</b><br/><i>{this.props.uniqueId}</i>
                    
                     </div>
                </div>
                <div className="row bottom-row">
                    <div className="col-12 text-center">
                    <a href="https://www.yourproformance.com/">Return to ProFormance</a>
                    </div>
                </div>
            </div>
        </div> 
      );
  }
}



