import React from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Header from '../component/Header';
import BasicWizard from '../component/BasicWizard';
import Terms from '../component/Terms';
import NotFoundPage from '../component/NotFoundPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route path="/" component={BasicWizard} exact={true}/>
                <Route path="/terms-and-conditions" component={Terms} exact={true}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </BrowserRouter>
);


export default AppRouter;