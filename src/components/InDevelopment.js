import React, {Component} from 'react';
import inDev from '../assets/img/in_dev.svg';
import styled from 'styled-components';

const imgW = window.screen.availWidth < 1300 ? `width: 50em;` : `width: 60em;`;
const imgMarg = window.screen.availWidth > 1700 ? `margin-left: -25em;` : `margin-left: -30em;`;

const Dummy = styled.div`
    background-color: #151547;
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;
    text-align: center;
    
    span{
        font-size: 44px;
        position: relative;
        top: 2em;
        color: #34dce7;
    }
    .in-dummy{
      width: 60em;
        position: relative;
        left: 50%;
        margin-left: -30em;
    }
`;

export default class InDevelopment extends Component {
    state = {title: 'Analytics'}

    render(){
        return(
            <Dummy>
                <span>IN DEVELOPMENT</span>
                <div className='in-dummy'>
                    <img src={inDev} />
                </div>
            </Dummy>
        );
    }
}