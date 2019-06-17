import React from 'react'
import uuid from 'uuid'
import className from 'classnames';
import Checkbox from "../../controls/checkbox";

const QuotationTableRowModal = (props) => {
    const confirmStatus = (status) => status === 'accepted'
    return (
        <>
            <div className={className('data-table__row', {'-paused-row': props.paused})}>
                {props.control ? <div className="data-table__column -bg-color-blue -text-color-white -flex-grow-0"
                                      style={{maxWidth: '65px'}}>
                    <button>{props.paused ? <i className="icon-play-button"></i> :
                        <i className="icon-pause-circular-button"></i>}</button>
                </div> : null}

                {props.invitation_status ? <div
                    className={className('data-table__column', ' -flex-grow-0', 'hidden', '-text-color-white', {'-bg-color-green': confirmStatus(props.invitation_status)}, {'-bg-color-yellow': !confirmStatus(props.invitation_status)})}>{confirmStatus(props.invitation_status) ? 'Confirmed' : 'Awaiting Response'}</div> : null}
                {props.show_id ? <div className="data-table__column -flex-grow-1">{props.id}</div> : null}

                {props.date ? <div className="data-table__column -flex-grow-1">{props.date}</div> : null}

                <div className="data-table__column -flex-grow-1">{props.style_name}</div>

                {'status' in props ? <div className="data-table__column -flex-grow-1">{props.status}</div> : null}

                {'nomenclature_group' in props ? <div className="data-table__column -flex-grow-1">{props.nomenclature_group}</div> : null}
                {'product_group' in props ? <div className="data-table__column -flex-grow-1">{props.product_group}</div> : null}

                {'shell_fabric_1' in props ? <div className="data-table__column -flex-grow-1">{props.shell_fabric_1}</div> : null}

                {'color' in props ? <div className="data-table__column -flex-grow-1">{props.color}</div> : null}

                {'target_price' in props ? <div className="data-table__column -flex-grow-1">{props.target_price}</div> : null}

                {'change_request' in props ?
                    <div className="data-table__column -flex-grow-1"><i className="icon-filters-2"></i></div> : null}

                {'gender' in props ? <div className="data-table__column -flex-grow-1">{props.gender}</div> : null}

                {'age' in props ? <div className="data-table__column -flex-grow-1">{props.age}</div> : null}

                {'country' in props ? <div className="data-table__column -flex-grow-1">{props.country}</div> : null}

                {!props.invitationModal ? props.suppliers ? <div className="data-table__column -flex-grow-1"><Checkbox
                        name={`addProduct_${props.id}`}
                        onChange={() => props.checkboxHandler(props.id)}
                        checked={false}/></div> :
                    <div className="data-table__column -flex-grow-1">No supplier added yet!</div>
                : null}

                {props.supplier ? <div className='data-table__column -flex-grow-1'>{props.supplier}</div> : ''}

                {'price' in props ? <div className="data-table__column -flex-grow-1">{props.price}</div> : null}
                {'description' in props ? <div className="data-table__column -flex-grow-1">{props.description}</div> : null}

                {'technical_documents' in props ?
                    <div className="data-table__column -flex-grow-1 -bg-color-green -text-color-white"><a
                        href={props.technical_documents}>Technical Documents</a></div> : null}

                {props.buttonRemind ?
                    <div className="data-table__column -flex-grow-1" style={{minWidth: '250px'}}>
                        <div className="-flex">
                            <div className="btn btn1 btn__small"
                                onClick={() => props.handleRemindSupplier(props.id)} >Remind</div>
                            <div className="btn btn1 btn__small"
                                onClick={() => props.handleGetSupplierInQuotation(props.id)} >Get in quotation</div>
                        </div>
                    </div> : null}

            </div>
        </>
    );
};

export default QuotationTableRowModal;