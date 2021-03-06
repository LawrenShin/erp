import React, { Component } from 'react';
import QuotationTableHeader from './QuotationTableHeader'
import QuotationTableRow from './QuotationTableRow'
import uuid from 'uuid'

class QuotationListTable extends Component {
    state = {
        heads: this.props.heads || ['Name', 'Collection', 'Suppliers amount', 'Quotation status', 'Products amount'],
        selectThese: this.props.selectThese || [ 'name', 'collection', 'suppliers_amount', 'products_amount', 'status' ]
    }

    selectFields = (quot) => {
        const selected = Object.keys(quot)
            .filter(key => this.state.selectThese.includes(key))
            .reduce((obj, key) => {
                obj[key] = quot[key];
                return obj;
            }, {})
        return selected
    }

    render() {
        return (
            <div className='data-table__wrapper' id={this.props.id ? this.props.id : ''} onScroll={this.props.onScroll}>
                <div className='data-table'>
                    <div className="data-table__header">
                        <QuotationTableHeader 
                            heads={this.state.heads}
                            checkboxHandler={this.props.checkboxHandler} />
                    </div>
                    <div className="data-table__body">
                        {this.props.list.map(listItem => {
                            return (<QuotationTableRow
                                decision={listItem.status_supplier}
                                countries={this.props.countries}
                                checkboxNamePrefix={this.props.checkboxNamePrefix} 
                                wereAdded={('added' in this.props && this.props.added) ? this.props.added.has(listItem.id) : null}
                                checkboxHandler={this.props.checkboxHandler}
                                heads={this.state.heads}
                                listItem={this.selectFields(listItem)}
                                id={listItem.id || listItem.quotation_id}
                                key={uuid()} />)
                            }
                        )}
                    </div>
                </div>
            </div>
        );
    }
};

export default React.memo(QuotationListTable);