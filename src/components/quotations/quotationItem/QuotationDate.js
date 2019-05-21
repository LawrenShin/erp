import React from 'react';

const QuotationDate = (props) => {
    return (
        <>
           <p><b>{props.text}</b> {props.date}</p>
        </>
    );
};

export default QuotationDate;