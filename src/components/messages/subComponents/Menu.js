import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';

class Menu extends Component{

  render(){
    return (
        <ul className="messages-menu">
          <li className="messages-menu__item">
            <NavLink to='/messages/all' className="messages-menu__link" activeClassName="activeMenuMessages">
              <i className="icon-inbox-2"></i>
              <span className="messages-menu__title">Inbox</span>
              {this.props.unread ? <span className="messages-menu__badge">{this.props.unread}</span> : ''}
            </NavLink>
          </li>
          <li className="messages-menu__item">
            <NavLink to="/messages/flagged" className="messages-menu__link" activeClassName="activeMenuMessages">
              <i className="icon-flag-vertical"></i>
              <span className="messages-menu__title">Flagged</span>
            </NavLink>
          </li>
          <li className="messages-menu__item">
            <NavLink to="/messages/sent" className="messages-menu__link" activeClassName="activeMenuMessages">
              <i className="icon-send"></i>
              <span className="messages-menu__title">Sent</span>
            </NavLink>
          </li>
          <li className="messages-menu__item">
            <NavLink to="/messages/draft" className="messages-menu__link" activeClassName="activeMenuMessages">
              <i className="icon-draft"></i>
              <span className="messages-menu__title">Drafts</span>
            </NavLink>
          </li>
          <li className="messages-menu__item">
            <NavLink to="/messages/trash" className="messages-menu__link" activeClassName="activeMenuMessages">
              <i className="icon-trash"></i>
              <span className="messages-menu__title">Trash</span>
            </NavLink>
          </li>
          <li className="messages-menu__item">
            <a href="#" className="messages-menu__link">
              <i className="icon-settings"></i>
              <span className="messages-menu__title">Email Settings</span>
            </a>
          </li>
          <li className="messages-menu__item">
            <NavLink to="/messages/files" className="messages-menu__link">
              <i className="icon-attach"></i>
              <span className="messages-menu__title">Attached files</span>
            </NavLink>
          </li>
      </ul>
    )
  }
}

export default Menu;