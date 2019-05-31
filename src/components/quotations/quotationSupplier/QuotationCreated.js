import React, {Component} from 'react';

import QuotationHeader from '../QuotationHeader';
import CommonButton from '../../common/CommonButton'
import QuotationTableHeaderItem from '../quotationTable/QuotationTableHeaderItem';
import QuotationListTable from '../quotationTable/QuotationListTable';
import QuotationTableRowSupplier from "../quotationTable/QuotationTableRowSupplier";
import uuid from "uuid";

class QuotationCreated extends Component {

    heads = ['Year', 'Season', 'Theme', 'Brand', 'Department', 'Category', 'Product group', 'Style name', 'Color', 'Gender'];
    listItems = [
        {
            year: '2018',
            season: 'SS',
            theme: 'Theme 1',
            brand: 'Independent',
            department: 'Woman',
            category: 'Textile',
            product_group: 'Blouse',
            style_name: 'Aisha',
            color: 'Blue',
            gender: 'Female',
            buttons: true
        },
        {
            year: '2018',
            season: 'SS',
            theme: 'Theme 1',
            brand: 'Independent',
            department: 'Woman',
            category: 'Textile',
            product_group: 'Blouse',
            style_name: 'Aisha',
            color: 'Blue',
            gender: 'Female',
            buttons: true
        },
        {
            year: '2018',
            season: 'SS',
            theme: 'Theme 1',
            brand: 'Independent',
            department: 'Woman',
            category: 'Textile',
            product_group: 'Blouse',
            style_name: 'Aisha',
            color: 'Blue',
            gender: 'Female',
            buttons: true
        }
    ]

    render() {
        return (
            <>
                <QuotationHeader title="Current quotation has been started" link={false}/>
                <div className="quotation-item__head">
                    <div>
                        {/* Эта часть для шаблона 6- accept/decline on supplier side */}
                            {/*<h2 className="quotation-item__title">Quotation 001</h2>*/}
                        {/* Эта часть для шаблона 6- accept/decline on supplier side */}
                        <div className="quotation-item__head__row">
                            <p><b>Quotation starts date:</b> 19.05.2019</p>
                        </div>
                        <div className="quotation-item__head__row">
                            <p><b>Quotation expiry date:</b> 06.06.2019</p>
                        </div>
                        <div className="quotation-item__head__row">
                            {/* Эта часть для шаблона 11-receive detail */}
                            <CommonButton type='btn2' text='Download all technical pack'/>
                            {/* Эта часть для шаблона 11-receive detail */}

                            {/* Эта часть для шаблона 6- accept/decline on supplier side */}
                            {/*<div className="options-buttons">
                                <CommonButton type='btn2' text='Accept'/>
                                <CommonButton type='btn3' text='Decline'/>
                            </div>*/}
                            {/* Эта часть для шаблона 6- accept/decline on supplier side */}
                        </div>
                    </div>
                </div>
                {/* Эта часть для шаблона 11-receive detail */}
                <div className="quotation__list__title">List of products in quotation</div>
                <div className="data-table">
                    <div className="data-table__header">
                        <QuotationTableHeaderItem heads={this.heads} buttonRemind={true}/>
                    </div>
                    <div className="data-table__body">
                        {this.listItems.map(listItem => <QuotationTableRowSupplier
                            {...listItem} />
                        )}
                    </div>
                </div>
                <div className="quotation__products__submit">
                    <CommonButton type='btn2' text='Enter prices'/>
                </div>
                {/* Эта часть для шаблона 11-receive detail */}
            </>
        );
    }
}

export default (QuotationCreated);