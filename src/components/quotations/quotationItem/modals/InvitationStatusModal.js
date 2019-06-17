import React, {Component} from 'react'
import {connect} from 'react-redux'

import Loading from '../../../helpers/loading'
import ModalSemantic from '../../../common/ModalSemantic'
import CommonButton from '../../../common/CommonButton'
import { createFiltersSelector, createOptionsSelector } from '../../../../ducks/quotations/index'

import QuotationTableHeaderItem from '../../quotationTable/QuotationTableHeaderItem'
import QuotationTableRowModal from '../../quotationTable/QuotationTableRowModal'

import QuotationListFilter from "../../QuotationListFilter"

class InvitationStatusModal extends Component {
    componentDidMount() {
        this.props.getInvitationStatus(this.props.quotationId)
    }

    updateOptions = (fName, value) => this.props.setOption({filterName: fName, value})

    heads = ['', 'ID', 'Name', 'Status',  'Country'];

    handleRemindSupplier = (id) => this.props.remindSupplier({ quotation_id: this.props.quotationId, supplier_id: id })
    handleGetSupplierInQuotation = (id) => this.props.getSupplierInQuotation({ quotation_id: this.props.quotationId, supplier_id: id })
    countReplied = (invitedSuppliers) => invitedSuppliers.filter(is => is.status === 'accepted').length

    render() {
        return (
            <ModalSemantic
                size='large'
                style={{marginLeft: '0 !important'}}
                trigger={<CommonButton disabled={this.props.disabled} type="btn2" text="Invitation status"/>}>
                <div className="quotation-modal">
                    <div className="quotation-modal__content -lg -gray-bg">
                        <h2>Invitation Status</h2>

                        <div className="quotation-modal__count">
                            <div>Sent: {this.props.invitationStatus.data.length}</div>
                            <div>Replied: {this.props.invitationStatus.data && this.countReplied(this.props.invitationStatus.data)}</div>
                        </div>

                        {this.props.filters ? <QuotationListFilter
                            search={true}
                            filters={this.props.filters}
                            options={this.props.options}
                            updateOptions={this.updateOptions}
                            clearAll={this.props.clearOptions}
                            notSplit={true}/> : <Loading/>}
                        <div className='data-table__wrapper'>
                            <div className='data-table'>
                                <div className="data-table__header">
                                    <QuotationTableHeaderItem heads={this.heads} control={false} buttonRemind={true}/>
                                </div>
                                {this.props.invitationStatus.data.length ? <div className="data-table__body">
                                    {this.props.invitationStatus.data.map(listItem => <QuotationTableRowModal
                                            invitationModal={true}
                                            show_id={true}
                                            name={listItem.supplier.name}
                                            status={listItem.supplier.status}
                                            // group={listItem.group}
                                            country={listItem.supplier.legal_country && listItem.supplier.legal_country.name}
                                            invitation_status={listItem.status}
                                            // confirmed={listItem.confirmed}
                                            id={listItem.supplier_id}
                                            key={listItem.id}

                                            buttonRemind={true}
                                            handleRemindSupplier={this.handleRemindSupplier}
                                            handleGetSupplierInQuotation={this.handleGetSupplierInQuotation}
                                        />
                                    )}
                                </div> : <Loading />}
                            </div>
                        </div>
                    </div>
                </div>
            </ModalSemantic>
        );
    }
}

export default connect(state => ({
    invitationStatus: state.quotations.currentQuotationReducer.invitationStatus,
    filters: createFiltersSelector('suppliers')(state),
    options: createOptionsSelector('suppliers')(state),
}), dispatch => ({
    getModalsData: () => dispatch({type: 'REQUEST_MODALS_DATA'}),
    clearOptions: () => dispatch({type: 'CLEAR_QUOTATIONS_OPTION_S'}),
    setOption: (payload) => dispatch({type: 'QUOTATIONS_OPTION_S', payload}),
    getInvitationStatus: (payload) => dispatch({type: 'GET_INVITATION_STATUS', payload}),
    remindSupplier: (payload) => dispatch({type: 'REMIND_SUPPLIER', payload}),
    getSupplierInQuotation: (payload) => dispatch({type: 'GET_SUPPLIER_IN_QUOTATION', payload}),
}))(InvitationStatusModal);