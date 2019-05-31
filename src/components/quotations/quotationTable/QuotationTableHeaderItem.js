import React from 'react'
import uuid from 'uuid'

const QuotationTableHeaderItem = (props) => {
    return (
        <>
            {props.control ? <div className="data-table__column -flex-grow-0" style={{ maxWidth: '65px' }}></div> : ''}
            {props.heads.map((head) =>
                <div className="data-table__column -flex-grow-1" key={uuid()}>
                    {head}
                </div>
            )}
            {props.addedSuppliers && props.addedSuppliers.map(as => 
                <div className="data-table__column -flex-grow-1" key={uuid()}>
                    {as.supplier}
                </div>
            )}
            {props.buttonRemind ? <div className="data-table__column -flex-grow-1" style={{ minWidth: '250px' }}></div> : ''}
            {props.enter_price ? <div className="data-table__column -flex-grow-1" style={{ minWidth: '420px' }}></div> : ''}
        </>
    );
};

export default QuotationTableHeaderItem;