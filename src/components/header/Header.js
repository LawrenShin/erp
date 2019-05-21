import React, {Component} from "react";
import {connect} from 'react-redux';

import UserProfile from './UserProfile.js';
import UserNoAvatar from './UserNoAvatar.js';
import Currency from './Currency.js';
import Notificator from './notificator';

class Header extends Component{
    render(){
        const avatarPath = this.props.auth.avatar;

        return (
            <div className={'header'} id='app_header'>
                <div className={'wrapper'}>
                    <Currency />

                    <div className="header-notifications">
                        {/* <Notificator type='messages' /> */}
                        <Notificator type='quotations' />
                    </div>
                    {avatarPath ? <UserProfile uiLocation='header' {...this.props.auth} /> : <UserProfile uiLocation='header' {...this.props.auth} />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Header);