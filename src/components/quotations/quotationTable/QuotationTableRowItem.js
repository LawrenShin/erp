import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import uuid from 'uuid'
import className from 'classnames'
import CommentManager from '../comments/manager/CommentManager'
import {NavLink} from 'react-router-dom'

const Empty = () => <div className="data-table__column sc-gzVnrw zZjqK -bg-color-bgGray -flex-grow-1"
                         style={{width: 70}}></div>;
const Waiting = () => <div className="data-table__column sc-gzVnrw zZjqK -flex-grow-1" style={{width: 70}}><i
    className="icon-waiting -text-color-yellow"></i></div>;
const Paused = ({price}) => <div className={`data-table__column sc-gzVnrw zZjqK -flex-grow-1`}
                                 style={{width: 70, cursor: 'pointer'}}>${price}</div>;
const Price = ({price, targetPrice, isSelected, distributionId, selectSupplier, status}) => {
    const [bg, setBg] = useState(isSelected ? '-bg-color-blue' : '');
    return (<div
        className={`${bg} data-table__column sc-gzVnrw zZjqK -flex-grow-1 ${isSelected ? null : +price < +targetPrice ? '-text-color-blue' : null} ${status === true && isSelected ? '-bg-color-green -text-color-white' : ''}`}
        style={{width: 70, cursor: 'pointer'}}
        onClick={() => {
            selectSupplier(distributionId)
        }}>
        {status === true && <div>Request samples accepted</div>}
        ${price}
    </div>)
};
const Declined = () => <div className="data-table__column sc-gzVnrw zZjqK -flex-grow-1" style={{width: 70}}><i
    className="icon-decline -text-color-gray"></i></div>;

const PauseProductComponent = ({productId, pause, paused}) => {
    const handlePause = () => pause(productId)
    return (<>
        <button onClick={handlePause}>
            {paused ? <i className="icon-play-button"></i> : <i className="icon-pause-circular-button"></i>}
        </button>
    </>)
};

const QuotationTableRowItem = (props) => {
    const techPackLink = `${process.env.REACT_APP_HOST}/${props.uid_1c}.zip`;
    const [display, setDisplay] = useState('none');
    const createMapOverview = () => props.addedSuppliers.map(as => {
        const relation = props.distributedRelations.filter(dr => dr.supplier === as.supplier_id)[0];
        if (relation) return {...relation}
    });

    const techPack = () => {
        const techPackAvailable = props.productRelations.filter(tp => tp.product === props.id)[0];
        if (techPackAvailable) return techPackAvailable.get_is_available_download_tech_files;
    };

    return (
        <>
            <div
                className={className('data-table__row', {'-paused-row': props.paused}, {'-hover-none-row': props.status === true})}>
                {props.control ? <div className="data-table__column -bg-color-blue -text-color-white -flex-grow-0"
                                      style={{maxWidth: '65px'}}>
                        <PauseProductComponent
                            productId={props.id}
                            pause={props.pause}
                            paused={props.paused}/>
                    </div>
                    :
                    null}

                <div className="data-table__column -flex-grow-1">
                    <NavLink to={`/products/view/${props.id}`}>{props.style}</NavLink>
                </div>

                <div className="data-table__column -flex-grow-1">{props.nomenclature_group}</div>
                <div className="data-table__column -flex-grow-1">{props.shell_fabric_1}</div>
                <div className="data-table__column -flex-grow-1">{props.color}</div>
                <div className="data-table__column -flex-grow-1">{props.target_price}</div>
                <div className="data-table__column -flex-grow-1 -cursor-pointer"
                     onClick={() => setDisplay(display === 'none' ? 'block' : 'none')}>
                    <i className="icon-filters-2"></i>
                </div>

                {
                    (props.addedSuppliers.length) ?
                        createMapOverview().map(o => {
                            const key = uuid();
                            if (o) {
                                const status = props.sample.filter(rc => rc.supplier === o.supplier)[0];
                                if (o.is_cancel) return <Declined key={key}/>;
                                if (!o.current_price) return <Waiting key={key}/>;
                                if (props.paused) return <Paused price={o.current_price}/>;
                                if (!!o.current_price) return <Price
                                    key={key}
                                    status={status ? status.samples_accept : false}
                                    isSelected={o.is_selected}
                                    price={o.current_price}
                                    targetPrice={props.target_price}
                                    distributionId={o.id}
                                    selectSupplier={props.selectSupplier}/>
                            }
                            return <Empty key={key}/>
                        })
                        :
                        <div className="data-table__column -flex-grow-1">No supplier added yet!</div>
                }

                <div className={`data-table__column -flex-grow-1 -none-hover-row-decline -text-color-white ${techPack() ? '-bg-color-green' : '-bg-color-gray hover-none'}`}>
                    <a target='_blank' rel='noopener noreferrer'
                       href={techPackLink}>
                        {techPack() ? 'Download technical documents from' : 'Please upload all tech files for product'}
                    </a>
                </div>
            </div>
            <CommentManager
                side='manager'
                display={display}
                distributionId={props.id}/>
        </>
    );
};

export default connect(undefined, dispatch => ({
    pause: (payload) => dispatch({type: 'PAUSE_PRODUCT', payload}),
    selectSupplier: (payload) => dispatch({type: 'SELECT_SUPPLIER', payload}),
}))(QuotationTableRowItem)