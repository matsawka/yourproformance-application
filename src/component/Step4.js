import React from 'react'
import moment from 'moment';
import { IoIosPrint } from 'react-icons/io';




export default class Step4 extends React.Component {
    constructor(props) {
        super(props);
    }
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
                        <p>We've recieved your loan application</p>
                        <p>We've reviewing your application at the moment, and will have an update within one business day.</p>
                        <p>Have any questions?</p>
                        <p>Email us at: <a href="mailto:someone@example.com?Subject=Hello%20again" target="_top">Send Mail</a></p>
                        <a className="social__print" href="javascript:window.print()">
                            <IoIosPrint/>
                        </a>
                     </div> 
                     <div className="col-12 col-sm-6">
                      <div className="box">
                            <b>Loan Amount</b><br/>
                            <i><span id="loanAmount">${this.props.currentData[7]}</span></i>
                      </div>
                      <div className="box">
                            <b>Collateral Amount</b><br/>
                            <i><span id="currencyType">{this.props.currentData[6]}</span>: <span id="collateralAmount">{this.props.currentData[8]}</span></i>
                      </div>
                      <b>Submitted:</b><br/><i>{moment().format('MMMM Do YYYY, h:mm a')}</i><br/>
                      <b>Loan Request ID:</b><br/><i>{this.props.uniqueId}</i>
                    
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

