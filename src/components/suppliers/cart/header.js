import React from 'react';
import Pointer from '../../controls/pointer';
import {NavLink} from 'react-router-dom';
import {history} from '../../../routes/history';
import ModalSemantic from '../../common/ModalSemantic'
import UploadModal from '../../common/uploadModal/UploadModal'

const TITLES = ['GENERAL INFORMATION', 'CONTACTS', 'OPTIONS', 'BANK INFORMATION', 'ORDER HISTORY'];
const ICONS = ["icon-general-info", "icon-contacts", "icon-options", "icon-accounting", "icon-order-hostory"];
const LINKS = ["", "/contacts", "/options", "/accounting", "/history"];

export default ({id, name, edit = false, selected = 0}) => (
    <>
        <div className="page-heading page-heading_card">
            <div className="page-heading__title">
                <div className="page-heading__top">
                    <h1 className="h1">{name}</h1>
                    {!edit ? <NavLink className="page-heading__icon page-heading__icon_circle"
                                      to={`/suppliers/edit${LINKS[selected]}/${id}`}><i
                        className="icon-edit"></i></NavLink> : null}
                </div>
                <div className="page-subtitle_strong">{id}</div>
            </div>
            <div className="page-heading__navs">
                <div className="card-filters">
                    <div className="card-filters__item">
                        <Pointer className="card-filters__link">
                            <i className="icon-payment-history"></i><span className="card-filters__title">Payment history</span>
                        </Pointer>
                    </div>
                    <div className="card-filters__item">
                        <UploadModal supplier={id} />
                    </div>
                    <div className="card-filters__item">
                        <Pointer className="card-filters__link selected">
                            <i className="icon-supplie-history"></i><span className="card-filters__title">Supplier history</span>
                        </Pointer>
                    </div>
                    <div className="card-filters__item">
                        <Pointer className="card-filters__link">
                            <i className="icon-auditlog"></i><span className="card-filters__title">Audit Log</span>
                        </Pointer>
                    </div>
                    {/*<div className="card-filters__item">
                        <Pointer className="card-filters__link">
                            <i className="icon-analytics"></i><span className="card-filters__title">Analytics</span>
                        </Pointer>
                    </div>*/}
                </div>
                <div className="card-filters-nav">
                    <Pointer className="card-filters-nav__item card-filters-nav__back" onClick={() => history.goBack()}>
                        <i className="icon-arrow-left"></i>
                    </Pointer>
                    <NavLink className="card-filters-nav__item card-filters-nav__add" to="/suppliers/create">
                        <i className="icon-plus"></i>
                    </NavLink>
                </div>
            </div>
        </div>
        <div className="card-tabs">
            {
                TITLES.map((v, i) => (
                    <div className="card-tabs__item">
                        <NavLink to={`/suppliers/${edit && 'edit' || 'view'}${LINKS[i]}/${id}`}
                                 className={`card-tabs__link${selected == i ? ' selected' : ''}`}>
                            <i className={ICONS[i]}></i><span className="card-tabs__title">{v}</span>
                        </NavLink>
                    </div>)
                )
            }

        </div>
    </>
)