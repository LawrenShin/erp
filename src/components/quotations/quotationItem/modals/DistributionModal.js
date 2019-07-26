import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import Loading from '../../../helpers/loading'
import ModalSemantic from '../../../common/ModalSemantic'
import CommonButton from '../../../common/CommonButton'
import { createFiltersSelector, createOptionsSelector } from '../../../../ducks/quotations/index'

import QuotationTableHeaderItem from '../../quotationTable/QuotationTableHeaderItem'
import DistributionTableRow from '../../quotationItem/modals/DistributionTableRow'

import CheckboxComponent from "../../../CheckboxComponent"
import QuotationListFilter from "../../QuotationListFilter";
import QuotationsApi from '../../../../requestor/quotations'

class DistributionModal extends PureComponent {
    state = {
        heads: ['Style name', 'Product group', 'Shell fabric', 'Color', 'Gender', 'Age', 'Country'],
        selectThese: ['style', 'nomenclature_group', 'shell_fabric_1', 'color', 'gender', 'age', 'country'],
    }

    componentDidMount() {
        this.props.getDistributedRelations(this.props.quotationId)
    }

    updateOptions = (fName, value) => this.props.setOption({filterName: fName, value})
    selectFilters = () => Object.keys(this.props.productFilters).filter(pfn => this.state.selectThese.includes(pfn)).reduce((obj, pfn) => {
        obj[pfn] = this.props.productFilters[pfn]
        return obj
    }, {})

    

    distributeSupplierToProduct = (ids) => {
        try {
            const res = QuotationsApi.distributeSupplierToProduct({ ...ids, quotation: this.props.quotationId })
        } catch (e) {
            console.log(e)
        }
    }
    removeSupplierFromProduct = (p) => {
        try{
            const res = QuotationsApi.deleteSupplierFromProduct({
                quotation_id: this.props.quotationId,
                supplier_id: p.supplier,
                product_id: p.product,})
        }catch(e){
            console.log(e)
        }
    }
    handleClose = () => this.props.getDistributedRelations( this.props.quotationId )

    composeDistributedSuppliers = (product) => new Set (this.props.distributedRelations.data.filter( dr => dr.product === product.id ).map(r => r.supplier))

    render() {
        return (
            <ModalSemantic
                onClose={this.handleClose}
                size='large'
                style={{marginLeft: '0 !important'}}
                trigger={<CommonButton disabled={this.props.disabled} type="btn2" text="Distribution"/>}>
                <div className="quotation-modal">
                    <div className="quotation-modal__content -lg -gray-bg">
                        <h2>Distribute products to supplier</h2>

                        <div className="filters-header">
                            <CheckboxComponent className="-noclass" defaultChecked label="Show only unpicked items"/>
                            {/* SEARCHBAR */}
                            {/* <div className="filters-box__item" style={{marginLeft: 'auto', minWidth: '45%'}}>
                                <div className="filters-elem">
                                    <div className="search-bl">
                                        <input className="search-bl__input" type="text"/>
                                        <button className="search-bl__btn"><i className="icon-search"></i></button>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        {this.props.productFilters ? <QuotationListFilter
                                prefix='product__'
                                filters={this.selectFilters()}
                                options={this.props.distributionOptions}
                                updateOptions={this.updateOptions}
                                clearAll={this.props.clearOptions}
                                notSplit={true} />
                            :
                            <Loading/>}

                        {(this.props.addedProducts 
                        && this.props.addedProducts.data.length
                        && this.props.distributedRelations.data) ? <div className='data-table__wrapper'>
                                <div className='data-table'>
                                    <div className="data-table__header">
                                        <QuotationTableHeaderItem
                                            renderSuppliersIds={true}
                                            addedSuppliers={this.props.addedSuppliers.data}
                                            heads={this.state.heads}
                                            control={false}/>
                                    </div>
                                    <div className="data-table__body">
                                        {this.props.addedProducts.data.map(relation => <DistributionTableRow
                                            checkboxHandler={{
                                                add: this.distributeSupplierToProduct,
                                                remove: this.removeSupplierFromProduct
                                            }}
                                            addedSuppliers={this.props.addedSuppliers.data}
                                            product={{...relation.product}}
                                            distributed={this.composeDistributedSuppliers(relation.product)}
                                            key={uuid()} />
                                        )}
                                    </div>
                                </div>
                            </div>
                            :
                            this.props.addedProducts.data.length === 0 ? <h1>No products were found</h1> : <Loading/>}
                    </div>
                </div>
            </ModalSemantic>
        );
    }
}

export default connect((state) => ({
    distributedRelations: state.quotations.currentQuotationReducer.distributedRelations,
    productFilters: createFiltersSelector('products')(state),
    distributionOptions: createOptionsSelector('distribution')(state),
}), dispatch => ({
    getModalsData: () => dispatch({type: 'REQUEST_MODALS_DATA'}),
    clearOptions: () => dispatch({type: 'QUOTATIONS_OPTION_D'}),
    setOption: (payload) => dispatch({type: 'QUOTATIONS_OPTION_D', payload}),
    getDistributedRelations: (payload) => dispatch({type: 'REFRESH_DISTRIBUTED_RELATIONS_Q', payload}),
}))(DistributionModal);