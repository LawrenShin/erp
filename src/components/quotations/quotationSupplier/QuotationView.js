import React, {PureComponent} from 'react';

import uuid from 'uuid'
import Loading from '../../helpers/loading'
import QuotationHeader from '../QuotationHeader';
import CommonButton from '../../common/CommonButton'
import QuotationTableHeaderItem from '../quotationTable/QuotationTableHeaderItem';
import QuotationTableRowSupplier from "../quotationTable/QuotationTableRowSupplier";
import { connect } from 'react-redux';
import { history } from '../../../routes/history'

class QuotationView extends PureComponent {
    componentDidMount(){
        this.props.enterPrice && history.push(`/quotations/enter_price/${this.props.match.params.id}`)
        this.props.loadProducts(this.props.match.params.id)
    }

    heads = ['Year', 'Season', 'Theme', 'Brand', 'Department', 'Category', 'Product group', 'Style name', 'Color', 'Gender'];

    render() {
        return (
            <>
                <QuotationHeader title="Current quotation has been started" link={false}/>
                <div className="quotation-item__head">
                    <div>
                        <div className="quotation-item__head__row">
                            <p><b>Quotation starts date:</b> 19.05.2019</p>
                        </div>
                        <div className="quotation-item__head__row">
                            <p><b>Quotation expiry date:</b> 06.06.2019</p>
                        </div>
                        <div className="quotation-item__head__row">
                            <CommonButton type='btn2' text='Download all technical pack'/>
                        </div>
                    </div>
                </div>
                {this.props.products.loading ? <Loading /> 
                    :
                this.props.products.data.length ? <>
                    <div className="quotation__list__title">List of products in quotation</div>
                        <div className="data-table">
                            <div className="data-table__header">
                                <QuotationTableHeaderItem heads={this.heads} buttonRemind={true}/>
                            </div>
                            <div className="data-table__body">
                                {this.props.products.data.map(product => <QuotationTableRowSupplier
                                        key={uuid()}
                                        button={true}
                                        declineProduct={this.props.declineProduct}
                                        downloadTechPack={this.props.downloadTechPack}
                                        {...product} />
                                )}
                            </div>
                        </div>
                        <div className="quotation__products__submit">
                            <CommonButton onClick={() => history.push(`/quotations/enter_price/${this.props.match.params.id}`)} type='btn2' text='Enter prices'/>
                        </div>
                    </> : <span>No products in quotation</span>
                }
            </>
        );
    }
}

export default connect(state => {
    const enterPrice = state.quotations.supplierPart.viewedQuotation.products.data.length ? 'target_price' in state.quotations.supplierPart.viewedQuotation.products.data[0] ? true : false : false
    return {
        products: state.quotations.supplierPart.viewedQuotation.products,
        enterPrice,
    }
}, (dispatch, ownProps) => ({
    loadProducts: (id) => dispatch({ type: 'LOAD_PRODUCTS_FOR_SUPPLIER', payload: id }),
    declineProduct: (id) => dispatch({ type: 'DECLINE_PRODUCTS_FOR_SUPPLIER', payload: { distributionId: id, quotationId: ownProps.match.params.id } }),
}))(QuotationView);