import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Checkbox from '../../controls/checkbox'
import uuid from 'uuid'
import ReactCountryFlag from 'react-country-flag';

const QuotationTableRow = (props) => {
    if(props.checkboxHandler){
        const wereAdded = props.added.filter(ap => {
            if(typeof ap === 'number'){ 
                return ap === props.id
            }else if('product' in ap){
                return ap.product === props.id
            }else if('supplier' in ap){
                return ap.supplier === props.id
            }
        })
        return (
            <div className="data-table__row">
                <div className="data-table__column -flex-grow-0 data-table__column--checkbox hidden -bg-color-bgGray" key={uuid()}>
                    <Checkbox 
                        name={`${props.checkboxNamePrefix}${props.id}`} 
                        onChange={() => {
                            if(!props.findMatch(props.id)) props.checkboxHandler.add(props.id)
                            if(props.findMatch(props.id)) props.checkboxHandler.remove(props.id)
                        }}
                        checked={ wereAdded.length ? true : false } /> 
                </div>
                { props.heads.map(h => {
                    const renamedProp = h.toLowerCase().replace(/ /g, '_')
                    return (<div 
                        className="data-table__column -flex-grow-1" 
                        key={uuid()}
                        onClick={() => {
                            if(!props.findMatch(props.id)) props.checkboxHandler.add(props.id)
                            if(props.findMatch(props.id)) props.checkboxHandler.remove(props.id)
                        }}>
                        {renamedProp === 'status' ? 
                            props.listItem[renamedProp] === 'AC' ? 
                                <div className="col-status col-status_active">{ props.listItem[renamedProp] }</div>
                            :
                                <div className="col-status col-status_inactive">{ props.listItem[renamedProp] }</div>
                        :
                        renamedProp === 'country' ? 
                            <ReactCountryFlag code={`${props.listItem.factory_country}`} />
                        :
                            props.listItem[renamedProp]
                        }
                    </div>)
                }) }
            </div>
        )
    }
    
    return (
        <>
        <NavLink to={`/quotations/${props.id}`}>
            <div className="data-table__row">
                {props.heads.map(h => <div className="data-table__column -flex-grow-1" key={uuid()}>
                    {props.listItem[h.toLowerCase().replace(/ /g, '_')]}
                </div>)}
            </div>
        </NavLink>
        </>
    );
}

export default QuotationTableRow;