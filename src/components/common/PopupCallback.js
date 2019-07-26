import React from 'react';
import className from 'classnames';
{/*import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import className from 'classnames';

const PopupCallback = ({time, text, error, popupDone}) => {

    if (!!time) setTimeout(() => {
        console.log(text)
        popupDone()

    }, time)

    return (
        <>
            <div
                className={className('popup-callback animated', {'zoomIn': !!text}, {'zoomOut': !!text}, {'-text-color-red': error})}>
                {text}
            </div>
        </>
    );
};

export default connect(state => ({
    popupMessage: state.common.popupMessage
}), dispatch => ({
    popupDone: () => dispatch({type: 'POPUP_DONE'})
}))(PopupCallback);*/}

const PopupCallback = (props) => {
    return (
        <>
            <div className={className('popup-callback animated', {'zoomIn': props.visible}, {'zoomOut': !props.visible}, {'-text-color-red': props.error})}>{props.text}</div>
        </>
    );
};

export default PopupCallback;