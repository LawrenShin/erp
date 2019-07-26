import React from 'react';

export default class Options extends React.Component{
    static defaultProps = {
        onChange: () => {},
        onBlur: () => {},
        fullOutput: true,
    }

    state = {
        value: this.props.value || []
    }

    onChange = (value, name, fullOutput) => {
        if(!fullOutput){
            this.props.onChange({ name: name || this.props.name, value })
        }else{
            const v = this.state.value.includes(value) ? this.state.value.filter( v => v !== value) : [...this.state.value, value]
            this.setState({value: v}, () => {
                this.props.onChange({ name: this.props.name, value: v });
            });
        }
    }

    render(){
        return (
            <div className="options__item">
				<div className={`options__title ${this.props.required}`}>{this.props.label}</div>
                <div className="options-list">
                {
                    this.props.list.map( ({name, value}) => 
                       <label className="options-list__checkbox">
                            <input 
                                name={this.props.name} 
                                required={this.props.required} 
                                disabled={this.props.readOnly} 
                                type="checkbox" 
                                checked={ this.state.value.includes(value) }
                                onChange={() => this.onChange(value, name, this.props.fullOutput)} />
                            <span className={`options-list__title ${this.props.readOnly ? 'hover-none' : ''}`}>{name}</span>
                        </label>
                    )
                }
                {
                    this.props.error ?
                    <div style={{color: "red"}}>{this.props.error}</div> : null
                }
                </div>
            </div>
        );
    }
}