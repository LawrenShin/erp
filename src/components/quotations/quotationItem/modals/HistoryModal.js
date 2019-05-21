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

class HistoryModal extends Component {
    componentDidMount() {
        if (!this.props.list || !this.props.filters) this.props.getModalsData()
    }

    updateOptions = (fName, value) => this.props.setOption({filterName: fName, value})

    heads = ['ID', 'Date', 'Style name', 'Product group', 'Color', 'Target price', 'Supplier', 'Price', 'Description'];
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
            confirmed: true,
            date: '12.10.2019',
            price: '4$',
            description: 'Sleeve length chanhed to 40cm'
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
            confirmed: false,
            date: '12.10.2019',
            price: '4$',
            description: 'Sleeve length chanhed to 40cm'
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
            confirmed: true,
            date: '12.10.2019',
            price: '4$',
            description: 'Sleeve length chanhed to 40cm'
        }
    ]

    render() {
        return (
            <ModalSemantic
                style={{marginLeft: '0 !important'}}
                trigger={<CommonButton disabled={this.props.disabled} type="btn2" text="History"/>}>
                <div className="quotation-modal">
                    <div className="quotation-modal__content -lg -gray-bg">
                        <h2>History</h2>

                        {this.props.filters ? <QuotationListFilter
                            search={false}
                            filters={this.props.filters}
                            options={this.props.options}
                            updateOptions={this.updateOptions}
                            clearAll={this.props.clearOptions}
                            notSplit={true}/> : <Loading/>}
                        <div className='data-table__wrapper'>
                            <div className='data-table'>
                                <div className="data-table__header">
                                    <QuotationTableHeaderItem heads={this.heads} />
                                </div>
                                <div className="data-table__body">
                                    {this.listItems.map(listItem => <QuotationTableRowItem
                                        show_id={true}
                                        name={listItem.name}
                                        group={listItem.group}
                                        id={listItem.id}
                                        key={listItem.id}
                                        date={listItem.date}
                                        color={listItem.color}
                                        target_price={listItem.target_price}
                                        price={listItem.price}
                                        suppliers={true}
                                        description={listItem.description}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="options-buttons quotation-modal__buttons">
                            <button className="btn btn2 btn-save" type="button">Export XLS</button>
                            <button className="btn btn1 btn-save" type="button">Close</button>
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
}))(HistoryModal);