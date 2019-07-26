import React, {Component} from "react";
import {connect} from 'react-redux';
import {Dropdown} from 'semantic-ui-react'

import UserProfile from './UserProfile.js';
import UserNoAvatar from './UserNoAvatar.js';
import Currency from './Currency.js';
import Notificator from './notificator';
import ReactCountryFlag from 'react-country-flag';

class Header extends Component {
    render() {
        const avatarPath = this.props.auth.avatar;

        return (
            <div className={'header'} id='app_header'>
                <div className={'wrapper'}>
                    <Currency/>

                    <div className="header-notifications">
                        {/* <Notificator type='messages' /> */}
                        <Notificator type='quotations'/>
                    </div>
                    {avatarPath ? <UserProfile uiLocation='header' {...this.props.auth} /> :
                        <UserProfile uiLocation='header' {...this.props.auth} />}

                    {/* Language change was here */}
                    {/*<div className="header__lang">
                        <Dropdown icon={<ReactCountryFlag code='us' />}>
                            <Dropdown.Menu>
                                <Dropdown.Item icon={<ReactCountryFlag code='ru' />} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>*/}

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Header);