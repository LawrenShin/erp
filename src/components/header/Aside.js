import React, {Component} from "react";
import {connect} from 'react-redux';

import SystemTitle from './SystemTitle.js';
import Navigation from '../navigation';

import styled from 'styled-components';

import icon from './present.svg';

const ShowGallery = styled(({onClick, className}) => {
    return <span className={className} onClick={onClick}><img title="Show presentation" width="32" height="32" src={icon} /></span>
})`
    margin-top: auto;
    align-self: center;
    margin-bottom: 20px;    
    padding-top: 50px;
    cursor: pointer;
    opacity: 0.4;

    img{
        transition: 0.3s linear;    
        &:hover {
            transform: rotateZ(360deg);
        }
    }
`

class Aside extends Component{
    render(){
        return (
            <aside className={`aside js-scroll ${this.props.className}`} id="aside">
                <SystemTitle />
                <Navigation />
                {/*<ShowGallery onClick={this.props.showGallery} />*/}
            </aside>
        );
    }
}

export default connect(null, (dispatch) => ({
    showGallery: () => dispatch({type: 'SHOW_GALLERY'})
}))(styled(Aside)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 1;
    &::-webkit-scrollbar {   
        display: none !important;
    }
`);