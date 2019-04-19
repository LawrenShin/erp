import React,{Component} from 'react';
import {connect} from 'react-redux';
import { login } from '../../actions/auth';
import { history } from '../../routes/history';

import resetPassword from '../../requestor/resetPassword';
import ResetPasswordComponent from './ResetPasswordComponent';

class ResetPassword extends Component{
  state = {error: null, isSet: false};

  InitSetNewPassword = async (newPassword) => {
    try{
      const isSet = await resetPassword.SetNewPassword(newPassword);
      if(isSet) this.setState({ error: '', isSet: true });
    }catch(e){
      if('response' in e) this.setState({ error: e.response.data.new_password });
    }
  }

  handleClick = (d) => history.push('/dashboard')

  render(){
    return(
      <>
        <div className="reset-password-container" 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 9000
          }}
          onClick={this.handleClick}>
        </div>
        <ResetPasswordComponent 
          errors={this.state.error} 
          InitSetNewPassword={this.InitSetNewPassword} 
          isSet={this.state.isSet}
        />
      </>
    );
  }
}

export default connect(null,
  (dispatch) => ({
    login: (info) => dispatch(login(info))
  }))(ResetPassword);