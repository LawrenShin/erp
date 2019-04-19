import React,{ Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

import Message from './subComponents/Message';
import { createAction } from '../../actions/index';

class TableComponent extends Component{
  state = { messages: '' };

  componentDidMount(){
    if(this.props.items.state === 'loaded'){
      this.setState({ messages: this.props.items.data });
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.items.state === 'loaded' && prevProps.items !== this.props.items){
      this.setState({ messages: this.props.items.data });
    }
  }

  render(){
      if(this.state.messages.length){
      return (
        <div className="messages-table">
          <table>
            <tbody>
              {this.state.messages.map((message) => {
                return <Message 
                  section={this.props.section}
                  item={message} 
                  // key={message.message_id} 
                  key={uuid()}
                  toggleSelectMessage={this.props.toggleSelectMessage}
                  selectedMessages={this.props.selectedMessages} />
              })}
            </tbody>
          </table>
        </div>
      )
    }else{
      return (
        <h1 className='no-messages'>No Messages</h1>
      )
    }
  }
}

const mapStateToProps = ({ messages }) => ({
  selectedMessages: messages.selectedMessages
});

export default connect(mapStateToProps,
  (dispatch) => ({
    toggleSelectMessage: (message) => dispatch(createAction('TOGGLE_SELECT_MESSAGE', message))
  }))(TableComponent);