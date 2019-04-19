import React from 'react';

export default class Checkbox extends React.Component{
    static defaultProps = {
        onChange: () => {},
        onBlur: () => {}
    }
    
    onChange = (e) => {
        this.props.onChange({target: {name: this.props.name, value: e.target.checked, checked: e.target.checked}, name: this.props.name, value: e.target.checked, checked: e.target.checked})
    }
    renderSimple = () => {
        return (
            <div className="checkbox-elem">
                <input type="checkbox" id={this.props.name} name={this.props.name} onChange={this.onChange} checked={this.props.checked} disabled={this.props.readOnly} defaultChecked={this.props.defaultChecked}/>
                <label className="checkbox-label" htmlFor={this.props.name}>{this.props.label}</label>
            </div>
        )
    }
    render(){
        return this.props.simple ?
            this.renderSimple()
            :
            <div className="box-field-checkbox">									
                {this.renderSimple()}
            </div>;
    }
}