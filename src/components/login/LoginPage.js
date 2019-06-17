import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/logo.svg';

import LoginForm from './LoginForm';
import LoginFormNew from './LoginFormNew';
import PasswordResetForm from './PasswordResetForm';

const USERNAME = process.env.REACT_APP_USERNAME;
const PASSWORD = process.env.REACT_APP_PASSWORD;

class LoginPage extends Component {
    state = {forgotOrNot: false};

    onClick = () => this.setState({forgotOrNot: !this.state.forgotOrNot});

    render() {
        return (
            <>
                <div className="login-box">
                    <div className="login">
                        <div className="login__decor"></div>
                        <div className="login__form">
                            <div className="login__logo">
                                <img src={logo} width="160" alt=""/>
                                <div className="login__logo_title">ENTERPRISE system</div>
                            </div>
                            {this.state.forgotOrNot ?
                                <PasswordResetForm togglePasswordReset={this.onClick}/>
                                :
                                <LoginForm USERNAME={USERNAME} PASSWORD={PASSWORD}
                                           togglePasswordReset={this.onClick}/>}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default LoginPage;