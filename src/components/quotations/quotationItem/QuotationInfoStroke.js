import React from 'react';
import className from 'classnames';

const QuotationInfoStroke = (props) => {
    return (
        <>
            <p  className={ className('-fix-width', {'-disabled': props.disabled }, {'-blue': !props.disabled }) }>{props.count} {props.text}</p>
        </>
    );
};

export default QuotationInfoStroke;