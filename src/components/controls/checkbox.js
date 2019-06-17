import React from 'react';

export default class Checkbox extends React.PureComponent{
    state = { checked: this.props.checked || false }
    static defaultProps = {
        onChange: () => {},
        onBlur: () => {}
    }
    
    onChange = (e) => {
        if('checked' in this.props){
            this.setState({ checked: !this.state.checked })
        }
        this.props.onChange({ target: {name: this.props.name, value: e.target.checked, checked: e.target.checked}, name: this.props.name, value: e.target.checked, checked: e.target.checked, stateChecked: this.state.checked })
    }
    renderSimple = () => {
        return (
            <div className="checkbox-elem">
                <input type="checkbox" id={this.props.name} name={this.props.name} onChange={this.onChange} checked={this.state.checked} disabled={this.props.readOnly} defaultChecked={this.props.defaultChecked}/>
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