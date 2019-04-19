import React from 'react';
import {history} from '../../routes/history';

class BackBtn extends React.Component {
    render() {
        return (
            <span className="card-filters-nav__item card-filters-nav__back" onClick={() => history.goBack()}>
                <i className="icon-arrow-left"></i>
            </span>
        )
    } 
}

export default BackBtn;