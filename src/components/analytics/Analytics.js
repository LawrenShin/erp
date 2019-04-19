import React, {Component} from 'react';
import InDevelopment from '../InDevelopment';

class Analytics extends Component {
    state = {title: 'Analytics'}

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

export default Analytics;