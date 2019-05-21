import React from 'react';
import className from 'classnames'

const CommonButton = ({text, type, disabled, ...rest}) => {
    if(!disabled) {
        return (
            <button 
                className={ className('btn', type, {'btn-disabled': disabled }) } 
                type="button"
                {...rest} >
                {text}
            </button>
        );
    }else{
        return (
            <button 
                className={ className('btn', type, {'btn-disabled': disabled }) } 
                type="button" >
                {text}
            </button>
        );
    }
};

export default CommonButton;