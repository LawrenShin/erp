import React, { useState } from 'react'
import uuid from 'uuid'
import CommonButton from '../../common/CommonButton'
import CommentManager from '../comments/manager/CommentManager'

const exception = ['price', 'matchedComments', 'requestedChangesCount', 'target_price', 'enter_price', 'id', 'declineProduct', 'sendPrice'];

const QuotationTableRowSupplier = (props) => {
    const [price, setPrice] = useState(props.price || '')
    const [display, setDisplay] = useState('none')

    if (props.button) {
        return (
            <div className="data-table__row">
                {Object.keys(props).map(productProp => (
                    productProp !== 'button' && 
                    productProp !== 'id' && 
                    productProp !== 'declineProduct' && 
                    productProp !== 'downloadTechPack') ? <div className="data-table__column -flex-grow-1" key={uuid()}>
                    {props[productProp]}
                </div>
                    :
                    null
                )}
                
                <div className="data-table__column -flex-grow-1" key={uuid()} style={{minWidth: '250px'}}>
                    <div className="-flex">
                        <a  target='_blank' rel='noopener noreferrer'
                            href={`http://beta.neurodynamics.info/${props.uid_1c}.zip`}
                            className="btn btn2 -btn-with-wrap">Tech pack<br/>download
                        </a>
                        <button className="btn btn1 -btn-with-wrap" type="button"
                            onClick={() => props.declineProduct(props.id)}>Decline</button>
                    </div>
                </div>
            </div>
        );
    } else if (props.enter_price) {
        return (
            <>
                <div className="data-table__row">
                    {Object.keys(props).map(h => exception.indexOf(h) != '-1' ?
                        '' : <div className="data-table__column -flex-grow-1" key={uuid()}>{props[h]}</div>)}

                    <div className="data-table__column -flex-grow-1"
                        onClick={ () => props.requestedChangesCount ? setDisplay(display === 'none' ? 'block' : 'none') : null }>
                            <div className='-position-relative'>
                                <i className={`icon-filters-2 ${props.requestedChangesCount ? '-text-color-blue' : ''}`}></i>
                                {props.requestedChangesCount && <span className="header-notifications__badge -bg-color-red">{props.requestedChangesCount}</span>}
                            </div>
                    </div>

                    {props.target_price ? <div className="data-table__column -text-color-green -flex-grow-1">{props.target_price}</div> : ''}

                    <div className="data-table__column -flex-grow-1">
                        <input
                            placeholder='$0'
                            onChange={(e) => setPrice(e.target.value)}
                            value={price} 
                            type="text" name="price" style={{ maxWidth: '85%' }}/>
                    </div>

                    <div className="data-table__column -bg-color-green -text-color-white -flex-grow-1"><a>Technical Documents</a></div>

                    <div className="data-table__column -bg-color-bgGray -flex-grow-1" style={{ minWidth: '420px' }}>
                        <div className="options-buttons">
                            <CommonButton
                                disabled={display === 'block' ? true : false}
                                onClick={() => price ? props.sendPrice({ price, distributionId: props.id }) : setPrice('Price too low')}
                                 type='btn2' text='Send price'/>
                            <CommonButton
                                onClick={() => props.declineProduct(props.id)}
                                 type='btn2' text='Decline product'/>
                        </div>
                    </div>
                </div>
                <CommentManager 
                    sendPrice={props.sendPrice}
                    side='supplier'
                    product_item={props.product_item}
                    display={display}
                    distributionId={props.id} />
            </>
        )
    } else {
        return (
            <>
                <div className="data-table__row">
                    {Object.keys(props).map(h => exception.indexOf(h) != '-1' ?
                        '' : <div className="data-table__column -flex-grow-1" key={uuid()}>{props[h]}</div>)}

                    <div className="data-table__column -flex-grow-1">
                        <i className={`icon-filters-2 ${props.requestedChangesCount ? '-text-color-blue' : ''}`}></i>
                    </div>

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