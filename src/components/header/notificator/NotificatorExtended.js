import React from 'react'

const  NotificatorExtended = (props) => {
  return(
    <div className=" header-notifications_email">
      <div role="listbox" aria-expanded="true" className="ui dropdown" tabIndex={0}>
        <div className="menu notifications transition">
          <div className="notifications__heading">
            <i className="icon-notification"></i>
            <span className="notifications__title">Notifications</span>
            <a className="dropdown-close"><i className="icon-close"></i></a>
          </div>
          <div role="option" className="notifications__item">
            <a className="notifications__link">
              <span className="notifications__text">You’ve got 100 signups</span>
              <i className="notifications__status"></i>
            </a>
          </div>
          <div role="option" className="notifications__item">
            <a className="notifications__link">
              <span className="notifications__text">Model 03 doesn’t fit</span>
              <i className="notifications__status"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificatorExtended