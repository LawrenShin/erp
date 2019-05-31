import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import {listExtender} from '../../../common/helperFunctions'
import Loading from '../../../helpers/loading'
import ModalSemantic from '../../../common/ModalSemantic'
import CommonButton from '../../../common/CommonButton'
import QuotationListTable from '../../quotationTable/QuotationListTable'
import QuotationListFilter from '../../QuotationListFilter'
import QuotationsApi from '../../../../requestor/quotations'

import {createListsSelector, createFiltersSelector, createOptionsSelector} from '../../../../ducks/quotations/index'
import _ from 'lodash'

class AddProductsModal extends PureComponent {
    state = { added: false }

    componentDidMount() {
        if (!this.state.added || !this.state.added.length) this.setState({added: this.props.addedProducts})
        if (!this.props.list || !this.props.filters) this.props.getModalsData()
    }
    updateOptions = (fName, value) => this.props.setOption({filterName: fName, value})

    addProductToQuotation = async (id) => {
        try {
            const res = await QuotationsApi.addProductToQuotation({ product: id, quotation: this.props.quotationId })
            this.manageStateOnAddRemoveProducts(res)
        } catch (e) {
            console.log(e.message)
        }
    }
    removeProductFromQuotation = async (id) => {
        try {
            const relation = this.state.added.filter(relation => relation.product === id)[0]
            const res = await QuotationsApi.deleteProductFromQuotation(relation.id)
            this.manageStateOnAddRemoveProducts(id)
        } catch (e) {
            console.log(e.message)
        }
    }

    manageStateOnAddRemoveProducts = (actionResult) => {
        this.refreshAdded()
        if (typeof actionResult === 'object' && 'id' in actionResult) this.setState({ added: [...this.state.added, actionResult ]})
        if (typeof actionResult === 'number') this.setState({added: this.state.added.filter(ap => ap.product !== actionResult)})
    }
    findMatch = (id) => this.state.added.filter(ap => ap.product === id).length
    refreshAdded = () => this.props.refreshAddedProductsInQuotation()

    render() {
        const {filters, list} = this.props
        if (filters && list) listExtender(this.props.list.results, {
            theme: filters.theme.extra,
            category: filters.category.extra,
            color: filters.color.extra,
        })

        return (
            <ModalSemantic
                size='large'
                onClose={this.handleClose}
                style={{marginLeft: '0 !important'}}
                trigger={<CommonButton disabled={this.props.disabled} type="btn2" text="Add products"/>}>
                <div className="quotation-modal">
                    <div className="quotation-modal__content -lg -gray-bg">
                        <h2>Select products for quotation</h2>

                        {this.props.filters ? <QuotationListFilter
                            filters={this.props.filters}
                            options={this.props.options}
                            updateOptions={this.updateOptions}
                            clearAll={this.props.clearOptions}
                            notSplit={true}/> : <Loading/>}

                        {this.props.list ? <QuotationListTable
                            checkboxNamePrefix={'addProduct_'}
                            addedProducts={this.state.added}
                            checkboxHandler={{add: this.addProductToQuotation, remove: this.removeProductFromQuotation}}
                            findMatch={this.findMatch}
                            heads={['Year', 'Theme', 'Department', 'Category', 'Color']}
                            selectThese={['year', 'theme', 'department', 'category', 'color']}
                            list={this.props.list.results}/> : <Loading/>}
                    </div>
                </div>
            </ModalSemantic>
        );
    }
}

export default connect(state => ({
    list: createListsSelector('products')(state),
    filters: createFiltersSelector('products')(state),
    options: createOptionsSelector('products')(state),
}), dispatch => ({
    getModalsData: () => dispatch({type: 'REQUEST_MODALS_DATA'}),
    clearOptions: () => dispatch({type: 'QUOTATIONS_OPTION_P'}),
    setOption: (payload) => dispatch({type: 'QUOTATIONS_OPTION_P', payload}),
}))(AddProductsModal);