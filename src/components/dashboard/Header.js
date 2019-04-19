import React from 'react';

const Header = (props) => {
  return (
    <div className="page-heading page-heading_dashboard">
      <div className="page-heading__title">
        <div className="page-heading__top">
          <h1 className="h1">{props.title}</h1>
        </div>
        <h2 className="page-subtitle">{props.subTitle}</h2>
      </div>
    </div>
  );
}
export default Header;