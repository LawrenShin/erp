import React from 'react';

export default class TextArea extends React.Component {
    static defaultProps = {
        onChange: () => {
        }
    };

    onChange = (e) => {
        this.props.onChange({
            target: {
                name: this.props.name, value: e.target.value, checked: false
            }, name: this.props.name, value: e.target.value, checked: false
        })
    };

    renderSimple = () => {
        return (
            <>
                <div className={this.props.className}>
                    <label className="box-field__label"
                           htmlFor={this.props.name}>{this.props.label && `${this.props.label}`}</label>
                    <textarea 
                        disabled={this.props.readOnly}
                        rows={this.props.rows} 
                        cols={this.props.cols} 
                        className="box-field__input"
                        id={this.props.name} 
                        onChange={this.onChange} 
                        value={this.props.value ? this.props.value : ''}
                        defaultValue={this.props.defaultValue}></textarea>
                </div>
                {
                    this.props.error ?
                        <div style={{color: "red"}}>{this.props.error}</div> : null
                }
            </>
        )
    };

    render() {
        return (
            this.props.simple ?
                this.renderSimple()
                :
                <div className="form-box__item">
                    {this.renderSimple()}
                </div>
        );
    }
}