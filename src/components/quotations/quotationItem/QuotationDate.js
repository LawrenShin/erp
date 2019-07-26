import React from 'react';
import moment from 'moment'

const QuotationDate = (props) => {
    let { date } = props
    return (
        <>
           <p><b>{props.text}</b>{date}</p>
        </>
    );
};

export default QuotationDate;