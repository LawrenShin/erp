import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

import { listExtender } from '../../../common/helperFunctions'
import Loading from '../../../helpers/loading'
import ModalSemantic from '../../../common/ModalSemantic'
import CommonButton from '../../../common/CommonButton'
import { createListsSelector, createFiltersSelector, createOptionsSelector } from '../../../../ducks/quotations/index'

import QuotationTableHeaderItem from '../../quotationTable/QuotationTableHeaderItem'
import DistributionTableRow from '../../quotationItem/modals/DistributionTableRow'

import CheckboxComponent from "../../../CheckboxComponent"
import QuotationListFilter from "../../QuotationListFilter";
import QuotationsApi from '../../../../requestor/quotations'
import CommonApi from '../../../../requestor/common'

class DistributionModal extends PureComponent {
    state = { 
        heads : ['Style name', 'Product group', 'Shell fabric', 'Color', 'Gender', 'Age', 'Country'],
        selectThese: ['style', 'nomenclature_group', 'shell_fabric_1', 'color', 'gender', 'age', 'country'],
        added: false,
    }
    async componentDidMount() {
        const t = await CommonApi.getCountries().then(res => res.results)
        console.log(t)
        if (!this.props.suppliers || !this.props.suppliersFilters || !this.props.products || !this.props.productsFilters) this.props.getModalsData()
    }

    updateOptions = (fName, value) => this.props.setOption({ filterName: fName, value })
    selectFilters = () => Object.keys(this.props.productFilters).filter(pfn => this.state.selectThese.includes(pfn)).reduce((obj, pfn) => {
                obj[pfn] = this.props.productFilters[pfn]
                return obj
            }, {})

    manageStateOnDistributeSuppliers = (ids) => {
        const isPresent = this.findMatch(ids.product)
        if(typeof isPresent === 'undefined') this.setState({ added: {...this.state.added,  [ids.product]: { supplier: ids.supplier } } })
        if(typeof isPresent !== 'undefined') this.setState(prev => {
            let newState = Object.assign({}, prev)
            delete newState.added[ids.product]
            return newState
        })
    }
    findMatch = (id) => this.state.added[id]
    
    distributeSupplierToProduct = (ids) => {
        try{
            const res = QuotationsApi.distributeSupplierToProduct({ ...ids, quotation: this.props.quotationId })
            this.manageStateOnDistributeSuppliers(ids)
        }catch(e){
            console.log(e)
        }
    }
    removeSupplierFromProduct = (p) => {
        console.log('remvoe ',p)
    }

    render() {
        const { suppliersFilters, productFilters, products } = this.props
        if(suppliersFilters && productFilters && products) listExtender(this.props.products.results, { 
            gender: productFilters.gender.extra,
            color: productFilters.color.extra,
            country: suppliersFilters.legal_country.extra,
        })
        return (
            <ModalSemantic
                style={{marginLeft: '0 !important'}}
                trigger={<CommonButton disabled={this.props.disabled} type="btn2" text="Distribution"/>}>
                <div className="quotation-modal">
                    <div className="quotation-modal__content -lg -gray-bg">
                        <h2>Distribute products to supplier</h2>

                        <div className="filters-header">
                            <CheckboxComponent className="-noclass" defaultChecked label="Show only unpicked items"/>
                            <div className="filters-box__item" style={{marginLeft: 'auto', minWidth: '45%'}}>
                                <div className="filters-elem">
                                    <div className="search-bl">
                                        <input className="search-bl__input" type="text"/>
                                        <button className="search-bl__btn"><i className="icon-search"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {this.props.productFilters ? <QuotationListFilter
                            filters={this.selectFilters()}
                            options={this.props.productOptions}
                            updateOptions={this.updateOptions}
                            clearAll={this.props.clearOptions}
                            notSplit={true} /> 
                        : 
                            <Loading />}
                        
                        {(this.props.products && this.props.products.count) ? <div className='data-table__wrapper'>
                                <div className='data-table'>
                                    <div className="data-table__header">
                                        <QuotationTableHeaderItem 
                                            addedSuppliers={this.props.addedSuppliers}
                                            heads={this.state.heads} 
                                            control={false} />
                                    </div>
                                    <div className="data-table__body">
                                        {this.props.products.results.map(product => <DistributionTableRow
                                            checkboxHandler={{ add: this.distributeSupplierToProduct, remove: this.removeSupplierFromProduct }}
                                            addedSuppliers={this.props.addedSuppliers}
                                            findMatch={this.findMatch}
                                            product={{...product}}
                                            key={uuid()} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        :
                            <Loading />}
                    </div>
                </div>
            </ModalSemantic>
        );
    }
}

export default connect((state) => ({
    products: createListsSelector('products')(state),
    productFilters: createFiltersSelector('products')(state),
    productOptions: createOptionsSelector('products')(state),
    suppliers: createListsSelector('suppliers')(state),
    suppliersFilters: createFiltersSelector('suppliers')(state),
    suppliersOptions: createOptionsSelector('suppliers')(state),
}), dispatch => ({
    getModalsData: () => dispatch({type: 'REQUEST_MODALS_DATA'}),
    clearOptions: () => dispatch({type: 'QUOTATIONS_OPTION_P'}),
    setOption: (payload) => dispatch({type: 'QUOTATIONS_OPTION_P', payload}),
}))(DistributionModal);