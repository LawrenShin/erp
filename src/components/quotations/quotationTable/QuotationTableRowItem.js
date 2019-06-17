import React, { useState } from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid'
import className from 'classnames'
import CommentManager from '../comments/manager/CommentManager'

const Empty = () => <div className="data-table__column sc-gzVnrw zZjqK -bg-color-bgGray -flex-grow-1" style={{width: 70}}></div>
const Selected = ({ price }) => <div className="data-table__column sc-gzVnrw zZjqK -bg-color-blue -flex-grow-1" style={{width: 70}}>${price}</div>
const Waiting = () => <div className="data-table__column sc-gzVnrw zZjqK -flex-grow-1" style={{width: 70}}><i className="icon-waiting -text-color-yellow"></i></div>
const Price = ({ price, targetPrice }) => <div className={`data-table__column sc-gzVnrw zZjqK -flex-grow-1 ${+price < +targetPrice ? '-text-color-blue' : null}`} style={{width: 70}}>${price}</div>
const Declined = () => <div className="data-table__column sc-gzVnrw zZjqK -flex-grow-1" style={{width: 70}}><i className="icon-decline -text-color-gray"></i></div>

const PauseProductComponent = ({ productId, pause, paused }) => {
    const handlePause = () => pause(productId)
    return(<>
        <button onClick={handlePause}>
            {paused ? <i className="icon-play-button"></i> : <i className="icon-pause-circular-button"></i>}
        </button> 
    </>)
}

const QuotationTableRowItem = (props) => {
    const [display, setDisplay] = useState('none')
    const createMapOverview = () => props.addedSuppliers.map( as => {
            const relation = props.distributedRelations.filter( dr => dr.supplier === as.supplier_id )[0]
            if(relation) return { ...relation }
        })

    return (
        <>
            <div className={className('data-table__row', {'-paused-row': props.paused})} >
                {props.control ? <div className="data-table__column -bg-color-blue -text-color-white -flex-grow-0" style={{maxWidth: '65px'}}>
                    <PauseProductComponent 
                        productId={props.id}
                        pause={props.pause}
                        paused={props.paused} />
                </div> 
                    :
                null}

                <div className="data-table__column -flex-grow-1">
                    {props.style}
                </div>

                <div className="data-table__column -flex-grow-1">{props.nomenclature_group}</div>
                <div className="data-table__column -flex-grow-1">{props.shell_fabric_1}</div>
                <div className="data-table__column -flex-grow-1">{props.color}</div>
                <div className="data-table__column -flex-grow-1">{props.target_price}</div>
                <div className="data-table__column -flex-grow-1 -cursor-pointer" 
                    onClick={ () => setDisplay(display === 'none' ? 'block' : 'none') }>
                        <i className="icon-filters-2"></i>
                </div>

                {
                    (props.addedSuppliers.length) ? 
                        createMapOverview().map(o => {
                            const key = uuid()
                            if(o){
                                if(o.is_cancel) return <Declined key={key} />
                                if(!o.current_price) return <Waiting key={key} />
                                if(o.is_selected && !!o.current_price) return <Selected key={key} price={o.current_price} />
                                if(!!o.current_price) return <Price key={key} price={o.current_price} targetPrice={props.target_price} />
                            }
                            return <Empty key={key} />
                        })
                    :
                        <div className="data-table__column -flex-grow-1">No supplier added yet!</div>
                }

                <div className="data-table__column -flex-grow-1 -bg-color-green -text-color-white">
                    <a href={props.technical_documents}>Technical Documents</a>
                </div>
            </div>
            <CommentManager 
                side='manager'
                display={display}
                distributionId={props.id} />
        </>
    );
};

export default connect(undefined, dispatch => ({
    pause: (payload) => dispatch({ type: 'PAUSE_PRODUCT', payload }),
}))(QuotationTableRowItem)