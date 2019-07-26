import React from 'react'
import uuid from 'uuid'
import Checkbox from "../../../controls/checkbox";

// so if u click on a checkbox, they all sets to checked. because this logic binded to row not to each checkbox respectively

const DistributionTableRow = (props) => {
    const {
        id,
        style,
        nomenclature_group,
        shell_fabric_1,
        color,
        gender,
        age,
        country
    } = props.product;

    return (
        <>
            <div className='data-table__row'>
                <div className="data-table__column -flex-grow-1">{style}</div>
                <div className="data-table__column -flex-grow-1">{nomenclature_group}</div>
                <div className="data-table__column -flex-grow-1">{shell_fabric_1}</div>
                <div className="data-table__column -flex-grow-1">{color}</div>
                <div className="data-table__column -flex-grow-1">{gender}</div>
                <div className="data-table__column -flex-grow-1">{age}</div>
                <div className="data-table__column -flex-grow-1">{country}</div>

                {props.addedSuppliers.length ? props.addedSuppliers.map(as =>
                    <div className="data-table__column -flex-grow-1" key={uuid()}>
                        <Checkbox
                            name={`addSupplier_${as.supplier.id}_ToProduct_${id}`}
                            onChange={({stateChecked}) => {
                                if (!stateChecked) props.checkboxHandler.add({product: id, supplier: as.supplier.id})
                                if (stateChecked) props.checkboxHandler.remove({product: id, supplier: as.supplier.id})
                            }}
                            checked={props.distributed.has(as.supplier.id)}/>
                    </div>
                ) : <div className="data-table__column -flex-grow-1">No supplier added yet!</div>}
            </div>
        </>
    );
};

export default DistributionTableRow;