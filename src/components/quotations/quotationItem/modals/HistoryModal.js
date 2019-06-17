import React, {Component} from 'react';
import {connect} from 'react-redux'

import Loading from '../../../helpers/loading'
import ModalSemantic from '../../../common/ModalSemantic'
import CommonButton from '../../../common/CommonButton'
import {createListsSelector, createFiltersSelector, createOptionsSelector} from '../../../../ducks/quotations/index'

import QuotationTableHeaderItem from '../../quotationTable/QuotationTableHeaderItem'
import QuotationTableRowModal from '../../quotationTable/QuotationTableRowModal'

import CheckboxComponent from "../../../CheckboxComponent"
import QuotationListFilter from "../../QuotationListFilter";

class HistoryModal extends Component {
    updateOptions = (fName, value) => this.props.setOption({filterName: fName, value})

    heads = ['ID', 'Date', 'Style name', 'Product group', 'Color', 'Target price', 'Supplier', 'Price', 'Description'];

    render() {
        return (
            <ModalSemantic
                size='large'
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
                                    <QuotationTableHeaderItem heads={this.heads}/>
                                </div>
                                <div className="data-table__body">
                                    {this.props.history.data.results && this.props.history.data.results.map(historyItem => <QuotationTableRowModal
                                        show_id={true}
                                        suppliers={false}
                                        invitationModal={true}
                                        {...historyItem} />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="options-buttons quotation-modal__buttons">
                            <button className="btn btn2 btn-save" type="button">Export XLS</button>
                            {/* <button className="btn btn1 btn-save" type="button">Close</button> */}
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
    history: state.quotations.currentQuotationReducer.history,
}), dispatch => ({
    getModalsData: () => dispatch({type: 'REQUEST_MODALS_DATA'}),
    clearOptions: () => dispatch({type: 'CLEAR_QUOTATIONS_OPTION_S'}),
    setOption: (payload) => dispatch({type: 'QUOTATIONS_OPTION_S', payload}),
}))(HistoryModal);