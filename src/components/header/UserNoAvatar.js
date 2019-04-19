import React from "react";

import { Icon } from 'semantic-ui-react';
import styles from '../../css/header/UserProfile.module.css';

import systemTitle from '../../css/header/SystemTitle.module.css';

const UserNoAvatar = (props) => {
    const nameLayout = props.uiLocation === 'header' ? styles['no-avatar-header-name'] : styles['avatar-navigation-name'];
    const container = props.uiLocation === 'header' ? styles['container-header'] : styles['container-navigation'];

    const user = props;
    return (
        <div className={container}>
            {props.uiLocation === 'header' ?  
            <span className={nameLayout}>Hello {user.first_name}</span>
            : 
            <div className={styles['no-avatar-navigation']}>
                <span className={styles['no-avatar-initials']}>{user.first_name[0]}{user.last_name[0]}</span>
            </div>}

            {props.uiLocation === 'header' ?
            <div className={styles['no-avatar']}>
                <span className={styles['no-avatar-initials']}>{user.first_name[0]}{user.last_name[0]}</span>
            </div>
            : 
            //replace with navlink to userprofile component
            <div className={styles['profile-name-container']}>
                <span className={[nameLayout, styles.bigFont].join(' ')}>{user.first_name} {user.last_name}</span><br></br>
                <span className={[systemTitle.version, styles['small-plus']].join(' ')}>Administrator</span>
            </div>}
            {props.uiLocation === 'header' ? <Icon name='caret down' size='large' className={styles.caret} /> : null}
        </div>
    )
};

export default UserNoAvatar;