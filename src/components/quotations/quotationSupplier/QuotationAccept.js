import React from 'react';

import QuotationHeader from '../QuotationHeader';
import CommonButton from '../../common/CommonButton'
import {connect} from 'react-redux';
import { history } from '../../../routes/history'

const QuotationAccept = (props) => {
    return (
        <>
            <QuotationHeader title="Current quotation has been started" link={false}/>
            <div className="quotation-item__head">
                <div>
                    <h2 className="quotation-item__title">{props.quotation !== null ? props.quotation.quotation_name : `Quotation ${props.match.params.id}` }</h2>
                    {props.quotation !== null && <div className="quotation-item__head__row">
                        <p><b>Quotation starts date:</b> 19.05.2019</p>
                    </div>}
                    {props.quotation !== null && <div className="quotation-item__head__row">
                        <p><b>Quotation expiry date:</b> 06.06.2019</p>
                    </div>}
                    <div className="quotation-item__head__row">
                        <div className="options-buttons">
                            <CommonButton
                                type='btn2'
                                text='Accept'
                                onClick={() => props.decideOnQuotation({
                                    quotation_id: props.match.params.id,
                                    decision: 'accepted'
                                })}/>
                            <CommonButton
                                type='btn3'
                                text='Decline'
                                onClick={() => {
                                    props.decideOnQuotation({
                                        quotation_id: props.match.params.id,
                                        decision: 'declined',
                                    })
                                }}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default connect((state, ownProps) => {
    let quotation = null
    if (state.quotations.supplierPart.invitedQuotations.data) quotation = state.quotations.supplierPart.invitedQuotations.data.filter(iq => +iq.quotation_id === +ownProps.match.params.id)[0]
    // this logic should be reconsidered as it's quote expensive
    return {
        quotation
    }
}, (dispatch) => ({
    decideOnQuotation: (payload) => {
        setTimeout(() => {
            dispatch({type: 'DECIDE_ON_QUOTATION', payload})
        }, 500)
    }
}))(QuotationAccept);