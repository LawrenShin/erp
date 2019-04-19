import React,{Component} from 'react';
import moment from 'moment';
import Messages from '../../../requestor/messages';

import {NavLink} from 'react-router-dom';

class Message extends Component{

  handleToggleReadMessage = () => {
    if(!this.props.item.is_viewed && (this.props.section === 'all' || !this.props.section))
      Messages.toggleReadMessage(this.getId(this.props.item)).then((res) => console.log(res));
  }

  getId = (item) => item.id || item.message_id;
  handleClick = () => { 
    this.props.toggleSelectMessage(this.getId(this.props.item));
  }

  componentWillUnmount(){
    window.previousLocation = this.props.section;
  }

  render(){
    const isFlagged = this.props.item.is_flagged || this.props.item.is_flag,
    isSelected = this.props.selectedMessages.includes(this.getId(this.props.item));
    let isBold = '';
    if((this.props.section === 'all' || this.props.section === 'flagged') && !this.props.item.is_viewed){
      isBold = 700;
    }else{
      isBold = 100;
    }
    const toReadOrWrite = this.props.section === 'draft' ? `/messages/write/${this.props.item.message_id}` : `/messages/read/${this.props.item.message_id}`;
    return(
        <tr className={isFlagged ? "important-message" : ''} style={{fontWeight: isBold}}>
          <td className="col-1">
            <NavLink className='make-it-black' to={toReadOrWrite} onClick={this.handleToggleReadMessage}>
              <span className="important-icon">
                <i className="icon-flag"></i>
              </span>
              <span className="attach-icon">
                <i className="icon-attach"></i>
              </span>
            </NavLink>
          </td>
          <td className="col-2">
            <div className="messages-heading">
              <label className="single-checkbox" >
                <input type="checkbox" onChange={this.handleClick} checked={isSelected} />
                <span></span>
              </label>
              <NavLink className='make-it-black' to={toReadOrWrite} onClick={this.handleToggleReadMessage}>
                <span className="messages-author">{this.props.item.name}</span>
              </NavLink>
            </div>
          </td>
          <td className="col-3">
            <NavLink className='make-it-black' to={toReadOrWrite} onClick={this.handleToggleReadMessage}>
              <span className="messages-title">{this.props.item.subject}</span>
            </NavLink>
          </td>
          <td className="col-4">
            <NavLink className='make-it-black' to={toReadOrWrite} onClick={this.handleToggleReadMessage}>
              <span className="messages-text">{this.props.item.preview_content}</span>
            </NavLink>
          </td>
          <td className="col-5">
            <NavLink className='make-it-black' to={toReadOrWrite} onClick={this.handleToggleReadMessage} section={this.props.section}>
              <div className="messages-date">{moment(this.props.item.created_at).format("MMM Do, hh:mm a")}</div>
            </NavLink>
          </td>
        </tr>
    );
  }
}

export default Message;