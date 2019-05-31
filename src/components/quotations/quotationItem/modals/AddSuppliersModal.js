import React, {PureComponent} from 'react';
import {connect} from 'react-redux'

import {listExtender} from '../../../common/helperFunctions'
import Loading from '../../../helpers/loading'
import ModalSemantic from '../../../common/ModalSemantic'
import CommonButton from '../../../common/CommonButton'
import QuotationListTable from '../../quotationTable/QuotationListTable'
import QuotationListFilter from '../../QuotationListFilter'
import QuotationsApi from '../../../../requestor/quotations'
import CommonApi from '../../../../requestor/common'

import {createListsSelector, createFiltersSelector, createOptionsSelector} from '../../../../ducks/quotations/index'

class AddSuppliersModal extends PureComponent {
    state = { added: false, countries: false }

    async componentDidMount() {
        if (!this.state.countries) {
            const countries = await CommonApi.getCountries().then(res => res.results)
            this.setState({countries})
        }
        if (!this.props.list || !this.props.filters) this.props.getModalsData()
        if (!this.state.added || !this.state.added.length) this.setState({ added: this.props.addedSuppliers })
    }

    updateOptions = (fName, value) => this.props.setOption({filterName: fName, value})

    addSupplierToQuotation = async (id) => {
        try {
            const res = await QuotationsApi.addSupplierToQuotation({ supplier: id, quotation: this.props.quotationId })
            this.manageStateOnAddRemoveSuppliers(res)
        } catch (e) {
            console.log(e.message)
        }
    }
    removeSupplierFromQuotation = async (id) => {
        try {
            const relation = this.state.added.filter(relation => relation.supplier === id)[0]
            const res = await QuotationsApi.deleteSupplierFromQuotation(relation.id)
            this.manageStateOnAddRemoveSuppliers(id)
        } catch (e) {
            console.log(e.message)
        }
    }

    manageStateOnAddRemoveSuppliers = (actionResult) => {
        this.refreshAdded()
        if (typeof actionResult === 'object' && 'id' in actionResult) this.setState({added: [...this.state.added, actionResult ]})
        if (typeof actionResult === 'number') this.setState({added: this.state.added.filter(ap => ap.supplier !== actionResult)})
    }
    findMatch = (id) => this.state.added.filter(ap => ap.supplier === id).length
    refreshAdded = () => this.props.refreshAddedSuppliersInQuotation()

    render() {
        return (
            <ModalSemantic
                size='large'
                onClose={this.refreshAdded}
                style={{marginLeft: '0 !important'}}
                trigger={<CommonButton disabled={this.props.disabled} type="btn2" text="Add suppliers"/>}>
                <div className="quotation-modal">
                    <div className="quotation-modal__content -lg -gray-bg">
                        <h2>Select suppliers for quotation</h2>
                        {this.props.filters ? <QuotationListFilter
                            filters={this.props.filters}
                            options={this.props.options}
                            updateOptions={this.updateOptions}
                            clearAll={this.props.clearOptions}
                            notSplit={true}/> : <Loading/>}

                        {(this.props.list && this.state.countries) ? <QuotationListTable
                            checkboxNamePrefix={'addSupplier_'}
                            addedSuppliers={this.state.added}
                            checkboxHandler={{
                                add: this.addSupplierToQuotation,
                                remove: this.removeSupplierFromQuotation
                            }}
                            findMatch={this.findMatch}
                            heads={['ID', 'Name', 'Status', 'Product group', 'Country']}
                            selectThese={['id', 'name', 'status', 'categories', 'legal_country']}
                            list={this.props.list.results}/> : <Loading/>}
                    </div>
                </div>
            </ModalSemantic>
        );
    }
}

export default connect(state => ({
    list: createListsSelector('suppliers')(state),
    filters: createFiltersSelector('suppliers')(state),
    options: createOptionsSelector('suppliers')(state),
}), dispatch => ({
    getModalsData: () => dispatch({type: 'REQUEST_MODALS_DATA'}),
    clearOptions: () => dispatch({type: 'CLEAR_QUOTATIONS_OPTION_S'}),
    setOption: (payload) => dispatch({type: 'QUOTATIONS_OPTION_S', payload}),
}))(AddSuppliersModal);