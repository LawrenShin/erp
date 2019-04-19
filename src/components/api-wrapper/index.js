import {connect} from 'react-redux';
import React, {Component} from 'react';
import {Auth, Common, Customer, Product, Supplier, Dashboard, Messages, Quotation, Order} from '../../requestor';
import store from '../../store/configureStore';

class ApiWrapper extends Component {
  static getDefaultOptions(from) {
    return Object.assign({}, {
        start: '?',
        ages: '',
        payment_terms: '',
        categories: '',
        genders: '',
        countries: '',
        cities: '',
        supplier_names: '',
        incoterms: '',
        status: '',
        type: '',
        offset: 0,
        limit: 50,
        checkboxes: {
          is_timely_response_to_letters: true,
          is_cost_break_down: true,
          is_no_spam_any_work_questions: true,
          is_efficiency_work_with_orders: true,
          is_discount_reject_delay: true
        },
        ratings: {
          general_rating: {from: 0, to: 100 },
          financial_rating: {from: 0, to: 100},
          reliability_rating: {from: 0, to: 100}
        }
      }
    );
  }

  clb = () => {}

  onChange(cur, prev, clb) {
    this.clb(cur, prev);
  }

  static create(type, method, params) {

    const map = {
        'auth': Auth,
        'common': Common,
        'customer': Customer,
        'product': Product,
        'supplier': Supplier,
        'dashboard': Dashboard,
        'messages': Messages,
        'quotation': Quotation,
        'order': Order
    }

    return map[type][method](...params);
  }

  obj = {}

  addProps = (element) => {
    return React.cloneElement(element, {getApi: this.getApi});
  }

  handle() {
    let prev;

    const handleChange = () => {
      let cur = this.props.from ? this.store.getState()[this.props.from] : this.store.getState();
      if(cur !== prev && prev !== undefined){
        this.onChange(cur, prev, this.obj.clb);
        prev = cur;
      }
    }
      
    return this.store.subscribe(handleChange)
  }

  getApi = (from) => {
    this.obj = Object.create({}, {
      run: {
        value: (fnc, ...args) => {
          return ApiWrapper.create(from, fnc, args);
        },
        writable: false
      },
      defaultOptions: {
        get : () => {
          return ApiWrapper.getDefaultOptions(from, {});
        }
      },
      state: {
        get: () => {
          return this.props.state;
        }
      },
      onChange: {
        set: (clb) => {
          this.clb = clb;
        } 
      }
    }); 

    return this.obj;
  }

  constructor(props){
    super(props);
    this.store = store();
    this.handle();
  }

  render() {
    const {children} = this.props;
    return (
      React.Children.map(children, this.addProps)
    )
  }
}

const ConnectedApiWrapper = connect(state => ({state}))(ApiWrapper);

export default function (Component, from = undefined) {
  return (props) => {
    return <ConnectedApiWrapper from={from}><Component {...props} /></ConnectedApiWrapper>;
  }
} 
 