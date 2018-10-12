import React from 'react';

const Header = (props) => (
    <div className="header">
        <div className="header__container">
            <h1 className="header__title">{props.title}</h1>
           
        </div>
</div>
);

Header.defaultProps = {
    title: 'ProFormance'
}

export default Header;