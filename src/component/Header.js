import React from 'react';

const Header = (props) => (
    <div className="header">
        <div className="header__container">
            <a href="https://www.yourproformance.com/" target="_blank"><img src="/images/logo.png"/></a>
        </div>
</div>
);

Header.defaultProps = {
    title: 'ProFormance'
}

export default Header;