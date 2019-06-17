import React from 'react';

import QuotationHeader from '../QuotationHeader';
import CommonButton from '../../common/CommonButton'
import { connect } from 'react-redux';

const QuotationAccept = (props) => {
    return (
        <>
            <QuotationHeader title="Current quotation has been started" link={false}/>
            <div className="quotation-item__head">
                <div>
                    <h2 className="quotation-item__title">Quotation 001</h2>
                    <div className="quotation-item__head__row">
                        <p><b>Quotation starts date:</b> 19.05.2019</p>
                    </div>
                    <div className="quotation-item__head__row">
                        <p><b>Quotation expiry date:</b> 06.06.2019</p>
                    </div>
                    <div className="quotation-item__head__row">
                        <div className="options-buttons">
                            <CommonButton 
                                type='btn2' 
                                text='Accept'
                                onClick={() => props.decideOnQuotation({ quotation_id: props.match.params.id, decision: 'accepted' })} />
                            <CommonButton 
                                type='btn3' 
                                text='Decline'
                                onClick={() => props.decideOnQuotation({ quotation_id: props.match.params.id, decision: 'declined' })} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default connect(state => ({

}), dispatch => ({
    decideOnQuotation: (payload) => dispatch({ type: 'DECIDE_ON_QUOTATION', payload })
}))(QuotationAccept);