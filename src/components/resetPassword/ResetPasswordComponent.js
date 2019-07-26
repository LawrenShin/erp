import React, {Component} from 'react';
import styled from 'styled-components';
import {Message} from 'semantic-ui-react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {stepBack} from "../../actions/createSupplier";
import className from 'classnames';
import PopupCallback from "../common/PopupCallback";

export default class ResetPasswordComponent extends Component {
    state = {send: false};

    componentDidMount() {
        document.getElementById('app_header').style.zIndex = 0;
    }

    componentWillUnmount() {
        document.getElementById('app_header').style.zIndex = 2;
    }

    //inputFocus = () => this.setState({lowercase: false, uppercase: false, number: false, length: false});

    render() {
        return (
            <>
                <PopupCallback text='Password has been changed' visible={this.state.send}/>
                <div className='reset__pass'>
                    <h1>Change password</h1>
                    <Formik
                        initialValues={{new: '', confirm: ''}}
                        validateOnChange={true}
                        validateOnBlur={true}
                        errors={this.props.errors || null}

                        validate={values => {
                            let errors = {};
                            if (/[a-z]/.test(values.new)) {
                                this.setState({lowercase: true});
                            } else {
                                errors.new = 'The password does not meet all of the requirements listed below:';
                                this.setState({lowercase: false});
                            }
                            /*if (/[A-Z]/.test(values.new)) {
                                this.setState({uppercase: true});
                            } else {
                                errors.new = 'The password does not meet all of the requirements listed below:';
                                this.setState({uppercase: false});
                            }
                            if (/[0123456789]/.test(values.new)) {
                                this.setState({number: true});
                            } else {
                                errors.new = 'The password does not meet all of the requirements listed below:';
                                this.setState({number: false});
                            }*/
                            if (values.new.length >= 9 && values.new.length <= 50) {
                                this.setState({lengthPas: true});
                            } else {
                                errors.new = 'The password does not meet all of the requirements listed below:';
                                this.setState({lengthPas: false});
                            }
                            if (!values.new)
                                errors.new = 'This field is required';
                            if (!values.confirm)
                                errors.confirm = 'This field is required';
                            if ((values.confirm !== values.new) && (values.confirm && values.new))
                                errors.match = 'Passwords don\'t match';
                            return errors;
                        }}

                        onSubmit={(values, {setSubmitting}) => {
                            /*if (/[a-z]/.test(values.new) === false) {
                                this.setState({lowercase: false});
                                return false;
                            }
                            if (/[A-Z]/.test(values.new) === false) {
                                this.setState({uppercase: false});
                                return false;
                            }
                            if (/[0123456789]/.test(values.new) === false) {
                                this.setState({number: false});
                                return false;
                            }
                            if (values.new.length < 8 && values.new.length > 50) {
                                this.setState({lengthPas: false});
                                return false;
                            }*/
                            const isSet = this.props.InitSetNewPassword(values.confirm);
                            this.setState({send: true});
                            setTimeout(function () {
                                this.setState({send: false});
                            }.bind(this), 2000);
                            setSubmitting(false);
                        }}>
                        {({isSubmitting, errors}) => (
                            <Form>
                                <p className="reset__pass__subtitle">Enter new password</p>
                                <Field className="box-field__input" type="new" name="new"
                                       placeholder="New password"/>
                                {errors.new ?
                                    <ErrorMessage name="new" component="div" className='reset__pass__error'/> : ''}
                                <div className="login__help">
                                    <div
                                        className={className('login__help__item', {'-error': this.state.lowercase === false}, {'-ok': this.state.lowercase})}>One
                                        lowercase
                                    </div>
                                    {/*<div
                                        className={className('login__help__item', {'-error': this.state.number === false}, {'-ok': this.state.number})}>One
                                        number
                                    </div>
                                    <div
                                        className={className('login__help__item', {'-error': this.state.uppercase === false}, {'-ok': this.state.uppercase})}>One
                                        uppercase
                                    </div>*/}
                                    {console.log(this.state)}
                                    <div
                                        className={className('login__help__item', {'-error': this.state.lengthPas === false}, {'-ok': this.state.lengthPas})}>9
                                        — 50 characters
                                    </div>
                                </div>
                                <Field className="box-field__input" type="confirm" name="confirm"
                                       placeholder="Confirm new password"/>
                                <ErrorMessage name="confirm" component="div" className='reset__pass__error'/>

                                {errors.match &&
                                <Message color='red' className='reset__pass__error'>{errors.match}</Message>}
                                {this.props.errors &&
                                <Message color='red' className='reset__pass__error'>{this.props.errors}</Message>}
                                <button className="btn btn2 btn-save" type="submit" disabled={isSubmitting}>Change
                                    password
                                </button>
                                {/*this.props.isSet && <Message className='reset__succesful' info>Password has been changed</Message>*/}
                            </Form>
                        )}
                    </Formik>
                </div>
            </>
        );
    }
}