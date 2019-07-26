import React from 'react';
import className from 'classnames'

const CommonButton = ({text, type, disabled, noclick, ...rest}) => {
    if(!disabled) {
        return (
            <button 
                className={ className('btn', type, {'btn-disabled': disabled }) } 
                type="button"
                {...rest} >
                <span>{text}</span>
            </button>
        );
    }else{
        return (
            <button 
                className={ className('btn', type, {'btn-disabled': disabled }) }
                type="button" >
                <span>{text}</span>
            </button>
        );
    }
};

export default CommonButton;