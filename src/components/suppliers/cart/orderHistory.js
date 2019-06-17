import React, {Component} from 'react';
import Pointer from '../../controls/pointer';
import Input from '../../controls/input';
import MinMax from '../../controls/min-max';
import Header from './header';
import {Dropdown, Tab} from 'semantic-ui-react';
import Options from '../../controls/options-multi';
import Checkbox from '../../controls/checkbox';
import TextArea from '../../controls/text-area';
import {connect} from 'react-redux';
import {singleSupplierSelector} from '../../../selectors/suppliers';
import {createRequestAction} from '../../../actions/index';
import Loading from '../../helpers/loading';
import Slider from '../../controls/slider';
import PaymentTerms from '../create/forms/PaymentTerms';
import styled from 'styled-components';
import {Formik} from 'formik';
import CheckboxComponent from '../../CheckboxComponent';
import IncotermsContactForm from '../create/forms/incoterms/IncotermsContactForm';
import Api from '../../../requestor/api';
import Common from '../../../requestor/common';
import axios from 'axios';
import Table from './orderTable';

const Submit = styled(({className, ...props}) =>
    <input type="submit" className={"btn " + className} {...props} value="Save"/>)`
margin-top: 20px;
width: fit-content;
`;

class ViewSuppierOrderHistory extends Component {
    state = {
        tableWidth: 0,
        tableHeight: 0
    };

    ref = React.createRef();

    headers = [
        'Year',
        'Season',
        'Theme',
        'Brand',
        'Total order qnty',
        'Total order amount',
        'Order currency',
        'Purchaser',
        'Order number',
        'Order status'
    ];

    getHeight = () => {
        const height = document.body.clientHeight - this.ref.current.getBoundingClientRect().bottom - 120;
        return height < 600 ? height : 600;
    }

    onResize = () => {
        this.setState({tableWidth: this.ref.current.clientWidth - 40, tableHeight: this.getHeight()});
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }

    componentDidMount() {
        window.addEventListener("resize", this.onResize);
        this.onResize();

        if (this.props.needToGetSupplier)
            this.props.getById();
        this.props.getOrderList();
    }

    render() {
        const {readOnly, supplier} = this.props;

        const {id, name} = supplier.data;

        return (
            <>
                <Header id={id} name={name} selected="4" edit={!readOnly}/>

                <div className="box-bg-cards" ref={this.ref}>

                    {
                        [supplier.state].includes("loading") ?
                            <Loading/> :
                            supplier.state === "fail" ?
                                <p>{supplier.message}</p> :

                                <>
                                    <div className="cards-back"><a href="#">Show option history</a></div>

                                    <Formik initialValues={
                                        {}

                                    }
                                            validateOnBlur={false}
                                            onSubmit={(values, actions) => {
                                                actions.setSubmitting(false);
                                            }}
                                            render={({values, handleSubmit, handleChange, handleBlur}) => (

                                                <form>
                                                    <div className="filters-header">
                                                        <span className="filters-header__title">Filters</span>
                                                        <button type="reset" className="filters-header__reset">Clear all<i
                                                            className="icon-trash"></i></button>
                                                    </div>

                                                    <div
                                                        className="filters-box filters-box_smallitems filters-box_smallitems-order">

                                                        <div className="filters-box__item">
                                                            <div className="filters-elem select-elem">
                                                                <div className="ui fluid selection dropdown">
                                                                    <input type="hidden"/>
                                                                    <div className="default text">Year</div>
                                                                    <i className="dropdown icon"></i>
                                                                    <div className="menu">
                                                                        <div className="item" data-value="af">2017</div>
                                                                        <div className="item active"
                                                                             data-value="ax">2019
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="filters-box__item">
                                                            <div className="input-elem">
                                                                <input type="text" placeholder="Brand"
                                                                       className="filters-input"/>
                                                            </div>
                                                        </div>
                                                        <div className="filters-box__item">
                                                            <div className="filters-elem select-elem">
                                                                <div className="ui fluid selection dropdown">
                                                                    <input type="hidden"/>
                                                                    <div className="default text">Season</div>
                                                                    <i className="dropdown icon"></i>
                                                                    <div className="menu">
                                                                        <div className="item" data-value="af">online
                                                                        </div>
                                                                        <div className="item active"
                                                                             data-value="ax">offline
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="filters-box__item">
                                                            <div className="filters-elem select-elem">
                                                                <div className="ui fluid selection dropdown">
                                                                    <input type="hidden"/>
                                                                    <div className="default text">Theme</div>
                                                                    <i className="dropdown icon"></i>
                                                                    <div className="menu">
                                                                        <div className="item" data-value="af">online
                                                                        </div>
                                                                        <div className="item" data-value="ax">offline
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="filters-box__item">
                                                            <div className="input-elem">
                                                                <input type="number" placeholder="Order number"
                                                                       className="filters-input"/>
                                                            </div>
                                                        </div>
                                                        <div className="filters-box__item">
                                                            <div className="filters-elem select-elem">
                                                                <div className="ui fluid selection dropdown">
                                                                    <input type="hidden"/>
                                                                    <div className="default text">Order currency</div>
                                                                    <i className="dropdown icon"></i>
                                                                    <div className="menu">
                                                                        <div className="item" data-value="af">online
                                                                        </div>
                                                                        <div className="item" data-value="ax">offline
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="filters-box__item">
                                                            <div className="input-elem">
                                                                <input type="number" placeholder="Purchaser"
                                                                       className="filters-input"/>
                                                            </div>
                                                        </div>
                                                        <div className="filters-box__item">
                                                            <div className="filters-elem select-elem">
                                                                <div className="ui fluid selection dropdown">
                                                                    <input type="hidden"/>
                                                                    <div className="default text">Order status</div>
                                                                    <i className="dropdown icon"></i>
                                                                    <div className="menu">
                                                                        <div className="item" data-value="af">online
                                                                        </div>
                                                                        <div className="item" data-value="ax">offline
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>
                                            )}/>

                                    <Table headers={this.headers} list={this.props.orderList}
                                           width={this.state.tableWidth} height={this.state.tableHeight}/>
                                </>
                    }
                </div>
            </>
        );
    }
}

export default connect((state) => ({
    supplier: state.suppliers.supplier,
    needToGetSupplier: state.suppliers.needToGetSupplier,
    orderList: state.suppliers.orderList
}), (dispatch, ownProps) => ({
    getById: () => dispatch(createRequestAction("supplier", "getById", [ownProps.match.params.id])),
    getOrderList: () => dispatch(createRequestAction("supplier", "orderList", [ownProps.match.params.id]))
}))(ViewSuppierOrderHistory);