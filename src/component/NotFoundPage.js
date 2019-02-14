import React from 'react';
import {Link} from 'react-router-dom';


const NotFoundPage = () => {
    return (
            <div>
            <h2 className="subheader">404 - Page Not Found</h2>
            <div className="container text-center">
                <b>You must have hit this page by mistake<br/><br/>Please return back to your <Link to="/">loan application</Link></b>
        </div>
        </div>
        );
    
    }
 
 export default NotFoundPage;