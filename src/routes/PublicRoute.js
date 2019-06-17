import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import StuffDashboard from "../components/dashboard/StuffDashboard";
import SupplierDashboard from "../components/dashboard/supplierDashboard";
import PurchasingDashboard from "../components/dashboard/purchasingDashboard";
import SourcingDashboard from "../components/dashboard/soursingDashboard";

export const PublicRoute = ({
                                isAuthenticated,
                                component: Component,
                                role,
                                ...rest
                            }) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (<Redirect
            to={role === 'manager' || role === 'stuff' || role === 'superadmin' ? '/suppliers/' : '/quotations/'}/>) : (
            <Component {...props} />)
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.id,
    role: state.auth.role
});

export default connect(mapStateToProps)(PublicRoute);