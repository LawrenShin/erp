import React from 'react'
import Checkbox from '../../controls/checkbox'
import uuid from 'uuid'

const QuotationTableHeader = (props) => {
    return (
        <>
            {props.checkboxHandler && <div className="data-table__column data-table__column--checkbox hidden -flex-grow-0" key={uuid()}>
                <Checkbox
                    name='addProduct_all'
                    onChange={() => props.checkboxHandler('all')}
                    checked={false}/>
            </div>}
            {props.heads.map((head) =>
                <div className="data-table__column -flex-grow-1" key={head}>
                    {head}
                </div>
            )}
        </>
    );
};

export default QuotationTableHeader;