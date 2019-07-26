import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { history } from '../../../routes/history'
import { Message } from 'semantic-ui-react'

import Loading from '../../helpers/loading'
import QuotationHeader from '../QuotationHeader'
import QuotationItemEmptyStatic from './QuotationItemEmptyStatic'
import CommonButton from '../../common/CommonButton'
import QuotationDate from './QuotationDate'
import QuotationInfoStroke from './QuotationInfoStroke'

import AddProductsModal from './modals/AddProductsModal'
import AddSuppliersModal from './modals/AddSuppliersModal'
import DistributionModal from './modals/DistributionModal'
import InvitationStatusModal from './modals/InvitationStatusModal'
import HistoryModal from './modals/HistoryModal'
import QuotationApi from '../../../requestor/quotations' // temporary i think it belongs to sagas

import { createOptionsSelector } from '../../../ducks/quotations'

import QuotationListTableItem from '../quotationTable/QuotationListTableItem'

class QuotationItem extends PureComponent {
    state = { error: '' }
    componentDidMount(){
        this.props.initQuotation(this.props.match.params.id)
        this.props.loadComments(this.props.match.params.id)
        this.props.loadHistory(this.props.match.params.id)
        this.props.getModalsData()
    }
    componentDidUpdate(){
        if(this.props.quotation.error) history.push('/quotations')
    }
    componentWillUnmount(){
        this.props.refreshQuotationsList(this.props.quotationOptions)
    }

