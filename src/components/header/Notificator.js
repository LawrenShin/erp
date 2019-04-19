import React,{Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import Messages from '../../requestor/messages';
import {createRequestAction} from '../../actions/index';

class Notificator extends Component{
  state = { unread: this.props.inbox.unread, inbox: '' };
  
  componentDidUpdate(prevProps){
    if(prevProps.inbox.unread !== this.props.inbox.unread && this.props.inbox.state === 'loaded'){
      this.setState({ unread: this.props.inbox.unread });
    }
  }

  messages = () => {
    return(
      <div className="header-notifications__item">
        <NavLink to="/messages/all">
          <i className="header-notifications__icon icon-messages"></i>
          {this.state.unread > 0 && <span className="header-notifications__badge">{this.state.unread}</span>}
        </NavLink>
      </div>
    )
  }
  others = () => {
    return(
      <div className="text" role="alert" aria-live="polite">
        <i className="header-notifications__icon icon-notification"></i>
        <span className="header-notifications__badge">1</span>
      </div>
    );
  }


  render(){
    if(this.props.type === 'messages'){
      return(
        <>
          {this.messages()}
        </>
      );
    }
    if(this.props.type === 'others'){
      return(
        <>
          {this.others()}
        </>
      );
    }
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