import React, {PureComponent} from 'react';

import PopupCallback from '../../common/PopupCallback'
import { connect } from 'react-redux'
import QuotationHeader from '../QuotationHeader';
import CommonButton from '../../common/CommonButton'
import QuotationTableHeaderItem from '../quotationTable/QuotationTableHeaderItem';
import QuotationTableRowSupplier from "../quotationTable/QuotationTableRowSupplier";
import QuotationDate from '../quotationItem/QuotationDate'

class QuotationEnterPrice extends PureComponent {
    state = {
        quotation: {}, 
        products: { loading: false, error: false, data: [] } 
    }

    componentDidMount(){
        if(!this.props.products.data.length) this.props.loadProducts(this.props.match.params.id)
        this.props.loadComments(this.props.match.params.id)
        this.props.getRequestChanges() // this duplicates requests when we respond to changes via respon to on of them
        if(!this.props.quotation) this.props.loadQuotations(this.props.match.params.id)
    }
    componentDidUpdate(prevProps){
        this.setState({ products: this.props.products })
        this.setState({ quotation: this.props.quotation })
    }
    handleSendPrice = (data) => {
        if(this.props.quotation && this.props.quotation.status_quotation === 'started') this.props.sendPrice(data)
    }

    renderProducts = (list) => list.map(product => {
        const { id, style, shell_fabric_1, nomenclature_group, color, price } = product
        const requestedChangesCount = this.props.requestedChanges.data.filter(rc => rc.distribution_id === id)[0];
        return (<QuotationTableRowSupplier
            uid_1c={product.uid_1c}
            isSamplesRequested={this.props.quotation.is_samples_requested}
            key={id}
            productItem={product.product_item_id}
            pause={product.pause}
            price={price}
            //targetPrice={product.target_price}
            sendPrice={this.handleSendPrice}
            declineProduct={this.props.declineProduct}
            id={id}
            color={color}
            styleName={style}
            shellFabric={shell_fabric_1}
            nomenclatureGroup={nomenclature_group}
            requestedChangesCount={requestedChangesCount !== undefined ? requestedChangesCount.requests_count : null}
            enterPrice={true} />
    )})

    render() {
            return (
                <>
                <PopupCallback text='Invitation was sent' visible={this.state.send}/>
                {this.props.quotation &&
                    <><QuotationHeader title={`Quotation ${this.props.match.params.id}`} link={false}/>
                    <div className="quotation-item__head">
                        <div>
                            <div className='quotation-item__head__row'><QuotationDate text='Quotation starts date: ' date={this.props.quotation.start_date} /></div>
                            <div className='quotation-item__head__row'><QuotationDate text='Quotation expiry date: ' date={this.props.quotation.expiry_date} /></div>

                            {this.props.quotation.is_samples_requested ? <div className="quotation-item__head__row -display-block">
                                <div className="quotation__list__title">PLEASE SEND PROTO SAMPLES TILL *date*</div>
                                <p style={{marginBottom: '10px'}}><b>You will get all the documentation by email</b></p>
                                {this.props.quotation.samples_accept ? <CommonButton type='btn4' text='Samples accepted' /> 
                                    : 
                                <CommonButton onClick={() => this.props.acceptSamples(this.props.match.params.id)} type='btn2' text='Accept Samples' />}
                            </div>
                                : 
                            <div className="quotation-item__head__row">
                                {this.props.quotation && <button 
                                className={`btn btn2 -btn-with-wrap ${this.props.products.isAvailableAllTeckPack ? '' : '-bg-color-gray -border-color-gray hover-none'}`}
                                onClick={() => this.props.downloadAllTechPack(this.props.quotation.quotation_name, this.props.match.params.id)}>
                                Download all technical pack
                            </button>}
                            </div>}
                        </div>
                    </div></>}
                    <>
                        <div className="quotation__list__title">List of products in quotation</div>
                        <div className="data-table">
                            <div className="data-table__header">
                                <QuotationTableHeaderItem
                                    heads={['1c code', 'Style name', 'Product group', 'Shell fabric', 'Color', 'Changes request', 'Enter your price', '']}
                                    enter_price={true} />
                            </div>
                            {(this.state.products.data.length && this.props.requestedChanges.data && this.props.quotation) ? <div className="data-table__body">
                                {this.props.quotation.is_samples_requested ?
                                    this.renderProducts(this.state.products.data.filter(p => p.is_selected && p)) 
                                        :
                                    this.renderProducts(this.state.products.data)
                                }
                            </div>
                                :
                            <span>No products in quotation</span>}
                        </div>
                    </>
                </>
            );
    }
}

export default connect((state, ownProps) => {
    let quotation = null
    if(state.quotations.supplierPart.invitedQuotations.data) quotation = state.quotations.supplierPart.invitedQuotations.data.filter(iq => +iq.quotation_id === +ownProps.match.params.id)[0]
    return {
        products: state.quotations.supplierPart.viewedQuotation.products,
        requestedChanges: state.quotations.supplierPart.viewedQuotation.requestedChanges,
        quotation,
    }
}, (dispatch, ownProps) => ({
    loadProducts: (id) => dispatch({ type: 'LOAD_PRODUCTS_FOR_SUPPLIER', payload: id }),
    sendPrice: (data) => dispatch({ type: 'NEW_PRICE_FROM_SUPPLIER', payload: {...data, quotationId: ownProps.match.params.id} }),
    declineProduct: (id) => dispatch({ type: 'DECLINE_PRODUCTS_FOR_SUPPLIER', payload: { distributionId: id, quotationId: ownProps.match.params.id } }),
    loadComments: (id) => dispatch({ type: 'LOAD_COMMENTS', payload: id }),
    getRequestChanges: () => dispatch({ type: 'GET_REQUEST_CHANGES' }),
    loadQuotations: () => dispatch({type: 'LOAD_Q_LIST_FOR_SUPPLIER' }),
    acceptSamples: (id) => dispatch({type: 'ACCEPT_SAMPLES', payload: id }),
    downloadAllTechPack: (name, id) => dispatch({ type: 'DOWNLOAD_ALL_TECH_PACK', payload: {name, id} }),
}))(QuotationEnterPrice);