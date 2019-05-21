import React from 'react';

const QuotationItemEmptyStatic = (props) => {
    return (
        <>
            <div className="quotation-item__empty">
                <h1>No Products or Suppliers has been selected</h1>
                <p>Please select products &amp; suppliers to start quotation</p>
            </div>
        </>
    );
};

export default QuotationItemEmptyStatic;