    untouched = (what) => {
        if(this.props.quotation.data) {
            if(what === 'products') return this.props.quotation.data.products_amount ? false : true;
            if(what === 'suppliers') return this.props.quotation.data.suppliers_amount ? false : true;
        }else{
            return true
        }
    }
    composeAddedIds = (what) => {
        if(what === 'products' && !this.untouched('products')) return new Set(this.props.addedProducts.data.map(ap => ap.product_id))
        if(what === 'suppliers' && !this.untouched('suppliers')) return new Set(this.props.addedSuppliers.data.map(as => as.supplier_id))
    }
    handleStartQuotation = () => {
        QuotationApi.changeStatusQuotation(this.props.match.params.id).then(r => this.props.initQuotation(this.props.match.params.id)).catch(e => this.setState({error: e.response.data.error}))
    }
    render() {
        const startButton = () => {
          if (this.props.quotation.data.status === "started") {
              return <CommonButton type='btn4' text="Quotation started" />;
          }  else if (this.props.quotation.data.status === "closed") {
              return <CommonButton type='btn4' text="Quotation closed" disabled={true}/>;
          } else {
              return <CommonButton type='btn3' text="Start Quotation"
                                   onClick={this.handleStartQuotation}
                                   disabled={!this.props.quotation.data.is_available_start_quotation} />;
          }
        };
        return (
            <>
                {this.props.quotation && <QuotationHeader
                    title={this.props.quotation.data.name}
                    link={false}
                    subtitle={false} />
                }
                <div className="quotation-item__head">
                    <div className="quotation-item__head__info">
                        <div className="quotation-item__head__row">
                            <div className="options-buttons">
                                {startButton()}
                                {this.props.quotation.data.is_samples_requested ? <CommonButton type='btn4' text="Samples requested" />
                                :
                                <CommonButton
                                    disabled={!this.props.quotation.data.is_available_request_samples}
                                    onClick={() => this.props.requestSamples(this.props.match.params.id)}
                                    type='btn2'
                                    text="Request samples" />}
                                <HistoryModal disabled={!this.props.quotation.data.is_available_history} />
                            </div>
                        </div>
                        { this.props.quotation && <>
                            <div className="quotation-item__head__row">
                                <QuotationDate
                                    text="Quotation starts date:"
                                    date={this.props.quotation.data.start_date} />
                            </div>
                            <div className="quotation-item__head__row">
                                <QuotationDate
                                    text="Quotation expiry date:"
                                    date={this.props.quotation.data.expiry_date} />
                            </div>
                        </> }
                    </div>
                    <div className="quotation-item__head__btn">
                        <div className="quotation-item__head__row">
                            <div className="options-buttons">

                            {this.props.quotation.data &&
                            this.props.addedSuppliers.data &&
                            this.props.addedProducts.data ? <><AddProductsModal
                                refreshAdded={this.props.refreshAddedProducts}
                                added={this.composeAddedIds('products')}
                                quotationId={+this.props.match.params.id}
                                disabled={this.props.quotation.data.status === 'started' || this.props.quotation.data.status === 'closed' ? true : false} />

                            {this.props.addedProducts.error && <Message color='red'>{this.props.addedProducts.error}</Message>}

                            <AddSuppliersModal
                                refreshAdded={this.props.refreshAddedSuppliers}
                                added={this.composeAddedIds('suppliers')}
                                disabled={this.props.quotation.data.status === 'started' || this.props.quotation.data.status === 'closed' ? true : false}
                                quotationId={+this.props.match.params.id} /></>
                                :
                            <Loading />}

                            {this.props.quotation.error && <Message color='red'>{this.props.quotation.error}</Message>}

                            </div>
                        </div>
                        <div className="quotation-item__head__row">
                            <QuotationInfoStroke
                                disabled={false}
                                text="products selected"
                                count={this.untouched('products') ? 0 : this.props.quotation.data.products_amount} />
                            <QuotationInfoStroke
                                //disabled={this.untouched('products')}
                                disabled={false}
                                text="suppliers selected"
                                count={this.untouched('suppliers') ? 0 : this.props.quotation.data.suppliers_amount} />
                        </div>
                        <div className="quotation-item__head__row">
                            <div className="options-buttons">

                                {this.props.addedSuppliers.data &&
                                !this.props.addedSuppliers.error ? <DistributionModal
                                    addedProducts={this.props.addedProductsDistribution}
                                    addedSuppliers={this.props.addedSuppliers}
                                    quotationId={+this.props.match.params.id}
                                    disabled={(this.props.quotation.data.status === 'started' || !this.props.quotation.data.is_available_product_distribution) ? true : false} />
                                        :
                                    <Loading />}

                                {this.props.addedSuppliers.error && <Message color='red'>{this.props.addedSuppliers.error}</Message>}

                                <InvitationStatusModal
                                    quotationId={+this.props.match.params.id}
                                    disabled={(this.props.quotation.data.status === 'started' || !this.props.quotation.data.is_available_invitation_status) ? true : false} />
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.addedProducts.loading ?
                    <Loading />
                        :
                    this.untouched('products') ?
                        <QuotationItemEmptyStatic />
                            :
                        <QuotationListTableItem
                            status={this.props.quotation.data.status}
                            quotId={this.props.match.params.id}
                            products={this.props.addedProducts}
                            suppliers={this.props.addedSuppliers} />}
                {this.props.quotation.data.is_samples_requested 
                    && 
                <div className='quotation__products__submit'>
                    <a 
                        className='btn btn2' 
                        style={{ width: 'fit-content'}} 
                        href={`${process.env.REACT_APP_HOST}/api/quotations/download_preorder/?quotation_id=${this.props.match.params.id}`}>
                            Download preorder </a>
                </div>}
                {this.state.error && <Message color='red'>{this.state.error}</Message>}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        quotationOptions: createOptionsSelector('quotations')(state),
        addedProducts: state.quotations.currentQuotationReducer.addedProducts,
        addedProductsDistribution: state.quotations.mainQuotationReducer.lists.distribution,
        addedSuppliers: state.quotations.currentQuotationReducer.addedSuppliers,
        quotation: state.quotations.currentQuotationReducer.currentQuotation,
        history: state.quotations.history,
    }
}

export default connect(mapStateToProps, (dispatch) => ({
    loadHistory: (id) => dispatch({ type: 'LOAD_Q_HISTORY', payload: id }),
    getModalsData: () => dispatch({type: 'REQUEST_MODALS_DATA'}),
    refreshQuotationsList: (payload) => dispatch({ type: 'REQUEST_LIST_Q', payload }),
    initQuotation: (id) => dispatch({ type: 'INIT_SINGLE_Q', payload: id }),
    refreshAddedProducts: (id) => dispatch({ type: 'REFRESH_ADDED_PRODUCTS_Q', payload: id }),
    refreshAddedSuppliers: (id) => dispatch({ type: 'REFRESH_ADDED_SUPPLIERS_Q', payload: id }),
    loadComments: (id) => dispatch({ type: 'LOAD_COMMENTS', payload: id }),
    requestSamples: (id) => dispatch({ type: 'REQUEST_SAMPLES', payload: id }),
}))(QuotationItem);
