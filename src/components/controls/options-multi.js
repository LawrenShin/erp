import React from 'react';

export default class Options extends React.Component{
    onChange = (e, value, name, fullOutput) => {
        if(!fullOutput)
            this.props.onChange(e, {name: name || this.props.name, value, checked: e.target.checked})
        else{
            const v = this.state.value.includes(value) ? this.state.value.filter( v => v !== value) : [...this.state.value, value]
            this.setState({value: v}, () => {
                this.props.onChange({target: {name: this.props.name, value: v}});
            });
        }
    }
    static defaultProps = {
        onChange: () => {},
        onBlur: () => {},
        fullOutput: true
    }
    state = {
        value: this.props.value || []
    }
    render(){
        return (
            <div className="options__item">
				<div className="options__title">{this.props.label}</div>
                <div className="options-list">
                {
                    this.props.list.map( ({name, value}) => 
                        <label className="options-list__checkbox">
                            <input disabled={this.props.readOnly} type="checkbox" checked={Array.isArray(this.state.value) && this.state.value.includes(value)} onChange={(e) => this.onChange(e, value, name, this.props.fullOutput)} />
                            <span className="options-list__title">{name}</span>
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