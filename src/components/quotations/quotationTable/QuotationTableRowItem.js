import React from 'react'
import uuid from 'uuid'
import className from 'classnames';
import Checkbox from "../../controls/checkbox";

const QuotationTableRowItem = (props) => {
    return (
        <>
            <div className={className('data-table__row', {'-paused-row': props.paused})}>
                {props.control ? <div className="data-table__column -bg-color-blue -text-color-white -flex-grow-0"
                                      style={{maxWidth: '65px'}}>
                    <button>{props.paused ? <i className="icon-play-button"></i> :
                        <i className="icon-pause-circular-button"></i>}</button>
                </div> : ''}

                {props.invitation_status ? <div
                    className={className('data-table__column', ' -flex-grow-0', 'hidden', '-text-color-white', {'-bg-color-green': props.confirmed}, {'-bg-color-yellow': !props.confirmed})}>{props.confirmed ? 'Confirmed' : 'Awaiting Response'}</div> : ''}
                {props.show_id ? <div className="data-table__column -flex-grow-1">{props.id}</div> : ''}

                {props.date ? <div className="data-table__column -flex-grow-1">{props.date}</div> : ''}

                <div className="data-table__column -flex-grow-1">
                    {props.name}
                </div>

                {props.status ? <div className="data-table__column -flex-grow-1">{props.status}</div> : ''}

                {props.group ? <div className="data-table__column -flex-grow-1">{props.group}</div> : ''}

                {props.shell_fabric ? <div className="data-table__column -flex-grow-1">{props.shell_fabric}</div> : ''}

                {props.color ? <div className="data-table__column -flex-grow-1">{props.color}</div> : ''}

                {props.target_price ? <div className="data-table__column -flex-grow-1">{props.target_price}</div> : ''}

                {props.change_request ?
                    <div className="data-table__column -flex-grow-1"><i className="icon-filters-2"></i></div> : ''}

                {props.gender ? <div className="data-table__column -flex-grow-1">{props.gender}</div> : ''}

                {props.age ? <div className="data-table__column -flex-grow-1">{props.age}</div> : ''}

                {props.country ? <div className="data-table__column -flex-grow-1">{props.country}</div> : ''}

                {props.suppliers ? <div className="data-table__column -flex-grow-1"><Checkbox
                        name={`addProduct_${props.id}`}
                        onChange={() => props.checkboxHandler(props.id)}
                        checked={false}/></div> :
                    <div className="data-table__column -flex-grow-1">No supplier added yet!</div>}

                {props.price ? <div className="data-table__column -flex-grow-1">{props.price}</div> : ''}
                {props.description ? <div className="data-table__column -flex-grow-1">{props.description}</div> : ''}

                {props.technical_documents ?
                    <div className="data-table__column -flex-grow-1 -bg-color-green -text-color-white"><a
                        href={props.technical_documents}>Technical Documents</a></div> : ''}

                {props.buttonRemind ?
                    <div className="data-table__column -flex-grow-1" style={{minWidth: '250px'}}>
                        <div className="-flex">
                            <button className="btn btn1 btn__small">Remind</button>
                            <button className="btn btn1 btn__small">Get in quotation</button>
                        </div>
                    </div> : ''}

            </div>
        </>
    );
};

export default QuotationTableRowItem;