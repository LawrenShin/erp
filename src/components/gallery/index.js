
import React from 'react';
import ImageGallery from 'react-image-gallery';
import {connect} from 'react-redux';

import "react-image-gallery/styles/css/image-gallery.css";

import styled from 'styled-components';

import i1 from "./img/1.png";
import i2 from "./img/purchaising.png";
import i3 from "./img/paymentmanagerdashboard.png";
import i4 from "./img/sourcingmanager.png";
import i5 from "./img/customers.png";
import i6 from "./img/messages.png";
import i7 from "./img/supplierlist.png";
import i8 from "./img/suppliercard.png";
import i9 from "./img/attachfiles.png"; 
import i10 from "./img/orderhistory.png";
import i11 from "./img/products.png";
import i12 from "./img/quotations.png" 

const images = [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12].map( i => ({original: i}));

class Gallery extends React.Component {   
    onClick = (e) => {  
        if(e.target.className === this.props.className){
            this.props.dispatch({type: 'HIDE_GALLERY'});
            this.setState({show: false});
        }
    }

    state = { show: this.props.show || localStorage.getItem("visited") === null }
    
    saveVisited() {
        localStorage.setItem("visited", "1");
    }    

    componentDidMount() {
        
    }
    
    render() {
        return (
            this.props.show ? 
                <div className={this.props.className} onClick={this.onClick}>
                    <div>
                        <iframe width="100%" height="100%" src="/slider.html" border="0" />
                    </div>
                </div>
            :
            null
        )
    }
}

export default connect( (state) => ({
    show: state.common.showGallery
}))(styled(Gallery)`
    display: flex;
    margin: auto;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
    z-index: 999999;
    background-color: rgba(0, 0, 0, 0.6);

    div {
        display: flex;
        width: 90%;
        height: 90%;
        margin: auto;
        border-radius: 6px;
        overflow: hidden;
    }
`);