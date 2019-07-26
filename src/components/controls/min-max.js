import React from 'react';

export default class MinMaxInput extends React.Component {
    static defaultProps = {
        name: {},
        value: {}
    };
    state = {
        minValue: this.props.min !== undefined ? this.props.min : this.props.value.min || "",
        maxValue: this.props.max !== undefined ? this.props.max : this.props.value.max || ""
    };
componentWillReceiveProps(props){
    if (props.min) this.setState({ minValue: +props.min })
    if (props.max) this.setState({ maxValue: +props.max })
}
    getName = (type) => {
        if (type === 'min')
            return this.props.minName !== undefined ? this.props.minName : this.props.name.min || "";
        else if (type === 'max')
            return this.props.maxName !== undefined ? this.props.maxName : this.props.name.max || "";
    };
    onChange = (e, type) => {

        function clb(type) {
            this.props.onChange({
                name: this.getName(type),
                value: (type === 'min' ? this.state.minValue : this.state.maxValue),
                target: {
                    name: this.getName(type),
                    value: (type === 'min' ? this.state.minValue : this.state.maxValue)
                }
            });
        }

        type === 'min' ? this.setState({
            minValue: e.target.value
        }, clb.bind(this, type)) : this.setState({
            maxValue: e.target.value
        }, clb.bind(this, type));


    };

    render() {
        return (
            <div className="form-box__item">
                <div className="box-field">
                    <label className={`box-field__label ${this.props.required}`}>{this.props.label}</label>
                    <div className="box-field_two">
                        <span className="box-field__smalllabel">{this.props.minLabel || 'Min'}
                            {
                                this.props.minError ?
                                    <div style={{color: "red"}}>{this.props.minError}</div> : null
                            }
                        </span>
                        <input 
                            disabled={this.props.readOnly}
                            type="number" 
                            className="box-field__input" 
                            value={this.state.minValue} 
                            required={this.props.required}
                            onChange={(e) => this.onChange(e, "min")} />
                        <span className="box-field__smalllabel">{this.props.maxLabel || 'Max'}</span>
                        {
                            this.props.maxError ?
                                <div style={{color: "red"}}>{this.props.maxError}</div> : null
                        }
                        <input 
                            disabled={this.props.readOnly}
                            type="number" 
                            className="box-field__input" 
                            value={this.state.maxValue} 
                            required={this.props.required}
                            onChange={(e) => this.onChange(e, "max")}/>
                    </div>
                </div>
            </div>
        );
    }
}