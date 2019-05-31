import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Loading from '../../helpers/loading'
import QuotationHeader from '../QuotationHeader'
import QuotationListFilter from '../QuotationListFilter'
import QuotationListTable from '../quotationTable/QuotationListTable'
import QuotationItemEmptyStatic from './QuotationItemEmptyStatic'
import CommonButton from '../../common/CommonButton'
import QuotationDate from './QuotationDate'
import QuotationInfoStroke from './QuotationInfoStroke'
import CheckboxComponent from "../../CheckboxComponent"

import AddProductsModal from './modals/AddProductsModal'
import AddSuppliersModal from './modals/AddSuppliersModal'
import DistributionModal from './modals/DistributionModal'
import InvitationStatusModal from './modals/InvitationStatusModal'
import HistoryModal from './modals/HistoryModal'

import { quotationsList, createOptionsSelector } from '../../../ducks/quotations'

import QuotationListTableItem from '../quotationTable/QuotationListTableItem'
import QuotationsApi from '../../../requestor/quotations'

class QuotationsItem extends PureComponent {
    state = { addedProducts: false, addedSuppliers: false, distributed: false }

    refreshAddedProductsInQuotation = async () => {
        const addedProducts = await QuotationsApi.getProductsInQuotation( this.props.match.params.id )
        this.setState({ addedProducts: addedProducts.results })
    }
    refreshAddedSuppliersInQuotation = async () => {
        const addedSuppliers = await QuotationsApi.getSuppliersInQuotation( this.props.match.params.id )
        this.setState({ addedSuppliers: addedSuppliers.results })
    }
    refreshDistributedSuppliersToProduct = async () => {
        const distributed = await QuotationsApi.getDistributedSuppliers( this.props.match.params.id )
        this.setState({ distributed: distributed.results })
    }

    componentDidMount(){
        if(!this.props.quotation) this.props.loadQuotations()
        if(!this.state.addedProducts) this.refreshAddedProductsInQuotation()
        if(!this.state.addedSuppliers) this.refreshAddedSuppliersInQuotation()
    }
    componentWillUnmount(){
        this.props.refreshQuotationsList(this.props.quotationOptions)
    }

    untouched = (what) => {
        if(what === 'products') return !this.state.addedProducts || !this.state.addedProducts.length ? true : false;
        if(what === 'suppliers') return !this.state.addedSuppliers || !this.state.addedSuppliers.length ? true : false;
    }
    render() {
        return (
            <>
                {this.props.quotation && <QuotationHeader 
                    title={this.props.quotation.name}
                    link={false} 
                    subtitle={false} />
                }
                <div className="quotation-item__head">
                    <div className="quotation-item__head__info">
                        <div className="quotation-item__head__row">
                            <div className="options-buttons">
                                <CommonButton disabled={true} type="btn3" text="Start Quotation"/>
                                <CommonButton disabled={true} type="btn2" text="Request"/>
                                <HistoryModal disabled={this.props.is_available_distribution} />
                            </div>
                        </div>
                        { this.props.quotation && <>
                            <div className="quotation-item__head__row">
                                <QuotationDate 
                                    text="Quotation starts date:" 
                                    date={this.props.quotation.start_date} />
                            </div>
                            <div className="quotation-item__head__row">
                                <QuotationDate 
                                    text="Quotation expiry date:" 
                                    date={this.props.quotation.expiry_date} />
                            </div>
                        </> }
                        <div className="quotation-item__head__row">
                            <div className="quotation-modal__params__item -flex">
                                {this.props.quotation && <>
                                    <CheckboxComponent 
                                        className="-noclass" 
                                        defaultChecked={ this.props.quotation.type === 'regular' ? true : false } 
                                        label="Regular" />
                                    <CheckboxComponent 
                                        className="-noclass" 
                                        defaultChecked={this.props.quotation.do_not_notify_supplier} 
                                        label="Do not notify supplier" />
                                </>}
                            </div>
                        </div>
                    </div>
                    <div className="quotation-item__head__btn">
                        <div className="quotation-item__head__row">
                            <div className="options-buttons">
                            { this.state.addedProducts ? <AddProductsModal
                                refreshAddedProductsInQuotation={this.refreshAddedProductsInQuotation}
                                addedProducts={this.state.addedProducts}
                                quotationId={+this.props.match.params.id} /> : <Loading /> }
                            { this.state.addedSuppliers ? <AddSuppliersModal
                                refreshAddedSuppliersInQuotation={this.refreshAddedSuppliersInQuotation}
                                addedSuppliers={this.state.addedSuppliers}
                                disabled={this.untouched('products')}
                                quotationId={+this.props.match.params.id} /> : <Loading /> }
                            </div>
                        </div>
                        <div className="quotation-item__head__row">
                            <QuotationInfoStroke 
                                disabled={false} 
                                text="products selected" 
                                count={this.untouched('products') ? 0 : this.state.addedProducts.length} />
                            <QuotationInfoStroke 
                                disabled={this.untouched('products')} 
                                text="suppliers selected" 
                                count={this.untouched('suppliers') ? 0 : this.state.addedSuppliers.length} />
                        </div>
                        <div className="quotation-item__head__row">
                            <div className="options-buttons">
                                <DistributionModal
                                    addedProducts={this.state.addedProducts}
                                    addedSuppliers={this.state.addedSuppliers} 
                                    quotationId={+this.props.match.params.id}
                                    disabled={this.untouched('suppliers')} />
                                <CommonButton disabled={true} type="btn2" text="Invitation status"/>
                            </div>
                        </div>
                    </div>
                </div>
                {this.untouched('products') ? <QuotationItemEmptyStatic/>
                :
                <QuotationListTableItem
                    products={this.state.addedProducts}
                    suppliers={this.state.addedSuppliers}
                 />}
            </>
        );
    }
}

const getInfo = (list, id) => {
    if(!list.loading && !!list.data) return list.data.results.filter(q => q.id === id)[0]
}
const mapStateToProps = (state, ownProps) => ({
    quotation: getInfo(quotationsList(state), +ownProps.match.params.id),
    listQ: quotationsList(state),
    quotationOptions: createOptionsSelector('quotations')(state)
})

export default connect(mapStateToProps, (dispatch, ownProps) => ({
    loadQuotations: () => dispatch({ type: 'REQUEST_LIST_Q' }),
    refreshQuotationsList: (payload) => dispatch({ type: 'REQUEST_LIST_Q', payload })
    // getProductsInThisQuotation: () => dispatch({ type: 'GET_PRODUCTS_IN_THIS_QUOTATION', payload: ownProps.match.params.id }),
    // getSuppliersInThisQuotation: () => dispatch({ type: 'GET_SUPPLIERS_IN_THIS_QUOTATION', payload: ownProps.match.params.id }), more likely wont be needed
}))(QuotationsItem);
