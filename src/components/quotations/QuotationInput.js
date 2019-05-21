import React from 'react';

class QuotationInput extends React.PureComponent {
    state = { value: this.props.value || '' }

    timer = false
    inputRef = React.createRef();

    componentDidUpdate(){
        if(this.timer) {
            clearTimeout(this.timer)
            this.timer = false
        }
        
        this.timer = setTimeout(() => {
            console.log('set')
            this.props.onChange({name: this.props.name, value: this.state.value})
            this.props.setLastFocus(this.inputRef)
        }, 400)
    }

    handleChange = (e) => this.setState({ value: e.target.value })

    render() {
        return (
            <>
                <div className="filters-box__item">
                    <div className="input-elem">
                        <input
                            ref={this.inputRef}
                            className="filters-input"
                            type="text"
                            placeholder={this.props.placeholder}
                            name={this.props.name}
                            value={this.state.value}
                            onChange={this.handleChange} />
                    </div>
                </div>
            </>
        );
    }
}

export default QuotationInput;
