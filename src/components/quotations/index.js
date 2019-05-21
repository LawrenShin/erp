import React, { PureComponent } from 'react';
import { connect}  from 'react-redux';

import Loading from '../helpers/loading'
import QuotationHeader from './QuotationHeader';
import QuotationListFilter from './QuotationListFilter';
import QuotationListTable from './quotationTable/QuotationListTable';
import { 
    quotationsFilters, 
    quotationsList, 
    modalsDataPresence,
    createOptionsSelector,
} from '../../ducks/quotations';

class Quotations extends PureComponent {

    componentDidMount() {
        if (!this.props.filters.data) this.props.getFilters()
        if (!this.props.quotations.data && this.props.options) this.props.getList(this.props.options)
        if(!this.props.modalsDataPresence) this.props.getModalsData()
    }

    render() {
        return (
            <>
                <QuotationHeader title="Quotations" subtitle="List of current quotations"/>
                {this.props.filters.data && this.renderFilters(this.props.filters)}
                {this.props.quotations.data && this.renderTable(this.props.quotations.data)}
            </>
        );
    }

    renderTable = (quotations) => {
        if (quotations.loading) return <Loading/>

        return (
            quotations.count ?
                <QuotationListTable
                    heads={['Name', 'Collection', 'Suppliers amount', 'Quotation status', 'Products amount']}
                    selectThese={[ 'name', 'collection', 'suppliers_amount', 'products_amount', 'status' ]}
                    list={quotations.results} />
                :
                <div className="quotation-item__empty">
                    <h1>No Quotations were found</h1>
                </div>
        )
    }
    renderFilters = (filters) => {
        if (filters.loading) return <Loading/>

    return <QuotationListFilter 
            filters={this.props.filters}
            options={this.props.options}
            updateOptions={this.updateOptions}
            clearOptions={this.clearOptions} />
  }
  updateOptions = (fName, value) => this.props.setOption({filterName: fName, value})
  clearOptions = () => this.props.clearOptions()
}

const mapStateToProps = (state) => ({
    filters: quotationsFilters(state),
    quotations: quotationsList(state),
    options: createOptionsSelector('quotations')(state),
    modalsDataPresence: modalsDataPresence(state)
});

export default connect(mapStateToProps, dispatch => ({
  getFilters: () => dispatch({ type: 'REQUEST_FILTERS_Q' }),
  getList: (payload) => dispatch({ type: 'REQUEST_LIST_Q', payload }),
  setOption: (payload) => dispatch({ type: 'QUOTATIONS_OPTION', payload }),
  clearOptions: () => dispatch({ type: 'QUOTATION_CLEAR_OPTIONS_Q'}),
  getModalsData: () => dispatch({ type: 'REQUEST_MODALS_DATA' })
}))(Quotations)
