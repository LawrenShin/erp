import React, {Component} from 'react';
import Api from '../../../../requestor/api';
import axios from 'axios';

import {contactFormPropDefiner} from './ContactFormPropDefiner.js';
import CheckboxComponent from '../../../CheckboxComponent.js';
import {Dropdown} from 'semantic-ui-react';
import IncotermsContactForm from './incoterms/IncotermsContactForm.js';
import StepControls from '../../../StepControls.js';
import Common from '../../../../requestor/common';
import Input from '../../../controls/input';

class ContactForm extends Component {
    state = {
        info: {},
        legalFields: [
            {name: 'Address', inputName: 'legal_address', required: 'required'},
            {name: 'Address (factory)', inputName: 'factory_address'},
            {name: 'Legal city', inputName: 'legal_city'},
            {name: 'Legal city (factory)', inputName: 'factory_city'},
            {name: 'Legal country', inputName: 'legal_country'},
            {name: 'Legal country (factory)', inputName: 'factory_country'},
            {name: 'Person', inputName: 'legal_contact_person', required: 'required'},
            {name: 'Person (factory)', inputName: 'factory_contact_person'},
            {name: 'Email', inputName: 'legal_email', required: 'required'},
            {name: 'Email (factory)', inputName: 'factory_email'},
            {name: 'Tel 1', inputName: 'legal_tel1', required: 'required'},
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

    nameTransformer = (name) => name.replace(/ /g, '_').replace(name[0], name[0].toLowerCase());

    renderFields = (field, index, incoterm) => {
        //we handle cities here
        if (field.name === 'Legal city' || field.name === 'Legal city (factory)') {
            let prevCity = '';
            if (field.name === 'Legal city (factory)') {
                const factory_city = this.props.info.factory_city;
                if (factory_city) prevCity = this.state.citiesOptions.filter((city) => city.value === factory_city);
            } else {
                const legal_city = this.props.info.legal_city;
                if (legal_city) prevCity = this.state.citiesOptions.filter((city) => city.value === legal_city);
            }
            return (
                <div className="form-box__item">
                    <div className="select-elem">
                        <label className="box-field__label required">{field.name}</label>
                        <Dropdown
                            defaultValue={prevCity ? prevCity[0].key : ''}
                            onChange={this.localSave}
                            search selection
                            options={this.state.citiesOptions}
                            name={field.inputName}/>
                    </div>
                </div>
            );
        }
        //we handle countries here
        if (field.name === 'Legal country' || field.name === 'Legal country (factory)') {
            let prevCountry = '';
            if (field.name === 'Legal country (factory)') {
                const factory_country = this.props.info.factory_country;
                if (factory_country) prevCountry = this.state.countriesOptions.filter((country) => country.value === factory_country);
            } else {
                const legal_country = this.props.info.legal_country;
                if (legal_country) prevCountry = this.state.countriesOptions.filter((country) => country.value === legal_country);
            }
            return (
                <div className="form-box__item">
                    <div className="select-elem">
                        <label className="box-field__label required">{field.name}</label>
                        <Dropdown
                            defaultValue={prevCountry ? prevCountry[0].key : ''}
                            onChange={this.localSave}
                            search selection
                            options={this.state.countriesOptions}
                            name={field.inputName}/>
                    </div>
                </div>
            );
        }

        return (
            <Input required={field.required} key={index} onChange={this.localSave} label={field.name} name={field.inputName}
                   value={this.state.info[field.inputName] ? this.state.info[field.inputName] : ''}/>
        )

    }

    localSave = ({name, value, checked}) => {
        //finally this switcher defines where to save what after change
        switch (name) {
            case 'legal_city':
                this.setState({legalCity: this.state.cities.filter((city) => city.id === value)[0]}, () => this.proceed(0));
                break;
            case 'legal_city_factory':
                this.setState({legalCityFactory: this.state.cities.filter((city) => city.id === value)[0]}, () => this.proceed(0));
                break;
            case 'legal_country':
                this.setState({legalCountry: this.state.countries.filter((country) => country.id === value)[0]}, () => this.proceed(0));
                break;
            case 'legal_country_factory':
                this.setState({legalCountryFactory: this.state.countries.filter((country) => country.id === value)[0]}, () => this.proceed(0));
                break;

            default:
                this.setState((prev) => {
                    let state = prev;
                    state.info[name] = value || checked;
                    return state;
                }, () => this.proceed(0))
        }
    }

    pullIncoterms = () => {
        return this._incotermsForm.state.incoterms;
    }

    proceed = (step = 1) => {
        const state = this.state;
        let dataToSave = {...state.info, incoterms: this.pullIncoterms()};
        //check wether to set values to proceed. Has a bug - if u set values and come back changing any of them causes reset of all.
        if (state.legalCity) contactFormPropDefiner(dataToSave, 'legal_city', state.legalCity.id);
        if (state.legalCityFactory) contactFormPropDefiner(dataToSave, 'factory_city', state.legalCityFactory.id);
        if (state.legalCountry) contactFormPropDefiner(dataToSave, 'legal_country', state.legalCountry.id);
        if (state.legalCountryFactory) contactFormPropDefiner(dataToSave, 'factory_country', state.legalCountryFactory.id);

        this.props.saveStepInfo(dataToSave, 'contact', step);
    }

    componentDidMount() {
        //fetch then setup, options for dropdowns and lists of corresponded data
        Api.all([Common.getCities(), Common.getCountries()]).then(axios.spread((cities, countries) => {
            let citiesForDropdown = [], countriesForDropdown = [];
            cities = cities.results;
            for (let city in cities) {
                citiesForDropdown.push({key: cities[city].id, value: cities[city].id, text: cities[city].name});
            }
            countries = countries.results;
            for (let country in countries) {
                countriesForDropdown.push({
                    key: countries[country].id,
                    value: countries[country].id,
                    text: countries[country].name
                });
            }
            this.setState({
                citiesOptions: citiesForDropdown,
                cities,
                countriesOptions: countriesForDropdown,
                countries
            });
        })).catch((err) => {
            console.log(err)
        });
        if (Object.keys(this.props.info)) this.setState({info: {...this.props.info}});
    }

    getIncotermsFormRef = (node) => {
        this._incotermsForm = node
    };

    render() {
        //check wether we fetched dropdowns data
        if (this.state.citiesOptions.length) {
            return (
                <div className="bg-box box-supplier">
                    <form>
                        <div className="form-box">
                            {this.state.legalFields.map((field, index) => this.renderFields(field, index))}
                            <CheckboxComponent className="form-box__item checkbox-card" onChange={this.localSave}
                                               label=' factory address is the same' name='factory_address_same'/>
                        </div>
                    </form>
                    <IncotermsContactForm
                        renderFields={this.renderFields}
                        removeIncoterm={this.removeIncoterm}
                        ref={this.getIncotermsFormRef}
                        prevIncoterms={this.props.info.incoterms || ''}
                    />
                </div>
            );
        } else {
            return (
                <div>loading dictionaries...</div>
            );
        }
    }
}

export default ContactForm;