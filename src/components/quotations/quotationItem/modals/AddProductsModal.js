import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import Loading from '../../../helpers/loading'
import ModalSemantic from '../../../common/ModalSemantic'
import CommonButton from '../../../common/CommonButton'
import QuotationListTable from '../../quotationTable/QuotationListTable'
import QuotationListFilter from '../../QuotationListFilter'
import QuotationsApi from '../../../../requestor/quotations'

import { SearchBar } from '../../../suppliers/SuppliersHeader'
import {createListsSelector, createFiltersSelector, createOptionsSelector} from '../../../../ducks/quotations/index'

class AddProductsModal extends PureComponent {
    updateOptions = (fName, value) => this.props.setOption({ filterName: fName, value })

    addProductToQuotation = async (id) => {
        try {
            const res = await QuotationsApi.addProductToQuotation({ product: id, quotation: this.props.quotationId })
        } catch (e) {
            console.log(e.message)
        }
    }

    onScroll = async () => {
        const el = document.getElementById("modalAddProduct");
        if(el.scrollHeight - el.scrollTop - el.offsetHeight === 0) this.props.setOption({ filterName: 'offset', value: this.props.offset + 50 })
    };

    removeProductFromQuotation = async (id) => {
        try {
            const res = await QuotationsApi.deleteProductFromQuotation({ product_id: id, quotation_id: this.props.quotationId })
        } catch (e) {
            console.log(e.message)
        }
    }
    handleClose = () => this.props.refreshAdded(this.props.quotationId)

    componentWillUnmount(){
        console.log('unmount add products')
    }

    render() {
        return (
            <ModalSemantic
                id='modalAddProduct'
                size='large'
                onScroll={this.onScroll}
                onClose={this.handleClose}
                style={{marginLeft: '0 !important'}}
                trigger={<CommonButton disabled={this.props.disabled} type="btn2" text="Add products"/>}>
                <div className="quotation-modal">
                    <div className="quotation-modal__content -lg -gray-bg">
                        <h2>Select products for quotation</h2>

                        {/* <SearchBar 
                            storeVal={this.props.options.name__icontains}
                            setFilterName={this.updateOptions}
                            name={'name__icontains'} /> */}

                        {this.props.filters ? <QuotationListFilter
                            filters={this.props.filters}
                            options={this.props.options}
                            updateOptions={this.updateOptions}
                            clearAll={this.props.clearOptions}
                            notSplit={true}/> : <Loading/>}

                        {this.props.list ? <QuotationListTable
                            checkboxNamePrefix={'addProduct_'}
                            added={this.props.added}
                            checkboxHandler={{
                                add: this.addProductToQuotation, 
                                remove: this.removeProductFromQuotation,
                            }}
                            heads={['Name', 'Year', 'Theme', 'Department', 'Category', 'Color']}
                            selectThese={['name', 'year', 'theme', 'department', 'category', 'color']}
                            list={this.props.list.results}/> : <Loading/>}

                        {this.props.loading ? <Loading
                            style={{position: "absolute", left: "45%", bottom: "80px", display: "inline-block"}}/> : ''}
                    </div>
                </div>
            </ModalSemantic>
        );
    }
}

export default connect(state => ({
    loading: state.quotations.mainQuotationReducer.lists.products.loading,
    offset: state.quotations.mainQuotationReducer.lists.products.options.offset,
    list: createListsSelector('products')(state),
    filters: createFiltersSelector('products')(state),
    options: createOptionsSelector('products')(state),
}), dispatch => ({
    getModalsData: () => dispatch({type: 'REQUEST_MODALS_DATA'}),
    clearOptions: () => dispatch({type: 'QUOTATIONS_OPTION_P'}),
    setOption: (payload) => dispatch({type: 'QUOTATIONS_OPTION_P', payload}),
}))(AddProductsModal);