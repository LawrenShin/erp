import React from 'react';

export default class Options extends React.Component {
    onChange = (e, value, name) => {
        if (this.props.multi) {
            const v = this.state.value.includes(value) ? this.state.value.filter(v => v !== value) : [...this.state.value, value]
            this.setState({value: v}, () => {
                this.props.onChange({target: {name: this.props.name, value: v}});
            });

        } else {
            this.props.onChange({target: {name: name || this.props.name, value, checked: e.target.checked}})
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
                                    <label className="radio-list__label">
                                        <input disabled={this.props.readOnly} type="checkbox"
                                               className="radio-list__check" name={name}
                                               required={this.props.required}
                                               value={this.props.value.includes(value)}
                                               onChange={(e) => this.onChange(e, value, name)}/>
                                        <span className="radio-list__title">{name}</span>
                                    </label>
                                )
                            } else
                                return (
                                    <label className="radio-list__label">
                                        <input disabled={this.props.readOnly} type="radio" className="radio-list__check"
                                               name={this.props.name} value={value} checked={this.props.value === value}
                                               defaultValue={this.props.defaultValue}
                                               required={this.props.required}
                                               onChange={(e) => this.onChange(e, value)}/>
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
