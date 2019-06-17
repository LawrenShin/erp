import React from 'react';

const ReconsiderPaymentTerms = ({ data }) => {
  return (<>
    <div className="info-msg">
      <div className="info-msg__icon-box">
        <div className="info-msg__icon">
          <i className="icon-warning"></i>
        </div>
      </div>
      <div className="info-msg__content">
        <div className="info-msg__head">
          <div className="info-msg__title">Please reconsider payment terms with</div>
        </div>
        {/*<div className="info-msg__text">{data[0].name}</div>*/}
      </div>
    </div>
    <div className="info-msg__content">
      <div className="info-msg__head">
        <div className="info-msg__title">Please reconsider payment terms with</div>
      </div>
      {(data && data.length) && <div className="info-msg__text">{data[0].name}</div>}
    </div>
  </>);
}
export default ReconsiderPaymentTerms;

// data null issa bug