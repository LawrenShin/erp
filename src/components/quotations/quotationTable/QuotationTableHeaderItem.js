import React from 'react'
import { Popup } from 'semantic-ui-react'
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
                <Popup
                    key={uuid()}
                    content={as.supplier.name}
                    position='bottom center'
                    trigger={<div className="data-table__column -flex-grow-1">{as.supplier.id}</div>}>
                </Popup>
            )}

            {props.techDocs ? <div className="data-table__column -flex-grow-1"></div> : ''}
            {props.buttonRemind ? <div className="data-table__column -flex-grow-1" style={{ minWidth: '250px' }}></div> : ''}
            {props.enter_price ? <div className="data-table__column -flex-grow-1" style={{ minWidth: '420px' }}></div> : ''}
        </>
    );
};

export default QuotationTableHeaderItem;