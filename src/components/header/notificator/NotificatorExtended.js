import React from 'react'
import uuid from 'uuid'
import {NavLink} from 'react-router-dom'

const NotificationLink = ({ unread, text, uid, params, decision, readNotification }) => <NavLink to={`/quotations/${params.quotation_id}/${decision ? decision : ''}`}
  className="notifications__link" 
  onClick={() => readNotification(uid)}  >
    <span className="notifications__text">{text.substring(0, 200)}...</span>
    <i className="notifications__status"></i>
</NavLink>

const NotificatorExtended = (props) => {

    const renderNotifications = (unread) => {
        const latestLimit = !!unread.length ? 50 : 0
        let previewNotificationsArr = []
        for (let i = 0; i < latestLimit; i++) {
            if (unread[i]) {
                const correspondedQuotation = props.invitedQuotations.data.filter(iq => iq.quotation_id === unread[i].params.quotation_id)[0]
                previewNotificationsArr.push(
                    <div role="option" className="notifications__item">
                        <NotificationLink
                            key={uuid()}
                            {...unread[i]}
                            readNotification={props.readNotification}
                            decision={(correspondedQuotation && 'status_supplier' in correspondedQuotation) ? correspondedQuotation.status_supplier : null}/>
                    </div>
                )
            }
        }
        return previewNotificationsArr.map(pn => pn)
    }

    return (
        <div className=" header-notifications_email">
            <div role="listbox" aria-expanded="true" className="ui dropdown" tabIndex={0}>
                <div className={`menu notifications transition ${props.visible ? 'visible' : ''}`}>
                    <div className="notifications__heading">
                        <i className="icon-notification"></i>
                        <span className="notifications__title">Notifications</span>
                        <button onClick={() => props.setVisible(!props.visible)}
                                className="dropdown-close" type='button'><i className="icon-close"></i></button>
                    </div>
                    {!!props.unread.length && <div role="option" className="notifications__item">
                        <button className="notifications__link" type='button'>
                            <span className="notifications__text">You’ve got {props.unread.length} quotation invitation</span>
                            <i className="notifications__status"></i>
                        </button>
                    </div>}
                    {props.notifications.data && props.unread && renderNotifications(props.unread)}
                </div>
            </div>
        </div>
    )
}

export default NotificatorExtended