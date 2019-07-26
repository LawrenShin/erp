import React, { useState } from 'react'
import uuid from 'uuid'
import CommonButton from '../../common/CommonButton'
import CommentManager from '../comments/manager/CommentManager'

const exception = [ 'name', 'price', 'pause', 'matchedComments', 'isSamplesRequested', 'requestedChangesCount', 'targetPrice', 'enterPrice', 'id', 'declineProduct', 'sendPrice', 'productItem', 'button', 'declineProduct', 'product_item_id', 'downloadTechPack', 'shell_fabric_1', 'get_is_available_download_tech_files', 'is_selected'];

const QuotationTableRowSupplier = (props) => {
    const [price, setPrice] = useState(props.price || '')
    const [display, setDisplay] = useState('none')

    if (props.button) {
        return (
            <div className={`data-table__row ${props.pause ? '-paused-row' : ''}`}>
                {Object.keys(props).map(productProp => (exception.indexOf(productProp) === -1) ? 
                    <div className="data-table__column -flex-grow-1" key={uuid()}>
                        {props[productProp]}
                    </div>
                :
                    null
                )}
                <div className="data-table__column -flex-grow-1" key={uuid()} style={{minWidth: '250px'}}>
                    <div className="-flex">
                        {props.pause ? <div  target='_blank' rel='noopener noreferrer' 
                            className="btn btn2 -btn-with-wrap">Tech pack<br/>download
                        </div>
                            : 
                        <a  target='_blank' rel='noopener noreferrer'
                            href={props.get_is_available_download_tech_files ? `${process.env.REACT_APP_HOST}/${props.uid_1c}.zip` : ''}
                            className={`btn btn2 -btn-with-wrap ${props.get_is_available_download_tech_files ? '' : 'hover-none -bg-color-gray -border-color-gray'}`}>Tech pack<br/>download
                        </a>}
                        <button className="btn btn1 -btn-with-wrap" type="button"
                            disabled={props.pause}
                            onClick={() => props.declineProduct(props.id)}>Decline</button>
                    </div>
                </div>
            </div>
        );
    } else if (props.enterPrice && !props.isSamplesRequested) {
        return (
            <>
                <div className={`data-table__row ${props.pause ? '-paused-row' : ''}`}>
                    {Object.keys(props).map(h => exception.indexOf(h) != '-1' ?
                        '' : <div className="data-table__column -flex-grow-1" key={uuid()}>{props[h]}</div>)}

                    <div className="data-table__column -flex-grow-1"
                        onClick={ () => props.requestedChangesCount ? setDisplay(display === 'none' ? 'block' : 'none') : null }>
                            <div className='-position-relative'>
                                <i className={`icon-filters-2 ${props.requestedChangesCount ? '-text-color-blue' : ''}`}></i>
                                {props.requestedChangesCount && <span className="header-notifications__badge -bg-color-red">{props.requestedChangesCount}</span>}
                            </div>
                    </div>

                    {/* {props.targetPrice ? <div className="data-table__column -text-color-green -flex-grow-1">{props.targetPrice}</div> : ''} */}

                    <div className="data-table__column -flex-grow-1">
                        <input
                            disabled={props.pause}
                            placeholder='$0'
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            className={props.price !== null ? 'hover-none' : ''}
                            type="text" name="price" style={{ maxWidth: '85%' }}/>
                    </div>

                    <div className={`data-table__column -text-color-white -flex-grow-1 ${props.get_is_available_download_tech_files ? '-bg-color-green' : '-bg-color-gray hover-none'}`}>
                        <a target='_blank' rel='noopener noreferrer'
                            href={props.get_is_available_download_tech_files ? `${process.env.REACT_APP_HOST}/${props.uid_1c}.zip` : ''}>
                                Technical Documents
                        </a>
                    </div>

                    <div className="data-table__column -bg-color-bgGray -flex-grow-1" style={{ minWidth: '420px' }}>
                        <div className="options-buttons">
                            <CommonButton
                                disabled={(display === 'block' || props.pause) ? true : false}
                                onClick={() => +price > 0 ? props.sendPrice({ price, distributionId: props.id }) : setPrice('Invalid price')}
                                 type='btn2' text={`Send price`} />
                            <CommonButton
                                disabled={props.pause}
                                onClick={() => props.declineProduct(props.id)}
                                 type='btn2' text='Decline product'/>
                        </div>
                    </div>
                </div>
                {!props.pause && <CommentManager 
                    sendPrice={props.sendPrice}
                    side='supplier'
                    product_item={props.productItem}
                    display={display}
                    distributionId={props.id} />}
            </>
        )
    } else {
        const propsRequestedSamples = props.isSamplesRequested ? [props.name, props.nomenclatureGroup, props.shellFabric, props.color, props.requestedChangesCount, props.price] : null
        return (
            <>
                <div className="data-table__row">
                    {propsRequestedSamples && propsRequestedSamples.map((prop, i) => {
                        if(i === 4) return (
                            <div className="data-table__column -flex-grow-1"
                                onClick={ () => prop ? setDisplay(display === 'none' ? 'block' : 'none') : null }>
                                    <div className='-position-relative'>
                                        <i className={`icon-filters-2 ${prop ? '-text-color-blue' : ''}`}></i>
                                        {prop && <span className="header-notifications__badge -bg-color-red">{prop}</span>}
                                    </div>
                            </div>
                        )
                        // if (i === 5) return <div className="data-table__column -text-color-green -flex-grow-1">{`$${+prop ? prop : 0}`}</div>

                        if (i === 5) return <div className="data-table__column -flex-grow-1"><input disabled value={`$${+prop ? prop : 0}`} type="text" name="price" style={{ maxWidth: '85%' }}/></div>

                        return <div className="data-table__column -flex-grow-1" key={uuid()}>{prop}</div>
                    })}
                    
                    {!propsRequestedSamples && Object.keys(props).map(h => exception.indexOf(h) != '-1' ?
                        '' : <div className="data-table__column -flex-grow-1" key={uuid()}>{props[h]}</div>)}

                    {!propsRequestedSamples && <div className="data-table__column -flex-grow-1">
                        <i className={`icon-filters-2 ${props.requestedChangesCount ? '-text-color-blue' : ''}`}></i>
                    </div>}

                    {/* {(props.targetPrice && propsRequestedSamples) ? <div className="data-table__column -text-color-green -flex-grow-1">{props.targetPrice}</div> : ''} */}

                    {!propsRequestedSamples && <div className="data-table__column -flex-grow-1">
                        <input type="text" name="price" style={{ maxWidth: '85%' }}/>
                    </div>}

                    <div className="data-table__column -bg-color-bgGray -flex-grow-1" style={{ minWidth: '420px' }}></div>

                </div>
            </>
        )
    }
}

export default QuotationTableRowSupplier;