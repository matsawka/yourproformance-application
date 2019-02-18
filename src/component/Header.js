import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import { IoIosMail } from 'react-icons/io';

const Header = (props) => (
    <div className="row header">
        <div className="container header__container">
            <div className="row">
                <div className="col-sm-8 col-12">
                    <a href="https://www.yourproformance.com/" target="_blank"><img src="/images/logo.png"/></a>
                </div>
                <div className="header__social col-sm-4">
                    <a className="social__email" href="mailto:info@yourproformance.com?subject=Questions about YourFormance Loan"><IoIosMail/></a>
                    {/*<a className="social__email" href=""><IoIosSend/></a>*/}
                    <a className="social__linkedin" href="https://www.linkedin.com/company/residualtoken/"><FaLinkedin/></a>
                    <a className="social__twitter" href="http://twitter.com/residualtokens"><FaTwitter/></a>
                </div>
            </div>
        </div>
</div>
);

Header.defaultProps = {
    title: 'ProFormance'
}

export default Header;
