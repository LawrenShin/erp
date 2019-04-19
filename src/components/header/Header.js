import React, {Component} from "react";
import {connect} from 'react-redux';

import UserProfile from './UserProfile.js';
import UserNoAvatar from './UserNoAvatar.js';
import Currency from './Currency.js';
import Notificator from './Notificator';

class Header extends Component{
    render(){
        const avatarPath = this.props.auth.avatar;

        return (
            <div className={'header'} id='app_header'>
                <div className={'wrapper'}>
                    <Currency />

                    <div className="header-notifications">
                        <Notificator type='messages' />
                        <div className="header-notifications__item header-notifications_email">
                            <div role="listbox" aria-expanded="true" className="ui dropdown" tabIndex={0}>
                                <Notificator type='others' />
                                <div className="menu notifications transition">
                                    <div className="notifications__heading">
                                        <i className="icon-notification"></i>
                                        <span className="notifications__title">Notifications</span>
                                        <a className="dropdown-close"><i className="icon-close"></i></a>
                                    </div>
                                    <div role="option" className="notifications__item">
                                        <a className="notifications__link">
                                            <span className="notifications__text">You’ve got 100 signups</span>
                                            <i className="notifications__status"></i>
                                        </a>
                                    </div>
                                    <div role="option" className="notifications__item">
                                        <a className="notifications__link">
                                            <span className="notifications__text">Model 03 doesn’t fit</span>
                                            <i className="notifications__status"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
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