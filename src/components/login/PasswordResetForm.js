import React, {Component} from 'react';

import AxiosError from 'axios-error';
import { Formik } from 'formik';
import Error from '../helpers/error';
import { Message } from 'semantic-ui-react'
import resetPassword from '../../requestor/resetPassword';

import LoginForm from './LoginForm';

class PasswordResetForm extends Component {
  state = {
    respond: ''
  };
  
  handleClick = () => this.props.togglePasswordReset();

  render(){
    return(
      <div className="login-form">
        <Formik
          initialValues={{ email: '' }}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async ({email}, {setErrors, setSubmitting}) => {
            if(email.match(/.+@.+\..+/)){
              try{
                const res = await resetPassword.SendMeLink(email);
                this.setState({respond: res.details});
              }catch(error){
                console.log(error);
              }
            }
            setSubmitting(false);
          }}
          >
          {({
            values,
            errors,
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
              </div>
              <input type="submit" value="RESET PASSWORD" className="btn btn2" />
              <div className="login-bottom">
                <div className="checkbox-elem checkbox-elem_square">
                  <input type="checkbox" id="remeber" />
                  <label className="checkbox-label" for="remeber">Remember me</label>
                </div>
                <div className="forget">
                  <span onClick={this.handleClick} className="forget__link">Back to Login</span>
                </div>
              </div>
              {this.state.respond && <Message info>{this.state.respond}</Message>}
            </form>
            
            { (errors.email)
              ?
              <Error>{errors.email}</Error>
              : null}
          </>)}
        </Formik>
      </div>
    );
  }
}

export default PasswordResetForm;