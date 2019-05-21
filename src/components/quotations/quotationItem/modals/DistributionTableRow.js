import React from 'react'
import uuid from 'uuid'
import className from 'classnames';
import Checkbox from "../../../controls/checkbox";

const DistributionTableRow = (props) => {
    const {
      id,
      name,
      group,
      shell_fabric,
      color,
      gender,
      age,
      country
    } = props.product
    return (
        <>
          <div className='data-table__row'>
          <div className="data-table__column -flex-grow-1">{name}</div>
          <div className="data-table__column -flex-grow-1">{group}</div>
          <div className="data-table__column -flex-grow-1">{shell_fabric}</div>
          <div className="data-table__column -flex-grow-1">{color}</div>
          <div className="data-table__column -flex-grow-1">{gender}</div>
          <div className="data-table__column -flex-grow-1">{age}</div>
          <div className="data-table__column -flex-grow-1">{country}</div>

          {props.addedSuppliers && props.addedSuppliers.map(as => 
            <div className="data-table__column -flex-grow-1" key={uuid()}>
              <Checkbox
                name={`addSupplier_${as.supplier}_ToProduct_${id}`}
                onChange={() => {
                  if(!props.findMatch(id))  props.checkboxHandler.add({ product: id, supplier: as.supplier })
                  if(props.findMatch(id))  props.checkboxHandler.remove({ product: id, supplier: as.supplier })
                }}
                checked={props.findMatch(id)} />
            </div>
          )}
          </div>
        </>
    );
};

export default DistributionTableRow;

{/* <div className="data-table__column -flex-grow-1">No supplier added yet!</div> */}