import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

class AddBtn extends React.Component {
    static defaultProps = {
        onClick: () => {}
    }

    render() {
        return (
            <NavLink to={this.props.to} className={`page-heading__icon ${this.props.className}`} onClick={this.props.onClick}>
                <span className="cls-1">+</span>
            </NavLink>
        )
    } 
}

export default styled(AddBtn)`
    border: 1px solid #74c4df;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:hover{
        background: #74c4df;

        .cls-1{
            color: white;
        }
    }

    .cls-1 {
        font-size: 22px;
        color: #74c4df;
        font-weight: bold;
        font-family: Lato;
        transform: 0.3s;
    }
`;