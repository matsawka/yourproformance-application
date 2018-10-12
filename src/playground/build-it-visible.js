class VisibiltyToggle extends React.Component {
    constructor(props) {
        super(props);
        this.showDetails = this.showDetails.bind(this);
        this.state = {
            visibilty : false
        };
    }
    showDetails() {
        this.setState((prevState) => {
           return {
                visibilty : !prevState.visibilty
            };
        });
    }
    render() {
       return (
           <div>
                <h1>Visible Toogle!</h1>
                <button onClick={this.showDetails}>{this.state.visibilty ? 'Hide Details' : 'Show Details'}</button>
                {this.state.visibilty && (<p>this is my text details</p>)}
            </div>
       )
    }
}
ReactDOM.render(<VisibiltyToggle/>, document.getElementById('app'));

/*let visibilty = false;

const showDetails = () => {
    visibilty =!visibilty;
    render();
    
};

const render = () => {
    const template = (
        <div>
            <h1>Visible Toggle</h1>
            <button onClick={showDetails}>{visibilty ? 'Hide Details' : 'Show Details'}</button>
            {visibilty ? '' : <p>this is my text</p>} //or this way
            {visibilty && (<p>this is my text details</p>)}
        </div>
    );
    ReactDOM.render(template,document.getElementById('app'));
};


render();*/