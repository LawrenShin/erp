import React,{Component} from 'react';

import {NavLink} from 'react-router-dom';

class ContentHeader extends Component{
  render(){
    return (
      <div className="messages-head">
        <div className="messages-tabs">
          <div className="messages-tabs__item">
            <NavLink className={["messages-tabs__link", this.props.section === 'all' ? 'selected' : ''].join(' ')} to='/messages/all'>
              <i className="icon-inbox"></i><span className="messages-tabs__title">Get messages </span>
            </NavLink>
          </div>
          <div className="messages-tabs__item">
            <NavLink className={["messages-tabs__link", this.props.section === 'write' ? 'selected' : ''].join(' ')} to='/messages/write'>
              <i className="icon-write"></i><span className="messages-tabs__title">Write</span>
            </NavLink>
          </div>
          <div className="messages-tabs__item">
            <span className="messages-tabs__link">
              <i className="icon-forward"></i><span className="messages-tabs__title" onClick={this.props.toggleModal}>Forward</span>
            </span>
          </div>
          <div className="messages-tabs__item">
            <span className="messages-tabs__link" onClick={this.props.handleFlagMessage}>
              <i className="icon-flag-vertical"></i><span className="messages-tabs__title">Flagged</span>
            </span>
          </div>
          <div className="messages-tabs__item" onClick={this.props.handleDeleteMessage}>
            <span className="messages-tabs__link">
              <i className="icon-trash"></i><span className="messages-tabs__title">Delete</span>
            </span>
          </div>
        </div>
        <div className="messages-search">
          <div className="search-bl">
            <input type="text" className="search-bl__input" />
            <button type="submit" className="search-bl__btn"><i className="icon-search"></i></button>
          </div>
        </div>
      </div>
    )
  }
}

export default ContentHeader;