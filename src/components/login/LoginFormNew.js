import React, {Component} from 'react';

import AxiosError from 'axios-error';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Error from '../helpers/error';
import {Message} from 'semantic-ui-react'
import resetPassword from '../../requestor/resetPassword';
import className from 'classnames';

import LoginForm from './LoginForm';
import logo from "../../assets/logo.svg";

class LoginFormNew extends Component {
    state = {
        respond: '',
        email: '',
        error: false
    };

    handleClick = () => this.props.togglePasswordReset();

    render() {
        return (
            <div className="login__reset">
                <div className="login__logo">
                    <img src={logo} width="160" alt=""/>
                </div>
                {!this.state.respond &&
                <div className="login__reset__inside">
                    <p className="-title">Reset your password</p>
                    <p className="-subtitle">Fear not. Enter your email address below and we’ll send you a link to reset
                        your password.</p>
                    <div className="login__form">
                        <Formik
                            initialValues={{email: ''}}
                            validateOnChange={false}
                            validateOnBlur={false}
                            onSubmit={async ({email}, {setErrors, setSubmitting}) => {
                                if (email.match(/.+@.+\..+/)) {
                                    try {
                                        const res = await resetPassword.SendMeLink(email);
                                        this.setState({respond: res.details, email: email});
                                    } catch (error) {
                                       this.setState({error: error.response.data.email[0]})
                                    }
                                }
                                setSubmitting(false);
                            }}
                        >
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleSubmit,
                                  handleBlur,
                                  handleChange
                              }) => (
                                <>
                                    <form onSubmit={handleSubmit}>
                                        <div className="box-field">
                                            <input value={values.email}
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   type="text"
                                                   className="box-field__input"
                                                   name='email'
                                                   placeholder="E-mail"/>
                                            {errors.email && touched.email ? (<div>{errors.email}</div>) : null}
                                        </div>
                                        <input type="submit" value="RESET PASSWORD" className="btn btn2"/>
                                    </form>

                                    {(errors.email)
                                        ?
                                        <Error>{errors.email}</Error>
                                        : null}
                                </>)}
                        </Formik>
                    </div>
                    {this.state.error ? <p className="-error">{this.state.error}</p> : ''}
                </div>}
                {this.state.respond &&
                <div className='login__sendok'>
                    <p className="-title">Password successfully reset</p>
                    <p className='-subtitle'>We've sent an email to {this.state.email} with password reset instructions.
                        Do not forget that the letter can get into the SPAM folder.</p>
                    <div className="login__sendok__back">
                        <span onClick={this.handleClick}>Return to login</span>
                    </div>
                </div>}
                {!this.state.respond &&
                <div className="login__forget">
                    <span onClick={this.handleClick} className="forget__link">Return to Login</span>
                </div>}

                {/*<div className="login__newpass">
                    <p className="-title">Create new password</p>

                    <div className="login__newpass__form">
                        <Formik
                            initialValues={{ new: '', confirm: '' }}
                            validateOnChange={false}
                            validateOnBlur={false}
                            errors={this.props.errors || null}

                            validate={values => {
                                let errors = {};
                                if(!values.new)
                                    errors.new = 'Required';
                                if(!values.confirm)
                                    errors.confirm = 'Required';
                                if( (values.confirm !== values.new) && (values.confirm && values.new) )
                                    errors.match = 'Passwords don\'t match';
                                return errors;
                            }}

                            onSubmit={(values, { setSubmitting }) => {
                                const isSet = this.props.InitSetNewPassword(values.confirm);
                                setSubmitting(false);
                            }}>
                            {({ isSubmitting, errors}) => (
                                <Form>
                                    <Field className="box-field__input" type="password" name="new" placeholder="New password" />
                                    <ErrorMessage name="new" component="div" />

                                    <div className="login__help">
                                        <div className="login__help__item">One lowercase</div>
                                        <div className="login__help__item">One number</div>
                                        <div className="login__help__item">One uppercase</div>
                                        <div className="login__help__item">8 — 50 characters</div>
                                    </div>

                                    <Field className="box-field__input" type="confirm" name="confirm" placeholder="Confirm new password" />
                                    <ErrorMessage name="confirm" component="div" />

                                    {errors.match && <Message color='red'>{errors.match}</Message>}
                                    {this.props.errors && <Message color='red'>{this.props.errors}</Message>}
                                    <button className="btn btn2 btn-save" type="submit" disabled={isSubmitting}>RESET PASSWORD</button>
                                    {this.props.isSet && <Message info>Password has been changed</Message>}
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>*/}
            </div>
        );
    }
}

export default LoginFormNew;