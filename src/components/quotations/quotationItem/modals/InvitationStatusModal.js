import React, {Component} from 'react'
import {connect} from 'react-redux'

import Loading from '../../../helpers/loading'
import ModalSemantic from '../../../common/ModalSemantic'
import CommonButton from '../../../common/CommonButton'
import { createListsSelector, createFiltersSelector, createOptionsSelector } from '../../../../ducks/quotations/index'

import QuotationTableHeaderItem from '../../quotationTable/QuotationTableHeaderItem'
import QuotationTableRowModal from '../../quotationTable/QuotationTableRowModal'

import QuotationListFilter from "../../QuotationListFilter"

class InvitationStatusModal extends Component {
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
                            {this.props.invitationStatus && <>
                                <div>Sent: {this.props.invitationStatus.length}</div>
                                <div>Replied: {this.props.invitationStatus.data && this.countReplied(this.props.invitationStatus)}</div>
                            </>}
                        </div>

                        {this.props.filters ? <QuotationListFilter
                            search={true}
                            filters={{
                                name: {
                                    field_class: "CharField",
                                    field_name: "name",
                                    alt_name: 'supplier__name__icontains',
                                    lookup_expr: "icontains",
                                    value: this.props.options.supplier__name__icontains,
                                },
                                status: {...this.props.filters.status, extra: [
                                    {text: 'Waiting', value: 'waiting'}, 
                                    {text: 'Accepted', value: 'accepted'}, 
                                    {text: 'Declined', value: 'declined'}
                                ]},
                            }}
                            options={this.props.options}
                            updateOptions={this.updateOptions}
                            clearAll={this.props.clearOptions}
                            notSplit={true}/> : <Loading/>}
                        <div className='data-table__wrapper'>
                            <div className='data-table'>
                                <div className="data-table__header">
                                    <QuotationTableHeaderItem heads={this.heads} control={false} buttonRemind={true}/>
                                </div>
                                {(this.props.invitationStatus && this.props.invitationStatus.length) ? <div className="data-table__body">
                                    {this.props.invitationStatus.map(listItem => <QuotationTableRowModal
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
                                </div> 
                                    : 
                                    (Array.isArray(this.props.invitationStatus) && 
                                    this.props.invitationStatus.length === 0) ? <h1>No comments were found</h1> 
                                        : 
                                    <Loading className='spinner__wrapper -padding-80' />}
                            </div>
                        </div>
                    </div>
                </div>
            </ModalSemantic>
        );
    }
}

export default connect(state => ({
    invitationStatus: createListsSelector('invitationStatus')(state),
    filters: createFiltersSelector('suppliers')(state),
    options: createOptionsSelector('invitationStatus')(state),
}), dispatch => ({
    clearOptions: () => dispatch({type: 'QUOTATIONS_OPTION_I'}),
    setOption: (payload) => {
        let {value, filterName} = payload
        if(filterName === 'name') filterName = 'supplier__name__icontains'
        return dispatch({ type: 'QUOTATIONS_OPTION_I', payload: {value, filterName} })
    },
    remindSupplier: (payload) => dispatch({type: 'REMIND_SUPPLIER', payload}),
    getSupplierInQuotation: (payload) => dispatch({type: 'GET_SUPPLIER_IN_QUOTATION', payload}),
}))(InvitationStatusModal);