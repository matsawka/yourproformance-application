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
        currentStep: 1,
        currentData: [],
        uniqueId: ''
      };
      
      this.next = this.next.bind(this);
      this.prev = this.prev.bind(this);
      this.handleForm = this.handleForm.bind(this);
      this.handleId = this.handleId.bind(this);
    }
    handleForm(formData) {
      let currentData = this.state.currentData;
      formData.forEach(function(element) {
        currentData.push(element);
      });
      this.setState({
        currentData: currentData
      });
    }
    handleId(uniqueId) {
      this.setState({
        uniqueId: uniqueId
      });
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
                <Step1 
                  currentStep={this.state.currentStep} 
                  next={this.next} 
                  handleForm={this.handleForm} 
                />
                <Step2 
                  currentStep={this.state.currentStep} 
                  next={this.next} 
                  handleForm={this.handleForm} 
                />
                <Step3 
                  currentStep={this.state.currentStep} 
                  next={this.next} 
                  handleId={this.handleId}
                  currentData={this.state.currentData} 
                />
                <Step4 
                  currentStep={this.state.currentStep} 
                  currentData={this.state.currentData} 
                  uniqueId={this.state.uniqueId} />
        </div>
      );
    }
   }