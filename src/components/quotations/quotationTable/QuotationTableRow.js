import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Checkbox from '../../controls/checkbox'
import uuid from 'uuid'
import ReactCountryFlag from 'react-country-flag'

const QuotationTableRow = (props) => {
    if(props.checkboxHandler){
        const [check, setCheck] = useState(props.wereAdded ? true : false || false)

        return (
            <div className="data-table__row">
                <div className="data-table__column -flex-grow-0 data-table__column--checkbox hidden -bg-color-bgGray" key={uuid()}>
                    <Checkbox 
                        name={`${props.checkboxNamePrefix}${props.id}`}
                        onChange={() => {
                            if(!check) props.checkboxHandler.add(props.id)
                            if(check) props.checkboxHandler.remove(props.id)
                            setCheck(!check)
                        }}
                        checked={ check } />
                </div>
                { props.heads.map(h => {
                    const renamedProp = h.toLowerCase().replace(/ /g, '_')
                    return (<div 
                        className="data-table__column -flex-grow-1" 
                        key={uuid()}
                        onClick={() => {
                            if(!check) props.checkboxHandler.add(props.id)
                            if(check) props.checkboxHandler.remove(props.id)
                            setCheck(!check)
                        }}>
                        {renamedProp === 'status' ? 
                            props.listItem[renamedProp] === 'AC' ? 
                                <div className="col-status col-status_inactive">{ props.listItem[renamedProp] }</div>
                            :
                                <div className="col-status col-status_active">{ props.listItem[renamedProp] }</div>
                        :
                        (renamedProp === 'country' && props.listItem.legal_country) ? 
                            <ReactCountryFlag code={ props.listItem.legal_country.iso } />
                        :
                            props.listItem[renamedProp]
                        }
                    </div>)
                }) }
                {props.sample_status ?
                    <div className="data-table__column  sc-gzVnrw zZjqK hidden">
                        {/* Тут три состояния: Pending(-pending), In progress(-progress), Sent(-receive) */}
                        <div className="quotation__status -progress">In progress</div>
                    </div> : '' }
            </div>
        )
    }
    
    return (
        <>
        <NavLink to={`/quotations/${props.id}${props.decision ? `/${props.decision}` : ''}`}>
            <div className="data-table__row">
                {props.heads.map(h => {
                    if(h === 'Name' && 'quotation_name' in props.listItem){
                        return(<div className="data-table__column -flex-grow-1" key={uuid()}>
                            {props.listItem.quotation_name}
                        </div>)
                    }
                    if(h === 'Collection' && 'collection_name' in props.listItem){
                        return(<div className="data-table__column -flex-grow-1" key={uuid()}>
                            {props.listItem.collection_name}
                        </div>)
                    }

                    return(<div className="data-table__column -flex-grow-1" key={uuid()}>
                        {props.listItem[h.toLowerCase().replace(/ /g, '_')]}
                    </div>)
                })}
            </div>
        </NavLink>
        </>
    );
}



export default QuotationTableRow;