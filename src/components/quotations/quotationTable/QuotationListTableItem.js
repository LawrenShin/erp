import React, {Component} from 'react';
import QuotationTableHeaderItem from './QuotationTableHeaderItem'
import QuotationTableRowItem from './QuotationTableRowItem'
import uuid from 'uuid'

class QuotationListTableItem extends Component {
    heads = ['Style name', 'Product group', 'Shell fabric', 'Color', 'Target price', 'Changes request', '', ''];

    selectFields = (quot) => {
        const selectThese = [ 'name', 'collection', 'suppliers_amount', 'products_amount', 'status' ]
        const selected = Object.keys(quot)
            .filter(key => selectThese.includes(key))
            .reduce((obj, key) => {
                obj[key] = quot[key];
                return obj;
            }, {})
        return selected
    }

    listItems = [
        {
            id: 'prod1',
            name: 'Aisha',
            group: 'Jersy',
            shell_fabric: 'Cotton',
            color: 'Black',
            target_price: '5$',
            change_request: true,
            suppliers: false,
            technical_documents: '/file.pdf'
        },
        {
            id: 'prod2',
            name: 'Aisha',
            group: 'Jersy',
            shell_fabric: 'Cotton',
            color: 'Black',
            target_price: '5$',
            change_request: true,
            suppliers: false,
            technical_documents: '/file.pdf'
        },
        {
            id: 'prod3',
            name: 'Aisha',
            group: 'Jersy',
            shell_fabric: 'Cotton',
            color: 'Black',
            target_price: '5$',
            change_request: true,
            suppliers: false,
            technical_documents: '/file.pdf'
        }
    ]

    render() {
        return (
            <div className='data-table__wrapper'>
                <div className='data-table'>
                    {/* Тут пока думаю как сделать чтобы ширину ячейки передавать, может у тебя мысли есть */}
                    <div className="data-table__header">
                        <QuotationTableHeaderItem heads={this.heads} control={true}/>
                    </div>
                    <div className="data-table__body">
                        {this.listItems.map(listItem => <QuotationTableRowItem
                            key={uuid()}
                            control={true}
                            paused={false}
                            {...listItem} />
                        )}
                    </div>
                </div>
            </div>
        );
    }
};

export default QuotationListTableItem;