import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import NotificatorView from './NotifictorView'

import {createRequestAction} from '../../../actions/index';

const Notificator = (props) => {
  useEffect(() => {
    if (!props.notifications.data && !props.notifications.loading && props.role === 'supplier') props.loadNotifications()
  })
  const defineIcon = () => {
    switch(props.type){
      case 'messages': return 'icon-messages'
      case 'quotations': return 'icon-notification'
      default: return 'icon-notification'
    }
  }
  
  return (<>
    { props.invitedQuotations.data && <NotificatorView  
      notifications={props.notifications}
      invitedQuotations={props.invitedQuotations}
      readNotification={props.readNotification}
      icon={defineIcon()}
      color={props.type === 'quotations' ? '#dc5757' : '#55cec1'}
    />}
  </>)
}

const mapStateToProps = ({ messages, quotations, auth }) => ({
  role: auth.role,
  inbox: messages.inbox,
  notifications: quotations.supplierPart.notifications,
  requestedChanges: quotations.supplierPart.viewedQuotation.requestedChanges,
  invitedQuotations: quotations.supplierPart.invitedQuotations,
})

export default connect(mapStateToProps,
  (dispatch) => ({
    getAllMessages: () => dispatch(createRequestAction("messages", "getAllMessages")),
    getDraftMessages: () => dispatch(createRequestAction("messages", "getDraftMessages")),
    getSentMessages: () => dispatch(createRequestAction("messages", "getSentMessages")),
    loadNotifications: () => dispatch({type: 'GET_SUPPLIER_NOTIFICATIONS' }),
    readNotification: (uid) => dispatch({ type: 'READ_NOTIFICATION', payload: uid }),
  }))(Notificator);