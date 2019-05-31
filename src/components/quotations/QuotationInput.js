import React from 'react';

class QuotationInput extends React.PureComponent {
    state = { 
        value: this.props.value || '',
        elId: `_last_focus_${this.props.name}`,
    }

    timer = false
    
    componentDidUpdate(){
        if(this.timer) {
            clearTimeout(this.timer)
            this.timer = false
        }
        
        this.timer = setTimeout(() => {
            console.log('set')
            this.props.onChange({ name: this.props.name, value: this.state.value, elId: this.state.elId })
        }, 400)
    }

    handleChange = (e) => this.setState({ value: e.target.value })

    render() {
        return (
            <>
                <div className="filters-box__item">
                    <div className="input-elem">
                        <input
                            id={this.state.elId}
                            autoFocus={this.props.focus}
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
