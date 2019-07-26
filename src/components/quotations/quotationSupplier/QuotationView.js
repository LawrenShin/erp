import React, {PureComponent} from 'react';

import uuid from 'uuid'
import Loading from '../../helpers/loading'
import QuotationHeader from '../QuotationHeader';
import CommonButton from '../../common/CommonButton'
import QuotationTableHeaderItem from '../quotationTable/QuotationTableHeaderItem';
import QuotationTableRowSupplier from "../quotationTable/QuotationTableRowSupplier";
import QuotationDate from '../quotationItem/QuotationDate'
import {connect} from 'react-redux';
import {history} from '../../../routes/history'

import quotationApi from '../../../requestor/quotations'

class QuotationView extends PureComponent {
    componentDidMount() {
        this.props.enterPrice && history.push(`/quotations/enter_price/${this.props.match.params.id}`)
        this.props.loadProducts(this.props.match.params.id)
        if (!this.props.quotation) this.props.loadQuotations(this.props.match.params.id)
    }

    heads = ['Year', 'Season', 'Theme', 'Brand', 'Department', 'Category', 'Product group', 'Style name', 'Color', 'Gender', '1c code'];

    render() {
        return (
            <>
                <QuotationHeader
                    title={this.props.quotation ? this.props.quotation.quotation_name : 'Current quotation has been started'}
                    link={false}/>
                <div className="quotation-item__head">
                    {this.props.quotation && <div>
                        <div className='quotation-item__head__row'><QuotationDate
                            text="Quotation starts date:"
                            date={this.props.quotation.start_date}/></div>
                        <div className='quotation-item__head__row'><QuotationDate
                            text="Quotation expiry date:"
                            date={this.props.quotation.expiry_date}/></div>
                        <div className="quotation-item__head__row">
                            {Array.isArray(this.props.products.data) && <button 
                                className={`btn btn2 -btn-with-wrap ${this.props.products.isAvailableAllTeckPack ? '' : '-bg-color-gray -border-color-gray hover-none'}`}
                                onClick={() => this.props.downloadAllTechPack(this.props.quotation.quotation_name, this.props.match.params.id)} >
                                Download all technical pack
                            </button>}
                        </div>
                    </div>}
                </div>
                {this.props.products.loading ? <Loading/>
                    :
                    this.props.products.data.length ? <>
                        <div className="quotation__list__title">List of products in quotation</div>
                        <div className="data-table">
                            <div className="data-table__header">
                                <QuotationTableHeaderItem heads={this.heads} buttonRemind={true}/>
                            </div>
                            <div className="data-table__body">
                                {this.props.products.data.map(product => <QuotationTableRowSupplier
                                    key={uuid()}
                                    button={true}
                                    declineProduct={this.props.declineProduct}
                                    downloadTechPack={this.props.downloadTechPack}
                                    {...product} />
                                )}
                            </div>
                        </div>
                        <div className="quotation__products__submit">
                            {this.props.quotation && <CommonButton
                                disabled={this.props.quotation.status_quotation === 'started' ? false : true}
                                onClick={() => history.push(`/quotations/enter_price/${this.props.match.params.id}`)}
                                type='btn2'
                                text='Enter prices'/>}
                        </div>
                    </> : <span>No products in quotation</span>
                }
            </>
        );
    }
}

export default connect((state, ownProps) => {
    const enterPrice = state.quotations.supplierPart.viewedQuotation.products.data.length ? 'target_price' in state.quotations.supplierPart.viewedQuotation.products.data[0] ? true : false : false
    // this logic should be reconsidered as it's quote expensive
    let quotation = null
    if (state.quotations.supplierPart.invitedQuotations.data) quotation = state.quotations.supplierPart.invitedQuotations.data.filter(iq => +iq.quotation_id === +ownProps.match.params.id)[0]
    // this logic should be reconsidered as it's quote expensive
    return {
        products: state.quotations.supplierPart.viewedQuotation.products,
        enterPrice,
        quotation,
    }
}, (dispatch, ownProps) => ({
    loadProducts: (id) => dispatch({type: 'LOAD_PRODUCTS_FOR_SUPPLIER', payload: id}),
    declineProduct: (id) => dispatch({
        type: 'DECLINE_PRODUCTS_FOR_SUPPLIER',
        payload: {distributionId: id, quotationId: ownProps.match.params.id}
    }),
    loadQuotations: () => dispatch({type: 'LOAD_Q_LIST_FOR_SUPPLIER'}),
    downloadAllTechPack: (name, id) => dispatch({ type: 'DOWNLOAD_ALL_TECH_PACK', payload: {name, id} }),
}))(QuotationView);