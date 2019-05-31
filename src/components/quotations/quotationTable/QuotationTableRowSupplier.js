import React from 'react'
import {NavLink} from 'react-router-dom'
import Checkbox from '../../controls/checkbox'
import uuid from 'uuid'
import ReactCountryFlag from 'react-country-flag';
import CommonButton from '../../common/CommonButton'

const exception = ['target_price', 'enter_price'];

const QuotationTableRowSupplier = (props) => {
    if (props.button) {
        return (
            <>
                <div className="data-table__row">
                    {Object.keys(props).map(h => h == 'buttons' ?
                        <div className="data-table__column -flex-grow-1" key={uuid()} style={{minWidth: '250px'}}>
                            <div className="-flex">
                                <button className="btn btn2 -btn-with-wrap" type="button">Tech pack<br/>download
                                </button>
                                <button className="btn btn1 -btn-with-wrap" type="button">Decline</button>
                            </div>
                        </div> : <div className="data-table__column -flex-grow-1" key={uuid()}>
                            {props[h]}
                        </div>)}
                </div>
            </>
        );
    } else if (props.enter_price) {
        return (
            <>
                <div className="data-table__row">
                    {Object.keys(props).map(h => exception.indexOf(h) != '-1' ?
                        '' : <div className="data-table__column -flex-grow-1" key={uuid()}>{props[h]}</div>)}

                    <div className="data-table__column -flex-grow-1"><i className="icon-filters-2"></i></div>

                    {props.target_price ? <div className="data-table__column -text-color-green -flex-grow-1">{props.target_price}</div> : ''}

                    <div className="data-table__column -flex-grow-1">
                        <input type="text" name="price" style={{ maxWidth: '85%' }}/>
                    </div>

                    <div className="data-table__column -bg-color-green -text-color-white -flex-grow-1"><a>Technical Documents</a></div>

                    <div className="data-table__column -bg-color-bgGray -flex-grow-1" style={{ minWidth: '420px' }}>
                        <div className="options-buttons">
                            <CommonButton type='btn2' text='Send price'/>
                            <CommonButton type='btn2' text='Decline product'/>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="data-table__row">
                    {Object.keys(props).map(h => exception.indexOf(h) != '-1' ?
                        '' : <div className="data-table__column -flex-grow-1" key={uuid()}>{props[h]}</div>)}

                    <div className="data-table__column -flex-grow-1"><i className="icon-filters-2"></i></div>

                    {props.target_price ? <div className="data-table__column -text-color-green -flex-grow-1">{props.target_price}</div> : ''}

                    <div className="data-table__column -flex-grow-1">
                        <input type="text" name="price" style={{ maxWidth: '85%' }}/>
                    </div>

                </div>
            </>
        )
    }
}

export default QuotationTableRowSupplier;