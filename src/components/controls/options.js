import React from 'react';
import uuid from 'uuid'

export default class Options extends React.Component {
    state = { value: this.props.selectedOptions }
    componentDidMount(){
        this.props.selectedOptions && this.setState({ value: this.props.selectedOptions })
    }
    onChange = (value) => {
        if (this.props.multi) {
            const v = this.state.value.includes(value) ? this.state.value.filter(v => v !== value) : [...this.state.value, value]
            this.setState({value}, () => {
                this.props.onChange({target: {name: this.props.name, value: v}});
            });
        } else {
            this.setState({value}, () => {
                this.props.onChange({target: {name: this.props.name, value}})
            });
        }

    };
    onBlur = (e) => {
        this.props.onBlur({target: {...e.target}});
    };
    static defaultProps = {
        onChange: () => {
        },
        onBlur: () => {
        }
    };
    state = {
        value: this.props.value || (this.props.multi ? [] : '')
    };

    render() {
        return (
            <div className="form-box__item">
                <label className={`box-field__label ${this.props.required}`}>{this.props.label}</label>
                <div className="radio-list">
                    {
                        this.props.list.map(({name, value}) => {
                            if (this.props.multi) {
                                return (
                                    <label className="radio-list__label" key={uuid()}>
                                        <input disabled={this.props.readOnly} 
                                                type="checkbox"
                                                className="radio-list__check" 
                                                name={name}
                                                required={this.props.required}
                                                value={this.props.value.includes(value)}
                                                onChange={() => this.onChange(value, name)} />
                                        <span className="radio-list__title">{name}</span>
                                    </label>
                                )
                            } else
                                return (
                                    <label className="radio-list__label" key={uuid()}>
                                        <input disabled={this.props.readOnly} 
                                                className="radio-list__check"
                                                type="radio" 
                                                name={this.props.name} value={value} 
                                                checked={this.state.value === value}
                                                defaultValue={this.props.defaultValue}
                                                required={this.props.required}
                                                onChange={() => this.onChange(value)} />
                                        <span className="radio-list__title">{name}</span>
                                    </label>
                                )
                        })
                    }
                    {this.props.children}
                    <p style={{color: "red"}}>{this.props.error || null}</p>
                </div>
            </div>
        );
    }
}
