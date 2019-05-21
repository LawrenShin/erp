import React,{Component} from 'react';
import {connect} from 'react-redux';
import NotificatorView from './NotifictorView'

import {createRequestAction} from '../../../actions/index';
import Messages from '../../../requestor/messages';

class Notificator extends Component{
  state = { unread: this.props.inbox.unread, inbox: '' };

  componentDidUpdate(prevProps){
    if(prevProps.inbox.unread !== this.props.inbox.unread && this.props.inbox.state === 'loaded'){
      this.setState({ unread: this.props.inbox.unread });
    }
  }

  defineIcon = () => {
    switch(this.props.type){
      case 'messages': return 'icon-messages'
      case 'quotations': return 'icon-notification'
    }
  }

  render(){
    return <NotificatorView 
      link={this.props.type === 'messages' ? '/messages/all' : '/quotations'}
      unread={this.state.unread} 
      icon={this.defineIcon()}
      color={this.props.type === 'quotations' ? '#dc5757' : '#55cec1'}
      />
  }
}

const mapStateToProps = ({ messages }) => ({
  inbox: messages.inbox
})

export default connect(mapStateToProps,
  (dispatch) => ({
    getAllMessages: () => dispatch(createRequestAction("messages", "getAllMessages")),
    getDraftMessages: () => dispatch(createRequestAction("messages", "getDraftMessages")),
    getSentMessages: () => dispatch(createRequestAction("messages", "getSentMessages"))
  }))(Notificator);