import React, {Component} from 'react';
import { connect } from 'react-redux';

import Loading from "../../helpers/loading";
import QuotationHeader from '../QuotationHeader';
import CommonButton from '../../common/CommonButton'
import QuotationTableHeaderItem from '../quotationTable/QuotationTableHeaderItem';
import QuotationListTable from '../quotationTable/QuotationListTable';
import QuotationTableRowSupplier from "../quotationTable/QuotationTableRowSupplier";
import QuotationListFilter from '../QuotationListFilter'

class QuotationBaseList extends Component {
    fake = () => ([
        {
            name: 'Aisha',
            collection: 'Jersy',
            product_amount: 'Cotton',
            status: 'Black',
            sample_status: 'Sent',
        }
    ])

    render() {
        return (
            <>
                <QuotationHeader title="Quotations" subtitle='LIST OF CURRENT QUOTATIONS' link={false} />
                {/* <QuotationListFilter /> */}
                {this.renderTable(this.props.quotations)}
            </>
        );
    }

    componentDidMount(){
        if(!this.props.quotations.data) this.props.loadQuotations()
    }
    
    renderTable = (quotations) => {
        if (quotations.loading) return <Loading/>

        return (
            quotations.data ?
                <QuotationListTable
                    heads={['Name', 'Collection', 'Product amount', 'Quotation status', 'Sample status']}
                    selectThese={[ 'quotation_name', 'collection_name', 'samples_status', 'product_amount', 'status_quotation', 'quotation_id' ]}
                    list={quotations.data} />
                :
                <div className="quotation-item__empty">
                    <h1>No Quotations were found</h1>
                </div>
        )
    }
}

export default connect(state => ({
    quotations: state.quotations.supplierPart.invitedQuotations
}), dispatch => ({
    loadQuotations: () => dispatch({type: 'LOAD_Q_LIST_FOR_SUPPLIER' })
}))(QuotationBaseList);