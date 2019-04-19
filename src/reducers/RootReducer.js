import { combineReducers } from 'redux';
import auth from './auth';
import common from './common';
import errors from './errors';
import currencyPair from './currencyPair';
import suppliers from './suppliers';
import createSupplier from './createSupplier';
import createCustomer from './createCustomer';
import customer from './customer';
import products from './products';
import messages from './messages';
import dashboard from './dashboard';
import quotations from './quotation';
import orders from './orders';
import createProduct from '../ducks/createProduct/index'

import { connectRouter } from 'connected-react-router';
import { history } from '../routes/history';

export default combineReducers({
    router: connectRouter(history),
    common,
    auth,
    errors,
    currencyPair,
    suppliers,
    createSupplier,
    createCustomer,
    customer,
    products,
    messages,
    dashboard,
    quotations,
    orders,
    createProduct
});