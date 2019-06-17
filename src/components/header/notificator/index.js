import React,{Component} from 'react';
import {connect} from 'react-redux';
import NotificatorView from './NotifictorView'

import {createRequestAction} from '../../../actions/index';
import Messages from '../../../requestor/messages';

const Notificator = (props) => {

  const defineIcon = () => {
    switch(props.type){
      case 'messages': return 'icon-messages'
      case 'quotations': return 'icon-notification'
    }
  }
  const summarizeUnread = (changes) => changes.reduce((ac, cur) => ac + cur.requests.length, 0)
  
  return (
    <NotificatorView 
      link={props.type === 'messages' ? '/messages/all' : '/quotations'}
      unread={props.requestedChanges.data ? summarizeUnread(props.requestedChanges.data) : null} 
      icon={defineIcon()}
      color={props.type === 'quotations' ? '#dc5757' : '#55cec1'}
    />
  )
}

const mapStateToProps = ({ messages, quotations }) => ({
  inbox: messages.inbox,
  notifications: quotations.notifications,
  requestedChanges: quotations.supplierPart.viewedQuotation.requestedChanges,
})

export default connect(mapStateToProps,
  (dispatch) => ({
    getAllMessages: () => dispatch(createRequestAction("messages", "getAllMessages")),
    getDraftMessages: () => dispatch(createRequestAction("messages", "getDraftMessages")),
    getSentMessages: () => dispatch(createRequestAction("messages", "getSentMessages")),
    loadNotifications: () => dispatch({type: 'LOAD_NOTIFICATIONS' }),
  }))(Notificator);