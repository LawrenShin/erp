import React from 'react';
import moment from 'moment'

const QuotationDate = (props) => {
    let { date } = props
    date = moment(date).format('DD.MM.YYYY')
    return (
        <>
           <p><b>{props.text}</b>{date}</p>
        </>
    );
};

export default QuotationDate;