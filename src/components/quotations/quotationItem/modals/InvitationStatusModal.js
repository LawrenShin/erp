import React, {Component} from 'react';
import {connect} from 'react-redux'

import Loading from '../../../helpers/loading'
import ModalSemantic from '../../../common/ModalSemantic'
import CommonButton from '../../../common/CommonButton'
import {createListsSelector, createFiltersSelector, createOptionsSelector} from '../../../../ducks/quotations/index'

import QuotationTableHeaderItem from '../../quotationTable/QuotationTableHeaderItem'
import QuotationTableRowItem from '../../quotationTable/QuotationTableRowItem'

import CheckboxComponent from "../../../CheckboxComponent"
import QuotationListFilter from "../../QuotationListFilter";

class InvitationStatusModal extends Component {
    componentDidMount() {
        if (!this.props.list || !this.props.filters) this.props.getModalsData()
    }

    updateOptions = (fName, value) => this.props.setOption({filterName: fName, value})

    heads = ['', 'ID', 'Name', 'Status', 'Product group', 'Country', ''];
    listItems = [
        {
            id: 'prod1',
            name: 'Aisha',
            group: 'Jersy',
            shell_fabric: 'Cotton',
            color: 'Black',
            target_price: '5$',
            change_request: false,
            suppliers: true,
            technical_documents: '/file.pdf',
            gender: 'Woman',
            age: '18',
            country: 'China',
            status: 'active',
            invitation_status: true,
            confirmed: true
        },
        {
            id: 'prod2',
            name: 'Aisha',
            group: 'Jersy',
            shell_fabric: 'Cotton',
            color: 'Black',
            target_price: '5$',
            change_request: false,
            suppliers: true,
            technical_documents: '/file.pdf',
            gender: 'Woman',
            age: '18',
            country: 'China',
            status: 'active',
            invitation_status: true,
            confirmed: false
        },
        {
            id: 'prod3',
            name: 'Aisha',
            group: 'Jersy',
            shell_fabric: 'Cotton',
            color: 'Black',
            target_price: '5$',
            change_request: false,
            suppliers: true,
            technical_documents: '/file.pdf',
            gender: 'Woman',
            age: '18',
            country: 'China',
            status: 'active',
            invitation_status: true,
            confirmed: true
        }
    ]

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
                            <div>Sent: 20</div>
                            <div>Replied: 3</div>
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
                                <div className="data-table__body">
                                    {this.listItems.map(listItem => <QuotationTableRowItem
                                            show_id={true}
                                            name={listItem.name}
                                            group={listItem.group}
                                            status={listItem.status}
                                            country={listItem.country}
                                            invitation_status={listItem.invitation_status}
                                            confirmed={listItem.confirmed}
                                            id={listItem.id}
                                            key={listItem.id}
                                            buttonRemind={true}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
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
}))(InvitationStatusModal);