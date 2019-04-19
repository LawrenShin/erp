import React, {Component} from 'react';

import InDevelopment from '../InDevelopment';

class Orders extends Component {
    state = {title: 'Orders'}

    componentDidMount(){
        document.querySelector(".content-page").classList.add('content-page-messages');
    }

    componentWillUnmount(){
        document.querySelector(".content-page").classList.remove('content-page-messages');
    }

    render(){
        return(
            <InDevelopment />
        );
    }
}

export default Orders;