import React from 'react';

export default class MinMaxInput extends React.Component{
    getName = (type) => {
        if(type === 'min')
            return this.props.minName !== undefined ? this.props.minName : this.props.name.min;
        else if(type === 'max')
            return this.props.maxName !== undefined ? this.props.maxName : this.props.name.max;
    }
    onChange = (e, type) => {
        this.props.onChange(e, {
            name: this.getName(type), 
            value: e.target.value
        })
    }
    render(){
        return (
            <div className="form-box__item">									
                <div className="box-field">
                    <label className="box-field__label">{this.props.label}:</label>
                    <div className="box-field_two">
                        <span className="box-field__smalllabel">{this.props.minLabel || 'Min'}</span>
                        <input type="text" className="box-field__input" defaultValue={this.props.min !== undefined ? this.props.min : this.props.value.min} onChange={(e) => this.onChange(e, "min")}/>
                        <span className="box-field__smalllabel">{this.props.maxLabel || 'Max'}</span>
                        <input type="text" className="box-field__input" defaultValue={this.props.max !== undefined ? this.props.max : this.props.value.max} onChange={(e) => this.onChange(e, "max")}/>
                    </div>
                </div>
            </div>
        );
    }
}