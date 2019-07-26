import React from 'react';
import { Message } from 'semantic-ui-react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Formik} from 'formik';
import Dropdown from '../../components/controls/dropdown';
import ConnectApi from '../api-wrapper';
import { createAction } from '../../actions';

const Avatar = styled(({className, user, children}) => {
    return <span className={`header-profile__noavatar ${className}`}>{children}</span>
})`
    &, &:hover{
        height: 156px;
        font-size: 64px;
        padding-top: 38px;
        width: 156px;
        border: 6px solid white;
        color: #fff;
        background: #40bde8;
    }
`;

class UserProfile extends React.Component{
    render() {        
        const {first_name, last_name, role, lang = 'ru'} = this.props.user;

        return (
            <div className="box-user-profile">
                <Formik initialValues={{first_name, last_name, role, lang}}
                    onSubmit={async ({first_name, last_name, role, lang}, actions) => {
                        try{
                            const {getApi} = this.props
                            const res = await getApi('common').run('updateUser', {first_name, last_name, job_title: role, lang})
                            this.props.updateUserStorage({ first_name, last_name, role: res.job_title, lang });
                        }catch(e){
                            console.log(e)
                        }
                        actions.setSubmitting(false);
                    }}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validate={({ first_name, last_name, role }) => {
                        let errors = {}
                        if(!first_name) errors.first_name = 'can not be empty'
                        if(!last_name) errors.last_name = 'can not be empty'
                        if(!role) errors.role = 'can not be empty'
                        return errors
                    }}
                    render={ ({values: {first_name, last_name}, errors, handleSubmit, handleChange, handleBlur, isSubmitting}) => (
                        <form onSubmit={handleSubmit}>
                            <div className="user-profile-head">
                                <div className="wrapper">
                                    <div className="user-profile-avatar">
                                        <Avatar>{first_name[0] || '?'}{last_name[0] || '?'}</Avatar>
                                        {role && <div className="avatar-big-post">{role[0].toUpperCase()}{role.substr(1)}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="wrapper">
                                <div className="user-profile-form">
                                    {/* Change avatar */}
                                    {/*<label className="load-file profile-loader">
                                        <span className="box-field__input load-file__input">Change picture</span>
                                        <i className="load-file__icon icon-upload"></i>
                                        <input type="file" className="load-file__file" />
                                    </label>*/}
                                    <div className="user-profile-inputs">
                                        <div className="box-field box-field_profile">
                                            <label className="box-field__label">First name:</label>
                                            <input type="text" className="box-field__input" name="first_name" value={first_name} onChange={handleChange}/>
                                            {errors.first_name && <Message color='red'>{errors.first_name}</Message>}
                                        </div>
                                        <div className="box-field box-field_profile">
                                            <label className="box-field__label">Last name:</label>
                                            <input type="text" className="box-field__input" name="last_name" value={last_name} onChange={handleChange} />
                                            {errors.last_name && <Message color='red'>{errors.last_name}</Message>}
                                        </div>
                                        <div className="box-field box-field_profile">
                                            <label className="box-field__label">Job title:</label>
                                            <input type="text" className="box-field__input" name="role" value={role} onChange={handleChange} />
                                            {errors.role && <Message color='red'>{errors.role}</Message>}
                                        </div>
                                        {/*<div className="box-field box-field_profile">
                                            <div className="select-elem">
												<label className="box-field__label">Language of interface:</label>
                                                <Dropdown noEmpty simple name="lang" options={[{text: "Russian", value: "ru"}, {text: "English", value: "en"}]} value={lang} />
                                            </div>
                                        </div>*/}
                                    </div>
                                    <input type="submit" className="btn" style={{ width: '100%' }} value="Save" disabled={isSubmitting}></input>
                                </div>
                            </div>
                        </form>
                    )}
                />
            </div>
        )
    }
}

export default connect( (state) => ({
    user: state.auth
}), (dispatch) => ({
    updateUserStorage: (data) => dispatch(createAction('UPDATE_USER_STORAGE', data))
}))( ConnectApi(UserProfile) );