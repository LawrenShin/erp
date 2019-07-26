import React from 'react';
import { Dropdown as DropdownSemantic} from 'semantic-ui-react';
import styled from 'styled-components';
import uuid from 'uuid';

const Simple = styled(DropdownSemantic)`
    &.ui.multiple.dropdown>.text {
        margin: 0;
    }
`;

export default class Dropdown extends React.Component{
    static defaultProps = {
        onBlur: () => {},
        onChange: () => {}
    }

    state = {
        backValue: this.props.value || ""
    }

    handleChange = (e, data) => {
        if(data.value !== this.state.backValue){
            this.setState({backValue: data.value});

            this.props.onChange({
                target: {
                    name: this.props.name,
                    value: data.value
                },
                ...data,
                name: this.props.name
            });
        }
    }

    handleBlur = (e) => {
        this.props.onBlur({
            target: {
                name: this.props.name
            }
        });
    }

    render(){
        const {name, options, value, placeholder, label, uiType, simple, noEmpty} = this.props;
        const title = placeholder || label;
        const optionsWithEmptyVal = noEmpty ? options : [{text: "Not selected", value: ""}, ...options];

        if(simple)
            return <Simple 
                key={uuid()} 
                className={`fluid multiple special selection`} 
                value={value || ""} 
                options={optionsWithEmptyVal} 
                placeholder={title} 
                onChange={this.handleChange} 
                onBlur={this.handleBlur} />

        return (
            uiType === "form-box" ?
            <div className="form-box__item">
                <div className="box-field">
                    <div className="select-elem">
                        <label className="box-field__label">{title ? title : options.find( o => o.value === value).text}:</label>
                        <DropdownSemantic 
                            key={uuid()} 
                            className={`fluid selection`} 
                            value={value} 
                            options={options} 
                            placeholder="" 
                            onChange={this.handleChange} />
                    </div>
                </div>
            </div>
            :
            <div className="filters-box__item">
                <div className="filters-elem select-elem select-elem_multiple">
                    <div className="select-elem__text">{value ? options.find( o => o.value === value).text : title}</div>
                    <DropdownSemantic 
                        key={uuid()} 
                        className={`fluid multiple special selection`} 
                        value={value || ""} 
                        options={optionsWithEmptyVal} 
                        placeholder={title} 
                        onChange={this.handleChange} />
                </div>
            </div>);
    }
}