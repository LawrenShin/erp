import React, {PureComponent} from 'react';

import {Form, Icon, Dropdown} from 'semantic-ui-react';
import CheckboxComponent from '../../../CheckboxComponent.js';

import styles from '../../../../css/suppliers/create/forms/additionalContact.module.css';
import OptionsFormStyles from '../../../../css/suppliers/create/forms/optionsForm.module.css';
import suppliersApi from '../../../../requestor/supplier'

class DeliveryTerms extends PureComponent {
    state = {
        fields: ['INCOTERM', 'PORT'],
        ports: [],
        incoterms: [],
        defaultValues: this.props.defaultValues || null,
    };

    async componentDidMount(){
        try{
            const incoterms = await suppliersApi.getIncotermsList()
            const ports = await suppliersApi.getCityList()
            this.setState({ 
                ports: ports.results.map(p => ({ value: p.id, text: p.name })), 
                incoterms: incoterms.results.map(p => ({ value: p.id, text: p.name })),
            })
        
            // const defaultValues = await suppliersApi.getIncoterm(this.props.supplier)
            // this.setState({ defaultValues: defaultValues.results })
        }catch(e){
            console.log(e)
        }
    }

    handleLocalSave = (e, data) => {
        this.props.localSave(data)
    }

    provideDefaults = (field) => {
        if(Array.isArray(this.state.defaultValues) && !!this.state.defaultValues.length){
            return field === 'port' ? this.state.defaultValues[0].port : this.state.defaultValues[0].incoterm
        }
        return null
    }

    renderRow = () => {
        console.log(this.provideDefaults('port'))
        console.log(this.provideDefaults('incoterm'))
        return (
            <div className="table-add__row">
                {this.state.fields.map((field, index) => (
                    <div className="table-add__td">
                        <label className="box-field__label">{field.name}:</label>
                        <div className="select-elem">
                            <Dropdown 
                                key={field} 
                                name={field.toLowerCase()} 
                                selection
                                placeholder={field.toLowerCase()} 
                                disabled={this.props.readOnly}
                                defaultValue={this.provideDefaults(field.toLowerCase())} 
                                options={field.match(/PORT/gm) ? this.state.ports : this.state.incoterms} 
                                onChange={this.handleLocalSave} />
                        </div>
                    </div>
                ))}
                {/* <div className="table-add__td td-remove">
                    <span style={{cursor: "pointer"}} className="table-add__remove"><i
                        className="icon-trash"></i></span>
                </div> */}
            </div>
        );
    };

    render() {
        return this.props.editMode ?
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
                    {/* <CheckboxComponent
                        readOnly={this.props.readOnly}
                        className="delivery-check"
                        onChange={this.props.localSave}
                        label='Main delivery terms'
                        name='main_delivery_terms'/> */}
                </div>
            </div>
            :
            <></>
    }
}

export default DeliveryTerms;