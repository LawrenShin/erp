import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

import LoginPage from '../components/login/LoginPage';
import Analytics from '../components/analytics/Analytics';
import Customers from '../components/customers/Customers';

import StuffDashboard from '../components/dashboard/StuffDashboard';
import PurchasingDashboard from '../components/dashboard/purchasingDashboard';
import SourcingDashboard from '../components/dashboard/soursingDashboard';
import SupplierDashboard from '../components/dashboard/supplierDashboard';

import MessagesComponent from '../components/messages/MessagesComponent';
import Orders from '../components/orders/Orders';
import SupplierOrders from '../components/orders/suppliers';
import CustomerOrders from '../components/orders/customers';
import Products from '../components/products/Products';
import CreateProduct from '../components/products/create';
import ViewProduct from '../components/products/view';
import EditProduct from '../components/products/edit';
import Suppliers from '../components/suppliers/Suppliers';
import CreateSupplierPage from '../components/suppliers/create/CreateSupplierPage';
import CreateCustomer from '../components/customers/create/CreateCustomer';
import EditCustomer from '../components/customers/edit/EditCustomer';
import ViewCustomer from '../components/customers/view/ViewCustomer';
import ViewSupplierGeneral from '../components/suppliers/cart/general';
import ViewSupplierContacts from '../components/suppliers/cart/contacts';
import ViewSupplierOptions from '../components/suppliers/cart/options';
import ViewSupplierBank from '../components/suppliers/cart/bank';
import ViewSuppierOrderHistory from '../components/suppliers/cart/orderHistory';
import ViewSupplierPaymentHistory from '../components/suppliers/cart/ViewSupplierPaymentHistory';
import UserProfile from '../components/user/profile';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import NotFound from '../404';
import ResetPassword from '../components/resetPassword';
import ResetPasswordConfirmer from '../components/resetPassword/ResetPasswordConfirmer';
import QuotationsComponent from '../components/quotations'
import QuotationItem from '../components/quotations/quotationItem/QuotationItem'
import QuotationWrapper from '../components/quotations/quotationSupplier/QuotationRedirectSupplier'
import QuotationView from '../components/quotations/quotationSupplier/QuotationView'
import QuotationAccept from '../components/quotations/quotationSupplier/QuotationAccept'
import QuotationEnterPrice from '../components/quotations/quotationSupplier/QuotationEnterPrice'


import QuotationBaseList from '../components/quotations/quotationSupplier/QuotationBaseList'

import { ConnectedRouter } from 'connected-react-router';

const ChooseDashboard = (role) => {
    switch(role){
        case 'superadmin' || 'stuff' || 'manager': return StuffDashboard;
        case 'supplier': return SupplierDashboard;
        case 'purchasing_manager': return PurchasingDashboard;
        case 'sourcing_manager': return SourcingDashboard;
        default: return StuffDashboard;
    }
}

const chooseQuotationList = (role) => {
    if(role){
        if( role.match(/supplier/gm) ) return QuotationBaseList
        if(role.match( /super/gm ) || role.match( /admin/gm ) || role.match( /staff/gm )) return QuotationsComponent

        return QuotationsComponent
    }
}
const chooseQuotationView = (role) => {
    if(role){
        if( role.match(/supplier/gm) ) return QuotationWrapper
        if( role.match( /super/gm ) || role.match( /admin/gm ) || role.match( /staff/gm ) ) return QuotationItem

        return QuotationItem
    }
}

const AppRouter = ({ history, context, role }) => (
    <ConnectedRouter history={history} context={context}>
        <React.Fragment>
            <Switch>
                <PublicRoute exact path='/' component={LoginPage} />
                <PublicRoute exact path='/reset_passwd_confirm/:token' component={ResetPasswordConfirmer} />
                <PrivateRoute exact path='/reset' component={ResetPassword} />

                <PrivateRoute path='/dashboard' component={ChooseDashboard(role)} />

                <PrivateRoute path='/user' component={UserProfile} />

                <PrivateRoute exact path='/customers' component={Customers} />
                    <PrivateRoute exact path='/customers/create' component={CreateCustomer} />
                    <PrivateRoute exact path='/customers/edit/:id' component={EditCustomer} />
                    <PrivateRoute exact path='/customers/view/:id' component={ViewCustomer} />

                <PrivateRoute exact path='/suppliers' component={Suppliers} />
                    <PrivateRoute exact path='/suppliers/create' component={CreateSupplierPage} />
                    <PrivateRoute exact path='/suppliers/view/:id' component={ViewSupplierGeneral} readOnly={true}/>
                    <PrivateRoute exact path='/suppliers/view/contacts/:id' component={ViewSupplierContacts} readOnly={true}/>
                    <PrivateRoute exact path='/suppliers/view/options/:id' component={ViewSupplierOptions} readOnly={true}/>
                    <PrivateRoute exact path='/suppliers/view/accounting/:id' component={ViewSupplierBank} readOnly={true}/>
                    <PrivateRoute exact path='/suppliers/view/history/:id' component={ViewSuppierOrderHistory} readOnly={true}/>
                    <PrivateRoute exact path='/suppliers/view/payment/:id' component={ViewSupplierPaymentHistory} readOnly={true}/>
                    <PrivateRoute exact path='/suppliers/edit/:id' component={ViewSupplierGeneral}/>
                    <PrivateRoute exact path='/suppliers/edit/contacts/:id' component={ViewSupplierContacts}/>
                    <PrivateRoute exact path='/suppliers/edit/options/:id' component={ViewSupplierOptions}/>
                    <PrivateRoute exact path='/suppliers/edit/accounting/:id' component={ViewSupplierBank}/>
                    <PrivateRoute exact path='/suppliers/edit/history/:id' component={ViewSuppierOrderHistory}/>

                <PrivateRoute exact path='/messages/:folder/:type' component={MessagesComponent} />
                <PrivateRoute exact path='/messages/:folder' component={MessagesComponent} />
                <PrivateRoute path='/messages' component={MessagesComponent} />

                <PrivateRoute exact path='/orders' component={Orders} />
                <PrivateRoute exact path='/orders/suppliers' component={SupplierOrders} />
                <PrivateRoute exact path='/orders/customers' component={CustomerOrders} />

                <PrivateRoute exact path='/products' component={Products} />
                    <PrivateRoute exact path='/products/create' component={CreateProduct} />
                    <PrivateRoute exact path='/products/view/:id' component={ViewProduct} />
                    <PrivateRoute exact path='/products/edit/:id' component={EditProduct} />

                <PrivateRoute path='/analytics' component={Analytics} />
 {/* order of links is very important here */}
                <PrivateRoute exact path='/quotations' component={chooseQuotationList(role)} />
                <PrivateRoute exact path='/quotations/view/:id' component={QuotationView} />
                <PrivateRoute exact path='/quotations/enter_price/:id' component={QuotationEnterPrice} />
                <PrivateRoute exact path='/quotations/decide/:id' component={QuotationAccept} />
                <PrivateRoute exact path='/quotations/:id/:decision' component={chooseQuotationView(role)} />
                <PrivateRoute exact path='/quotations/:id' component={chooseQuotationView(role)} />

                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    </ConnectedRouter>
);

const mapStateToProps =({auth}) => ({
    role: auth.role
});

export default connect(mapStateToProps)(AppRouter);
