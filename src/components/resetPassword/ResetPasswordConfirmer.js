import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Message } from 'semantic-ui-react';

import { history } from '../../routes/history';
import { login } from '../../actions/auth';
import resetPassword from '../../requestor/resetPassword';

class ResetPasswordConfirmer extends Component{
  state = {error: ''};

  async componentDidMount(){
    try{
      const token = this.props.match.params.token;
      await resetPassword.ConfirmToken(token).then(res => {
        this.props.login(res);
        history.push('/reset');
      });
    }catch(e){
      if('response' in e){
        if(e.response.status === 403) this.setState({error: 'Token expired'});
      }else{
        console.log(e);
      }
    }
  }
  
  render(){
    return this.state.error ? <Message color='red' 
    style={{
      height: 'fit-content',
      top: '50%',
      position: 'absolute',
      left: '50%',
      marginLeft: '-50px'
    }}>{this.state.error}</Message> : <></>;
  }
}

export default connect(null,
  (dispatch) => ({
    login: (info) => dispatch(login(info))
  }))(ResetPasswordConfirmer);