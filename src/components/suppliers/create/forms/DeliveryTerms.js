import React, {Component} from 'react';

import {Form, Icon, Dropdown} from 'semantic-ui-react';
import CheckboxComponent from '../../../CheckboxComponent.js';

import styles from '../../../../css/suppliers/create/forms/additionalContact.module.css';
import OptionsFormStyles from '../../../../css/suppliers/create/forms/optionsForm.module.css';

class DeliveryTerms extends Component {
    state = {
        fields: ['INCOTERM', 'PORT'],
        cifOptions: [
            {text: 'test1', value: 'test1', key: 'test1'},
            {text: 'test2', value: 'test2', key: 'test2'}
        ]
    };

    renderRow = () => {
        return (
            <div className="table-add__row">
                {this.state.fields.map((field, index) => (
                    <div className="table-add__td">
                        <label className="box-field__label">{field.name}:</label>
                        <div className="select-elem">
                            <Dropdown name={field} key={field} placeholder="CIF" selection
                                      options={this.state.cifOptions} onChange={this.props.localSave}/>
                        </div>
                    </div>
                ))}
                <div className="table-add__td td-remove">
                    <span style={{cursor: "pointer"}} className="table-add__remove"><i
                        className="icon-trash"></i></span>
                </div>
            </div>
        );
    };

    render() {
        return (
            <div className="table-add-wrap table-options">
                <div className="options__title">DELIVERY TERMS</div>
                <div className="delivery-terms">
                    <div className="table-add">
                        <div className="table-add__row table-add__head">
                            {this.state.fields.map((field, index) => {
                                if (field.indexOf('icon_') < 0) return <div className="table-add__th"
                                                                            key={field}>{field}</div>
                            })}
                            <div className="table-add__th td-remove"></div>
                        </div>
                        {this.renderRow()}
                    </div>
                    <CheckboxComponent
                        className="delivery-check"
                        onChange={this.props.localSave}
                        label='Main delivery terms'
                        name='main_delivery_terms'/>
                </div>


            </div>
        );
    }
}

export default DeliveryTerms;