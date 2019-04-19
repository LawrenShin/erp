import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Input, Dropdown, Icon } from 'semantic-ui-react';
import Common from '../../requestor/common';
import { setCurrencyPair } from '../../actions/currency.js';
import CurrencyConverter from './CurrencyConverter';

class Currency extends Component{
    state = { 
        pairs: [
            {key: 0, value: JSON.stringify({currency_src: "EUR", currency_dst: "RUB"}), text: 'EUR/RUB'},
            {key: 1, value: JSON.stringify({currency_src: "USD", currency_dst: "RUB"}), text: 'USD/RUB'},
            {key: 2, value: JSON.stringify({currency_src: "CNY", currency_dst: "RUB"}), text: 'CNY/RUB'}
        ], 
        currencyPair: false
    };
//sets currency onload
    setCurrency = async (pair = this.state.pairs[0].value) => {
        let count = 0;
        while(count < this.state.pairs.length){
            if(this.state.pairs[count].value === pair) break;
            count++;
        }
        const currencyPair = await Common.getCurrency(pair);
        this.setState({currencyPair});
    }
//reset currency on change of dropdown
    resetCurrency = (e, {value}) => {
        this.setCurrency(value);
    }
//on input
    
    componentDidMount(){
        if(!this.props.state.currencyPair) this.setCurrency();
    }

    render(){
        const currency = this.state.currencyPair;
        const pairs = this.state.pairs;
        const currentPair = this.props.state.currencyPair;
        return(
            <React.Fragment>
                <div className="header-currency">
                    <Dropdown 
                        onChange={this.resetCurrency} 
                        defaultValue={currentPair ? pairs[currentPair.key].value : pairs[0].value}
                        options={this.state.pairs}
                        className={`currency-dropdown dropdown--arrow-to-left`} />

                    {currency.grow ?
                        <div className="currency-value">
                            <span className="currency-value__count text currency-value_up">- {currency.exchange}</span>
                            <i className="currency-value__icon currency-value_up icon-arrow-grow"></i>
                        </div>
                        :
                        <div className="currency-value">
                            <span className="currency-value__count text currency-value_down">- {currency.exchange}</span>
                            <i className="currency-value__icon currency-value_up arrow-decline"></i>
                        </div>
                    }
                </div>
                <CurrencyConverter pair={this.state.currencyPair} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    state
});

export default connect(mapStateToProps)(Currency);