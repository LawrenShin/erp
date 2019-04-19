import React,{Component} from 'react';
import { connect } from 'react-redux';

import AxiosError from 'axios-error';
import { Formik } from 'formik';
import Error from '../helpers/error';
import Auth from '../../requestor/auth';
import { login } from '../../actions/auth.js';

class LoginForm extends Component{

    handleClick = () => this.props.togglePasswordReset();

    render(){
        return(
            <div className="login-form">
                <Formik
                    initialValues={{ username: this.props.USERNAME, password: this.props.PASSWORD }}
                    validateOnChange={false}
                    validateOnBlur={false}                                     
                    onSubmit={async ({username, password}, {setSubmitting, setErrors}) => {
                        try{
                            const res = await Auth.login({username, password});
                            setErrors({});
                            this.props.dispatch(login(res));
                        }
                        catch(error){    
                            const err = new AxiosError(error);

                            if (err.response) 
                                setErrors({username: err.status});
                            else if (err.request)
                                setErrors({username: err.request});
                            else 
                                setErrors({username: err.message});                                 
                            
                        }
                        setSubmitting(false);
                    }}
                    >
                    {({
                        values,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    }) => (
                    <>
                        <form onSubmit={handleSubmit}>							
                            <div className="box-field">
                                <input type="text" className="box-field__input" value={values.username} name='username' onChange={handleChange} onBlur={handleBlur}/>
                                <i className="login-icon icon-user"></i>
                            </div>				
                            <div className="box-field">
                                <input type="password" className="box-field__input" value={values.password} name='password' onChange={handleChange} onBlur={handleBlur}/>
                                <i className="login-icon icon-lock"></i>
                            </div>
                            <input type="submit" value="LOGIN" className="btn btn2" />
                            <div className="login-bottom">
                                <div className="checkbox-elem checkbox-elem_square">
                                    <input type="checkbox" id="remeber" />
                                    <label className="checkbox-label" for="remeber">Remember me</label>
                                </div>
                                <div className="forget">
                                    {/* <NavLink to="/reset" className="forget__link">Forgot password?</NavLink> */}
                                    <span onClick={this.handleClick} className="forget__link">Forgot password?</span>
                                </div>
                            </div>
                        </form>
                        
                        { (errors.username || errors.password)
                            ?
                            <Error>{errors.username || errors.password}</Error>
                            : null}
                    </>)}
                </Formik> 
            </div>
        );
    }
}

const mapDispatchToProps = (state, dispatch) => ({
  errors: state.errors,
  dispatch
})

export default connect(mapDispatchToProps)(LoginForm);