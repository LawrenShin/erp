import React from "react";
import styled from 'styled-components';

const Beta = styled.span`
    padding: 4px 3px 2px;
    color: #103453;
    background-color: #65e1d4;
    vertical-align: middle;
    display: inline-block;
    border-radius: 5px;
    margin-left: 2px;
    font-size: 8px;
    font-weight: bold;
    line-height: 8px;
    position: relative;
    top: -6px;
    left: 6px;
`;
    
const VERSION = process.env.REACT_APP_VERSION;
const IS_BETA = +process.env.REACT_APP_IS_BETA;

const SystemTitle = () => {
    return (
        <span className="logo">
            <span><span className="logo__title">NL</span><span className="logo__head">GROUP</span></span>
            <span className="logo_v" style={{position: "relative"}}>
                ENTERPRISE v{VERSION}
                {IS_BETA ? <Beta>beta</Beta> : null}
            </span>
        </span>
    );
}

export default SystemTitle;