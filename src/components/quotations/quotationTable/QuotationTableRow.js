import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Checkbox from '../../controls/checkbox'
import uuid from 'uuid'
import ReactCountryFlag from 'react-country-flag'

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

        const [check, setCheck] = useState(wereAdded.length ? true : false || false)

        return (
            <div className="data-table__row">
                <div className="data-table__column -flex-grow-0 data-table__column--checkbox hidden -bg-color-bgGray" key={uuid()}>
                    <Checkbox 
                        name={`${props.checkboxNamePrefix}${props.id}`}
                        onChange={() => {
                            setCheck(!check)
                            if(!props.findMatch(props.id)) props.checkboxHandler.add(props.id)
                            if(props.findMatch(props.id)) props.checkboxHandler.remove(props.id)
                        }}
                        checked={ check } />
                </div>
                { props.heads.map(h => {
                    const renamedProp = h.toLowerCase().replace(/ /g, '_')
                    return (<div 
                        className="data-table__column -flex-grow-1" 
                        key={uuid()}
                        onClick={() => {
                            setCheck(!check)
                            if(!props.findMatch(props.id)) props.checkboxHandler.add(props.id)
                            if(props.findMatch(props.id)) props.checkboxHandler.remove(props.id)
                        }}>
                        {renamedProp === 'status' ? 
                            props.listItem[renamedProp] === 'AC' ? 
                                <div className="col-status col-status_active">{ props.listItem[renamedProp] }</div>
                            :
                                <div className="col-status col-status_inactive">{ props.listItem[renamedProp] }</div>
                        :
                        (renamedProp === 'country' && props.listItem.legal_country) ? 
                            <ReactCountryFlag code={ props.listItem.legal_country.iso } />
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