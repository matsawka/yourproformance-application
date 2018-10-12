import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './component/IndecisionApp';

const Layout = (props) => {
 return (
    <div>
        <p>header</p>
        {props.children}
        <p>footer</p>
    </div>
 );
}
const template = (
    <div>
        <h1>Page Title</h1>
        <p>Thsi is my page</p>
    </div>
);
ReactDOM.render((
    <Layout>
    <h1>Page Title</h1>
        <p>Thsi is my page</p>
        <p>this is inline</p>
    </Layout>
    ), document.getElementById('app'));

