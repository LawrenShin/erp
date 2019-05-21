import React from 'react'
import { NavLink } from 'react-router-dom'

import NotificatorExtended from './NotificatorExtended'

const NotificatorView = (props) => {

  return(
    <div className="header-notifications__item">
      <NavLink to={props.link}>
        <i className={`header-notifications__icon ${props.icon}`}></i>
        {props.unread > 0 && <span className="header-notifications__badge" style={{background: props.color}}>{props.unread}</span>}
      </NavLink>
      <NotificatorExtended />
    </div>
  )
}
export default NotificatorView