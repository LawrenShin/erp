import React, {PureComponent} from 'react';

import uuid from 'uuid'
import Loading from '../../helpers/loading'
import { connect } from 'react-redux'
import QuotationHeader from '../QuotationHeader';
import CommonButton from '../../common/CommonButton'
import QuotationTableHeaderItem from '../quotationTable/QuotationTableHeaderItem';
import QuotationTableRowSupplier from "../quotationTable/QuotationTableRowSupplier";

class QuotationEnterPrice extends PureComponent {
    componentDidMount(){
        if(!this.props.products.data.length) this.props.loadProducts(this.props.match.params.id)
        this.props.loadComments(this.props.match.params.id)
        this.props.getRequestChanges()
    }

    render() {
        return (
            <>
                <QuotationHeader title={`Quotation ${this.props.match.params.id}`} link={false}/>
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
                <>
                    <div className="quotation__list__title">List of products in quotation</div>
                    <div className="data-table">
                        <div className="data-table__header">
                            <QuotationTableHeaderItem 
                                heads={['Style name', 'Product group', 'Shell fabric', 'Color', 'Changes request', 'Enter your price', '']} 
                                enter_price={true} />
                        </div>
                        {(this.props.products.data.length && this.props.requestedChanges.data) ? <div className="data-table__body">
                            {this.props.products.data.map(product => {
                                const { id, style, shell_fabric_1, nomenclature_group, color, price } = product
                                const requestedChangesCount = this.props.requestedChanges.data.filter(rc => rc.distribution_id === id)[0]
                                return (<QuotationTableRowSupplier
                                    key={uuid()}
                                    product_item={product.product_item_id}
                                    price={price}
                                    sendPrice={this.props.sendPrice}
                                    declineProduct={this.props.declineProduct}
                                    id={id}
                                    color={color}
                                    style_name={style}
                                    shell_fabric={shell_fabric_1}
                                    nomenclature_group={nomenclature_group}
                                    requestedChangesCount={requestedChangesCount !== undefined ? requestedChangesCount.requests_count : null}
                                    enter_price={true} />)
                            })}
                        </div>
                            :
                        <span>No products in quotation</span>}
                    </div>
                </>}
            </>
        );
    }
}

export default connect(state => ({
    products: state.quotations.supplierPart.viewedQuotation.products,
    requestedChanges: state.quotations.supplierPart.viewedQuotation.requestedChanges,
}), (dispatch, ownProps) => ({
    loadProducts: (id) => dispatch({ type: 'LOAD_PRODUCTS_FOR_SUPPLIER', payload: id }),
    sendPrice: (data) => dispatch({ type: 'NEW_PRICE_FROM_SUPPLIER', payload: {...data, quotationId: ownProps.match.params.id} }),
    declineProduct: (id) => dispatch({ type: 'DECLINE_PRODUCTS_FOR_SUPPLIER', payload: { distributionId: id, quotationId: ownProps.match.params.id } }),
    loadComments: (id) => dispatch({ type: 'LOAD_COMMENTS', payload: id }),
    getRequestChanges: () => dispatch({ type: 'GET_REQUEST_CHANGES' }),
}))(QuotationEnterPrice);