import React from 'react';
import {Link} from 'react-router-dom';


export default class NotFoundPage extends React.Component {
    constructor(props) {
        super(props);
    }   
    render() {
        return (
            <div>
            <h2 className="subheader">404 - Page Not Found</h2>
            <div className="container text-center">
                <b>You must have hit this page by mistake<br/><br/>Please return back to your <Link to="/">loan application</Link></b>
        </div>
        </div>
      );
    }
   }