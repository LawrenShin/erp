import React, {Component} from 'react';

class CurrencyConverter extends Component {
    state = {
        exchange: '',
        from: 1,
        to: '',
        reverse: false
    };

    componentDidUpdate(prevProps) {
        if ((!prevProps.pair && this.props.pair) || (prevProps.pair.exchange !== this.props.pair.exchange)) {
            this.setState({exchange: this.props.pair.exchange, from: 1, to: this.props.pair.exchange});
        }
    }

    handleChange = (e) => {
        const {value} = e.target;
        this.state.reverse ? this.setState({to: value / this.state.exchange, from: value}) : this.setState({to: value * this.state.exchange, from: value});
    };

    handleReverse = () => {
        this.setState({reverse: !this.state.reverse});
        this.state.reverse ? this.setState({to: this.state.exchange, from: 1}) : this.setState({to: 1, from: this.state.exchange});
    };

    render() {
        if (this.state.reverse) {
            return (
                <div className="currency-converter">
                    <div className="currency-converter__col">
                        <label className="currency-converter__label">{this.props.pair.currency_dst}</label>
                        <input type="number"
                               className="currency-converter__input"
                               value={this.state.from}
                               id='currency_src_input'
                               onChange={this.handleChange}/>
                    </div>
                    <span className="currency-converter__divider">
                        <a onClick={this.handleReverse}><i className="icon-exchange"></i></a></span>
                    <div className="currency-converter__col">
                        <label className="currency-converter__label">{this.props.pair.currency_src}</label>
                        <input
                            type="number"
                            className="currency-converter__input"
                            value={this.state.to || this.state.exchange}
                            id='currency_dst_input'
                            disabled/>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="currency-converter">
                    <div className="currency-converter__col">
                        <label className="currency-converter__label">{this.props.pair.currency_src}</label>
                        <input
                            type="number"
                            className="currency-converter__input"
                            value={this.state.from}
                            id='currency_src_input'
                            onChange={this.handleChange}/>
                    </div>
                    <span className="currency-converter__divider"><a onClick={this.handleReverse}><i
                        className="icon-exchange"></i></a></span>
                    <div className="currency-converter__col">
                        <label className="currency-converter__label">{this.props.pair.currency_dst}</label>
                        <input type="number" className="currency-converter__input"
                               value={this.state.to || this.state.exchange} id='currency_dst_input' disabled/>
                    </div>
                </div>
            );
        }
    }
}

export default CurrencyConverter;