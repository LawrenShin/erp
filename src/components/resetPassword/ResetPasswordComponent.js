import React,{Component} from 'react';
import styled from 'styled-components';
import { Message } from 'semantic-ui-react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const ResetContainer = styled.div`
  position: absolute;
  left: 25%;
  width: 50%;
  height: fit-content;
  top: 20%;
  background: #fff;
  padding: 5% 10%;
  z-index: 9100
  h1{
    text-align: center;
    font-size: 21px;
    font-family: sans-serif;
    margin-bottom: 20px;
    font-weight: 100;
  }
  h3{
    font-weight: 100;
    text-align: center;
    font-size: 16px;
    font-family: sans-serif;
  }
  form{
    input{
      margin: 10px 0;
      border-color: rgb(192, 192, 192);
    }
    button{
      width: 100%;
    }
  }
`

export default class ResetPasswordComponent extends Component{
  componentDidMount(){
    document.getElementById('app_header').style.zIndex = 0;
  }
  componentWillUnmount(){
    document.getElementById('app_header').style.zIndex = 2;
  }

  render(){
    return(
      <ResetContainer>
        <h1>Reset Password</h1>
        <h3>Please enter new password</h3>
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
              <Field className="box-field__input" type="new" name="new" placeholder="New password" />
              <ErrorMessage name="new" component="div" />
              <Field className="box-field__input" type="confirm" name="confirm" placeholder="Confirm new password" />
              <ErrorMessage name="confirm" component="div" />

              {errors.match && <Message color='red'>{errors.match}</Message>}
              {this.props.errors && <Message color='red'>{this.props.errors}</Message>}
              <button className="btn btn2 btn-save" type="submit" disabled={isSubmitting}>RESET PASSWORD</button>
              {this.props.isSet && <Message info>Password has been changed</Message>}
            </Form>
          )}
        </Formik>
      </ResetContainer>
    );
  }
}