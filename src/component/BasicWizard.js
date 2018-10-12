import React from 'react';
import Header from './Header';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';



export default class BasicWizard extends React.Component {
    constructor(props) {
        super(props);
      this.state = {
        currentStep: 1
      };
      
      this.next = this.next.bind(this);
      this.prev = this.prev.bind(this);
    }
    
    next() {
      let currentStep = this.state.currentStep;
      // Make sure currentStep is set to something reasonable
      if (currentStep >= 3) {
        currentStep = 4;
      } else {
        currentStep = currentStep + 1;
      }
      
      this.setState({
        currentStep: currentStep
      });
    }
     
    prev() {
      let currentStep = this.state.currentStep;
      if (currentStep <= 1) {
        currentStep = 1;
      } else {
        currentStep = currentStep - 1;
      }
      
      this.setState({
        currentStep: currentStep
      });
    }
    
    render() {
        return (
            <div>
                <Header/>
                <Step1 currentStep={this.state.currentStep} next={this.next}/>
                <Step2 currentStep={this.state.currentStep} next={this.next}/>
                <Step3 currentStep={this.state.currentStep} next={this.next}/>
                <Step4 currentStep={this.state.currentStep}/>
        </div>
      );
    }
   }