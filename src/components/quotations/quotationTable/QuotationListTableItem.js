import React, {Component} from 'react';
import { connect } from 'react-redux'
import QuotationTableHeaderItem from './QuotationTableHeaderItem'
import QuotationTableRowItem from './QuotationTableRowItem'
import uuid from 'uuid'
import Api from "../../../requestor/api";

class QuotationListTableItem extends Component {
    state = {
        sample: []
    };

    heads = ['Style name', 'Product group', 'Shell fabric', 'Color', 'Target price', 'Changes request'];

    selectFields = (quot) => {
        const selectThese = [ 'style', 'nomenclature_group', 'shell_fabric_1', 'color' ]
        const selected = Object.keys(quot)
            .filter(key => selectThese.includes(key))
            .reduce((obj, key) => {
                obj[key] = quot[key];
                return obj;
            }, {})
        return selected
    }

    async componentDidMount() {
        const sample = await Api.get(`quotations/supplier_item/?quotation=${this.props.quotId}`).then(res => res.results);
        this.setState({sample})
    }

    render() {
        return (
            <div className='data-table__wrapper'>
                <div className='data-table'>
                    {/* Тут пока думаю как сделать чтобы ширину ячейки передавать, может у тебя мысли есть */}
                    <div className="data-table__header">
                        <QuotationTableHeaderItem 
                            techDocs={true}
                            heads={this.heads} 
                            control={true} 
                            addedSuppliers={this.props.suppliers.data} />
                    </div>
                    <div className="data-table__body">
                        {this.props.products.data.map(listItem => <QuotationTableRowItem
                            key={uuid()}
                            status={this.props.quotationInfo.is_samples_requested}
                            sample={this.state.sample}
                            control={true}
                            paused={listItem.pause}
                            addedSuppliers={this.props.suppliers.data}
                            distributedRelations={this.props.distributedRelations.data.filter(dr => dr.product === listItem.product.id)}
                            productRelations={this.props.productRelations}
                            {...listItem.product} />
                        )}
                    </div>
                </div>
            </div>
        );
    }
};

export default connect(state => ({
    distributedRelations: state.quotations.currentQuotationReducer.distributedRelations,
    quotationInfo: state.quotations.currentQuotationReducer.currentQuotation.data,
    productRelations: state.quotations.currentQuotationReducer.addedProductsRelations.data
}))(QuotationListTableItem)