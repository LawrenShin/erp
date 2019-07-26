import React, { useState } from 'react'
import NotificatorExtended from './NotificatorExtended'

const NotificatorView = (props) => {
  const [visible, setVisible] = useState(false)
  
  const countUnread = (arr, filter) => {
    const unread = arr.filter(n => !n.is_readed)
    if (filter) return unread
    return unread.length ? <span className="header-notifications__badge" style={{background: props.color}}>{unread.length}</span> : null
  }
  const counted = props.notifications.data && countUnread(props.notifications.data)
  return(
    <div className="header-notifications__item" style={{ cursor: 'pointer' }}>
      <div onClick={() => counted ? setVisible(!visible) : null}>
        <i className={`header-notifications__icon ${props.icon}`}></i>
        {counted}
      </div>
      <NotificatorExtended 
        unread={!!props.notifications.data && countUnread(props.notifications.data, true)}
        readNotification={props.readNotification} 
        invitedQuotations={props.invitedQuotations} 
        notifications={props.notifications} 
        visible={visible} 
        setVisible={setVisible} />
    </div>
  )
}
export default NotificatorView