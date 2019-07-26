import React, {PureComponent} from 'react';
import {connect} from 'react-redux'

import Loading from '../../../helpers/loading'
import ModalSemantic from '../../../common/ModalSemantic'
import CommonButton from '../../../common/CommonButton'
import QuotationListTable from '../../quotationTable/QuotationListTable'
import QuotationListFilter from '../../QuotationListFilter'
import QuotationsApi from '../../../../requestor/quotations'
import CommonApi from '../../../../requestor/common'
import PopupCallback from "../../../common/PopupCallback";

import {createListsSelector, createFiltersSelector, createOptionsSelector} from '../../../../ducks/quotations/index'

class AddSuppliersModal extends PureComponent {
    state = {countries: false, send: false};

    async componentDidMount() {
        if (!this.state.countries) {
            const countries = await CommonApi.getCountries().then(res => res.results)
            this.setState({countries})
        }
    }

    updateOptions = (fName, value) => this.props.setOption({filterName: fName, value})

    addSupplierToQuotation = async (id) => {
        try {
            const res = await QuotationsApi.addSupplierToQuotation({supplier: id, quotation: this.props.quotationId});
            this.handleRefresh();
        } catch (e) {
            console.log(e.message)
        }
    }
    removeSupplierFromQuotation = async (id) => {
        try {
            const res = await QuotationsApi.deleteSupplierFromQuotation({
                supplier_id: id,
                quotation_id: this.props.quotationId
            })
        } catch (e) {
            console.log(e.message)
        }
    }

    handleRefresh = () => this.props.refreshAdded(this.props.quotationId);
    handleClose = () => this.props.refreshAdded(this.props.quotationId);
    handleInvitation = () => {
        this.props.sendInvitation(this.props.quotationId);
        this.setState({send: true});
        this.props.popupModal({text: 'Invitation has been sent.', time: 2000,})
        setTimeout(function () {
            this.setState({send: false});
        }.bind(this), 2000);
    };

    onScroll = async () => {
        const el = document.getElementById("modalAddSupplier");
       if(el.scrollHeight - el.scrollTop - el.offsetHeight === 0) this.props.setOption({ filterName: 'offset', value: this.props.offset + 50 })
    };

    render() {
        return (
            <>
                <PopupCallback text='Invitation was sent' visible={this.state.send} />
                <ModalSemantic
                    className='-select-supplier-modal'
                    size='large'
                    onClose={this.handleClose}
                    style={{marginLeft: '0 !important'}}
                    trigger={<CommonButton disabled={this.props.disabled} type="btn2" text="Add suppliers"/>}>
                    <div className="quotation-modal -select-supplier">
                        <div className="quotation-modal__content -lg -gray-bg">
                            <h2>Select suppliers for quotation</h2>

                            {this.props.filters ? <QuotationListFilter
                                filters={this.props.filters}
                                options={this.props.options}
                                updateOptions={this.updateOptions}
                                clearAll={this.props.clearOptions}
                                notSplit={true}/> : <Loading/>}

                            {(this.props.list && this.state.countries) ? <QuotationListTable
                                id='modalAddSupplier'
                                checkboxNamePrefix={'addSupplier_'}
                                onScroll={this.onScroll}
                                added={this.props.added}
                                checkboxHandler={{
                                    add: this.addSupplierToQuotation,
                                    remove: this.removeSupplierFromQuotation
                                }}
                                heads={['ID', 'Name', 'Status', 'Categories', 'Country']}
                                selectThese={['id', 'name', 'status', 'categories', 'legal_country']}
                                list={this.props.list.results}/> : <Loading/>}
                            <div className='options-buttons quotation-modal__buttons'>
                                <CommonButton type='btn2' text='Send invitation' onClick={this.handleInvitation}/>
                            </div>

                        </div>
                    </div>
                </ModalSemantic>
            </>
        );
    }
}

export default connect(state => ({
    list: createListsSelector('suppliers')(state),
    offset: state.quotations.mainQuotationReducer.lists.suppliers.options.offset,
    filters: createFiltersSelector('suppliers')(state),
    options: createOptionsSelector('suppliers')(state),
}), dispatch => ({
    getModalsData: () => dispatch({type: 'REQUEST_MODALS_DATA'}),
    clearOptions: () => dispatch({type: 'QUOTATIONS_OPTION_S'}),
    setOption: (payload) => dispatch({type: 'QUOTATIONS_OPTION_S', payload}),
    sendInvitation: (payload) => dispatch({type: 'SEND_INVITATION', payload}),
    popupModal: (payload) => dispatch({type: 'POPUP_MODAL', payload})
}))(AddSuppliersModal);