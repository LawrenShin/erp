import React, {Component} from 'react';
import Input from '../../controls/input';
import Header from './header';
import {Dropdown} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {createRequestAction} from '../../../actions/index';
import Loading from '../../helpers/loading';
import styled from 'styled-components';
import {Formik} from 'formik';
import CheckboxComponent from '../../CheckboxComponent';
import IncotermsContactForm from '../create/forms/incoterms/IncotermsContactForm';
import Api from '../../../requestor/api';
import Common from '../../../requestor/common';
import axios from 'axios';
import Supplier from '../../../requestor/supplier';
import Spans from "../Spans";

const SettingsBtn = styled(({className, onClick}) => {
    return <></> /* Return for future use *//*<span className={`page-heading__settings ${className}`} onClick={onClick}><i className="icon-settings"></i></span>*/
})`
  cursor: pointer;
  i {
    position: relative;
    transition: 0.3s linear;    
    display: inline-block;
  }
  
  ${({active}) => active && `
    color: #40bde8;
    i {      
      transform: rotateZ(360deg);
    }
  `}
`;

class ViewSupplierPaymentHistory extends Component {

    handleChange = (e) => {
        const filterName = e.target.value;
        if (this.filterNameTimeout !== null) {
            clearInterval(this.filterNameTimeout);
        }
        if (filterName) {
            this.filterNameTimeout = setTimeout(() => {
                this.props.setFilterName(filterName);
            }, 500);
        }

    };

    render() {
        const {supplier, readOnly} = this.props;
        const id = this.props.match.params.id;
        const name = this.props.match.params.id;

        return (
            <>
                <Header id={id} name={name} selected="1" edit={!readOnly}/>

                <div className="box-bg-cards -bg-color-bgGray" ref={this.ref}>

                    <div className="supplier__payment__top">
                        <h2>Payment history</h2>
                        <form className="page-heading__form">
                            <div className="page-heading__search">
                                <div className="search-bl">
                                    <input type="text" className="search-bl__input" placeholder='Search...'
                                           onChange={this.handleChange}/>
                                    <button type="button" className="search-bl__btn" onClick={this.handleChange}><i
                                        className="icon-search"></i></button>
                                </div>
                            </div>
                            <SettingsBtn active={this.props.activeSettings} onClick={this.props.onClickSettings}/>
                            <Spans filterOutByRating={this.props.filterOutByRating}/>
                        </form>
                    </div>

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
                </div>
            </>
        );
    }
}

export default connect((state) => ({
    supplier: state.suppliers.supplier,
    needToGetSupplier: state.suppliers.needToGetSupplier
}), (dispatch, ownProps) => ({
    getById: () => dispatch(createRequestAction("supplier", "getById", [ownProps.match.params.id]))
}))(ViewSupplierPaymentHistory);