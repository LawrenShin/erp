import React, {PureComponent} from 'react';
import Input from '../../controls/input';
import Header from './header';
import {Dropdown} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {createRequestAction} from '../../../actions/index';
import Loading from '../../helpers/loading';
import styled from 'styled-components';
import {Formik} from 'formik';
import CheckboxComponent from '../../CheckboxComponent';
import IncotermsContactForm from '../create/forms/incoterms/IncotermsContactForm';
import Api from '../../../requestor/api';
import Common from '../../../requestor/common';
import axios from 'axios';
import Supplier from '../../../requestor/supplier';
import {history} from '../../../routes/history'

const Submit = styled(({className, ...rest}) => 
    <input {...rest} type="submit" className={"btn " + className} value="Save" />)`
margin-top: 20px;
width: fit-content;
`;

class ViewSuppierContacts extends PureComponent {
    state = {
        legalFields: [
            {name: 'Address', inputName: 'legal_address'}, 
            {name: 'Address (factory)', inputName: 'factory_address'},    
            {name: 'Legal city', inputName: 'legal_city'}, 
            {name: 'Legal city (factory)', inputName: 'factory_city'}, 
            {name: 'Legal country', inputName: 'legal_country'},
            {name: 'Legal country (factory)', inputName: 'factory_country'},
            {name: 'Person', inputName: 'legal_contact_person'},
            {name: 'Person (factory)', inputName: 'factory_contact_person'},
            {name: 'Email', inputName: 'legal_email'},
            {name: 'Email (factory)', inputName: 'factory_email'},
            {name: 'Tel 1', inputName: 'legal_tel1'},
            {name: 'Tel 1 (factory)', inputName: 'factory_tel1'},
            {name: 'Tel 2', inputName: 'legal_tel2'},
            {name: 'Tel 2 (factory)', inputName: 'factory_tel2'}
        ], 
        cities: [], 
        citiesOptions: [], 
        countries: [],
        countriesOptions: [],

        legalCity: '', 
        legalCityFactory: '', 
        legalCountry: '', 
        legalCountryFactory: '' 
    };

    componentDidMount() {
        if(this.props.needToGetSupplier)
            this.props.getById();

        Api.all([Common.getCities(), Common.getCountries()]).then(axios.spread((cities, countries) => {
            let citiesForDropdown = [], countriesForDropdown = [];
            cities = cities.results;
            for(let city in cities){
                citiesForDropdown.push({ key: cities[city].id, value: cities[city].id, text: cities[city].name });
            }
            countries = countries.results;
            for(let country in countries){
                countriesForDropdown.push({ key: countries[country].id, value: countries[country].id, text: countries[country].name });
            }
            this.setState({ 
                citiesOptions: citiesForDropdown, 
                cities, 
                countriesOptions: countriesForDropdown, 
                countries
            });
        })).catch((err) => { console.log(err) });
    }

    renderFields = (field, index, value, error, onChange) => {
        const {readOnly} = this.props;
        //we handle cities here
        if(field.name === 'Legal city' || field.name === 'Legal city (factory)'){
          
          return (
            <div className="form-box__item">
                <div className="select-elem">
                    <label className="box-field__label">{field.name}:</label>
                    <Dropdown 
                        disabled={readOnly}
                        value={value}
                        onChange={(e, {value}) => onChange({target: {name: field.inputName, value}})} 
                        search selection 
                        options={this.state.citiesOptions} 
                        name={field.inputName} />
                </div>    
                {
                    error ?
                    <div style={{color: "red"}}>{error}</div> : null
                }      
            </div>
          );
        }
        //we handle countries here
        if(field.name === 'Legal country' || field.name === 'Legal country (factory)'){
          
          return (
            <div className="form-box__item">
                <div className="select-elem">
                    <label className="box-field__label">{field.name}:</label>
                    <Dropdown    
                      disabled={readOnly}                     
                      value={value}
                      onChange={(e, {value}) => onChange({target: {name: field.inputName, value}})} 
                      search selection 
                      options={this.state.countriesOptions} 
                      name={field.inputName} />
                </div>      
                {
                    error ?
                    <div style={{color: "red"}}>{error}</div> : null
                }  
            </div>
          );
        }
    
        return (
          <Input readOnly={readOnly} key={index} onChange={onChange} label={field.name} name={field.inputName} value={ value } error={error} />
        )
        
    }
    render() {
        const {supplier, readOnly} = this.props;
        if(supplier.state === "loading")
            return <Loading />;
        if(supplier.state === "fail")
            return <p>{supplier.message}</p>;            

        const {id, name} = supplier.data;
        
        return (            
            <>
                <Header id={id} name={name} selected="1" edit={!readOnly}/>

                <Formik initialValues={ {id, name, ...this.state.legalFields.reduce((prev, cur) => ({
                        ...prev,
                        [cur.inputName]: supplier.data[cur.inputName]
                    }), {})}}
                    validateOnBlur={false}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(false);
                        Supplier.edit(values).then( (res) => {
                            if(res.status === 200){
                                this.props.getById();
                                history.replace(`/suppliers/view/contacts/${this.props.match.params.id}`)
                            }
                        }).catch(res => {
                            if(res.status === 400){
                                actions.setErrors(res.response.data);
                            }
                        })
                    }}
                    render={ ({values, errors, handleSubmit, handleChange, handleBlur}) => (
                        <div className="bg-box box-card-general">
                            <form onSubmit={handleSubmit}>      
                                <div className="form-box">
                                    {this.state.legalFields.map((field, index) => this.renderFields(field, index, values[field.inputName], errors[field.inputName], handleChange))}
                                    {/* <CheckboxComponent readOnly={readOnly} className="form-box__item checkbox-card" onChange={handleChange} label=' factory address is the same' name='factory_address_same' /> */}
                                </div>                                      
                            </form>
                            {/* <IncotermsContactForm 
                                edit={true}
                                onChangeFormik={handleChange}
                                readOnly={this.props.readOnly}
                                removeIncoterm={this.removeIncoterm}
                                prevIncoterms={''}
                            />     */}
                            {!readOnly && <Submit onClick={handleSubmit} />}                  
                        </div>
                )}/>

                
            </>
        );
    }
}

export default connect((state) => ({
    supplier: state.suppliers.supplier,
    needToGetSupplier: state.suppliers.needToGetSupplier
}), (dispatch, ownProps) => ({
    getById: () => dispatch(createRequestAction("supplier", "getById", [ownProps.match.params.id]))
}))(ViewSuppierContacts);