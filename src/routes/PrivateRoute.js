import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import Header from '../components/header/Header';
import Aside from '../components/header/Aside';
import Gallery from '../components/gallery';

import SupplierDashboard from '../components/dashboard/supplierDashboard';

const getUserFromStorage = () => {
    return JSON.parse(sessionStorage.getItem('user') || "{}");
}

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={ (props) => (
        isAuthenticated ? ( 
            <React.Fragment>
                <Aside />
                <main className={`content`}>
                    <Header />
                    <div className={`content-page`}>
                        <div className={`wrapper`}>
                            <Component {...props} readOnly={rest.readOnly}/>
                        </div>
                    </div>
                </main>
                <Gallery />
            </React.Fragment>
         ) : (
             <Redirect to='/' />
         )
    ) } />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.id || !!getUserFromStorage().id,
    messagesWrapper: state.messages.messagesWrapper,
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);