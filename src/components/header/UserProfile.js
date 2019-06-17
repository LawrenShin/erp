import React from "react";
import {connect} from 'react-redux';
import {createAction} from '../../actions';
import {NavLink} from 'react-router-dom';
import {history} from '../../routes/history';

class UserProfile extends React.Component {
    state = {show: false}

    render() {
        const {user} = this.props;

        return (
            this.props.uiLocation === 'header' ?
                <div className="header-profile">
                    <div role="listbox" aria-expanded="true" className="ui dropdown">
                        <div className="header-profile__content"
                             onClick={() => this.setState(({show}) => ({show: !show}))}>
                            <span className="header-profile__text">Hello {user.first_name}</span>
                            <span className="header-profile__noavatar">{user.first_name[0]}{user.last_name[0]}</span>
                            <i className="caret"></i>
                        </div>
                        {this.state.show ?
                            <div className="menu transition" style={{display: "block"}}>
                                <div role="option" className="item">
                                    <NavLink to="/user" className="text">Profile settings</NavLink>
                                </div>
                                <div role="option" className="item" onClick={() => this.props.logout()}>
                                    <a href="javascript:void(0)" className="text">Logout</a>
                                </div>
                            </div>
                            : null
                        }

                    </div>
                </div>
                :

                <div className="user-profile">
                    <div style={{cursor: "pointer"}} className="user-profile__initials"
                         onClick={() => history.push("/user")}>{user.first_name[0]}{user.last_name[0]}</div>
                    <div className="user-profile__title">{user.first_name} {user.last_name}</div>
                    <div className="user-profile__post"
                         style={{fontSize: user.email.length < 20 ? '1em' : '0.9em'}}>{user.email}</div>
                    {user.role && <div
                        className="user-profile__post">{user.role[0].toUpperCase()}{user.role.substr(1).toLowerCase()}</div>}
                </div>

        )
    }
};

const mapStateToProps = (state) => ({
    user: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(createAction('LOGOUT'))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);