import React, {Component} from 'react';

import QuotationHeader from '../QuotationHeader';
import CommonButton from '../../common/CommonButton'
import QuotationTableHeaderItem from '../quotationTable/QuotationTableHeaderItem';
import QuotationListTable from '../quotationTable/QuotationListTable';
import QuotationTableRowSupplier from "../quotationTable/QuotationTableRowSupplier";
import uuid from "uuid";

class QuotationAcceptSample extends Component {

    heads = ['Style name', 'Product group', 'Shell fabric', 'Color', 'Changes request', 'Target price', 'Enter your price'];
    listItems = [
        {
            style_name: 'Aisha',
            product_group: 'Jersy',
            shell_fabric: 'Cotton',
            color: 'Black',
            target_price: '5$',
        },
        {
            style_name: 'Aisha',
            product_group: 'Jersy',
            shell_fabric: 'Cotton',
            color: 'Black',
            target_price: '5$',
        },
        {
            style_name: 'Aisha',
            product_group: 'Jersy',
            shell_fabric: 'Cotton',
            color: 'Black',
            target_price: '5$',
        }
    ]

    render() {
        return (
            <>
                <QuotationHeader title="Quotation 1" link={false}/>
                <div className="quotation-item__head">
                    <div>
                        <div className="quotation-item__head__row">
                            <p><b>Quotation starts date:</b> 19.05.2019</p>
                        </div>
                        <div className="quotation-item__head__row">
                            <p><b>Quotation expiry date:</b> 06.06.2019</p>
                        </div>
                        <div className="quotation__list__title">Please send proto sampless till <span
                            className="-text-color-blue">21.05.2019</span></div>
                        <div className="quotation-item__head__row">
                            <CommonButton type='btn2' text='Accept samples'/>
                        </div>
                    </div>
                </div>
                <div className="data-table">
                    <div className="data-table__header">
                        <QuotationTableHeaderItem heads={this.heads}/>
                    </div>
                    <div className="data-table__body">
                        {this.listItems.map(listItem => <QuotationTableRowSupplier
                            {...listItem} />
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default (QuotationAcceptSample)