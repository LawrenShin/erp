import React from 'react';

export default class Input extends React.Component{

    state = {
        value: ''
    }

    static defaultProps = {
        onChange: () => {},
        onBlur: () => {}
    }

    onChange = (e) => {
        this.props.onChange({target: {name: this.props.name, value: e.target.value}, name: this.props.name, value: e.target.value, checked: false});
        if(this.props.type === "file"){
            this.setState({value: e.target.value});
        }
    }
    onBlur = (e) => {
        this.props.onBlur({target: {name: this.props.name, value: e.target.value}, name: this.props.name, value: e.target.value, checked: false});
        if(this.props.type === "file"){
            this.setState({value: e.target.value});
        }
    }

    onBlur = (e) => {
        this.props.onBlur({target: {name: this.props.name, value: e.target.value}});
    }

    renderInput = (type) => {
        return type === "file" ?
            <div className="box-field">
                <label className="box-field__label">{this.props.label && `${this.props.label}`}</label>
                <div className="term-select">
                    <input type="text" className="box-field__input" defaultValue={this.state.value} readOnly/>
                    <div className="item-upload">
                        <div className="item-upload-input"><i className="icon-upload"></i><input type="file" onChange={this.onChange} onBlur={this.onBlur}/></div>
                    </div>
                    <div className="item-load">
                        <a href="#" target="_blank" download="download"><i className="icon-file"></i></a>
                    </div>
                </div>
            </div>
        :
            <div className="box-field">
                <label className={`box-field__label ${this.props.required}`} htmlFor={this.props.name}>{this.props.label && `${this.props.label}`}</label>
                <input required={this.props.required} readOnly={this.props.readOnly} type={this.props.type || 'text'} className={`box-field__input ${this.props.className}`} id={this.props.name} name={this.props.name} onChange={this.onChange} onBlur={this.onBlur} value={this.props.value} maxLength={this.props.maxLength} defaultValue={this.props.defaultValue}/>
            </div>
    }
    renderSimple = () => {
        return (
            <>
                {this.renderInput(this.props.type)}
                {
                    this.props.error ?
                    <div style={{color: "red"}}>{this.props.error}</div> : null
                }
            </>
        )
    }
    render(){
        return (
            this.props.uiType === "tableInside" ?
                <div className="table-add__td">
                    <label className="box-field__label">{this.props.label && `${this.props.label}:`}</label>
                    <input readOnly={this.props.readOnly} type={this.props.type || 'text'} className="table-add__input" id={this.props.name} onChange={this.onChange} onBlur={this.onBlur} value={this.props.value} defaultValue={this.props.defaultValue} maxLength={this.props.maxLength} />
                </div>
            :
            this.props.simple ?
                this.renderSimple()
            :
                <div className="form-box__item">									
                    {this.renderSimple()}
                </div>
        );
    }
}