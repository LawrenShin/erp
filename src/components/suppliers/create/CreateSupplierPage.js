import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {history} from '../../../routes/history'
import {
    generalFormSubmit,
    contactFormSubmit,
    optionsFormSubmit,
    bankFormSubmit,
    stepBack
} from '../../../actions/createSupplier.js';
import {Prompt} from "react-router-dom";
import Steps from './Steps.js';
import GeneralForm from './forms/GeneralForm.js';
import ContactForm from './forms/ContactForm.js';
import OptionsForm from './forms/OptionsForm.js';
import BankForm from './forms/BankForm.js';
import Supplier from '../../../requestor/supplier';
import {NavLink} from 'react-router-dom';
import * as yup from 'yup'

class CreateSupplierPage extends PureComponent {
    state = {
        generalInfoSchema: yup.object().shape({
            name: yup.string().required(),
            importer: yup.string().required(),
            agreement_number: yup.string().required(),
            status: yup.string().required(),
            type: yup.string().required(),
            purchaser: yup.string().required(),
            consignee: yup.string().required(),
            payment_terms_date: yup.string().required(),
            moq_max: yup.number().required().integer(),
            moq_min: yup.number().required().integer(),
        }),
        contactsInfoSchema: yup.object().shape({
            legal_address: yup.string().required(),
            legal_city: yup.string().required(),
            legal_country: yup.string().required(),
            legal_contact_person: yup.string().required(),
            legal_email: yup.string().email().required(),
            legal_tel1: yup.number().required(),
            incoterms: yup.array().of(
                yup.object().shape({
                    email: yup.string().email(),
                    person: yup.string(),
                    purpose: yup.string(),
                    tele1: yup.string(),
                    tele2: yup.string(),
                })
            )
        }),
        optionsInfoSchema: yup.object().shape({
            categories: yup.string().required(),
            ages: yup.string().required(),
            genders: yup.string().required(),
        }),
        errors: [], modified: false, created: false, supId: false
    };

    saveStepInfo = (info, form, step = 1) => {
        switch (form) {
            case 'general':
                this.props.dispatch(generalFormSubmit(info, step));
                break;
            case 'contact':
                this.props.dispatch(contactFormSubmit(info, step));
                break;
            case 'options':
                this.props.dispatch(optionsFormSubmit(info, step));
                break;
            case 'bank':
                this.props.dispatch(bankFormSubmit(info, step));
                break;
            default:
                console.log('not binded');
        }
        if (!step) this.setState({modified: true});
    };

    stepBack = () => this.props.dispatch(stepBack());

    createSupplier = (bankInfo) => {
        //refactoring date for DB
        const createSupplierData = this.props.createSupplier;
        if ('general_info' in this.props.createSupplier && 'payment_terms_date' in this.props.createSupplier.general_info) {
            let formattedDate = this.props.createSupplier.general_info.payment_terms_date.split(' ').reverse().join('-');
            createSupplierData.general_info.payment_terms_date = formattedDate;
        }

        const supplier = {
            ...createSupplierData.general_info,
            ...createSupplierData.contact_info,
            ...createSupplierData.options_info,
            ...bankInfo
        };
        //send request to create supplier
        const promise = Supplier.create(supplier);
        promise.then((res) => {
            this.setState({created: true, supId: res.id});
            const supplierId = res.id;
            /*const categories = this.props.createSupplier.options_info.selectedCategories;
            const genders = this.props.createSupplier.options_info.selectedGenders;
            const ages = this.props.createSupplier.options_info.selectedAges;
            const results = [];
            if ((categories.length || ages.length || genders.length) && supplierId) {
                //after we get suppliers id we save categories, genders, ages with multy simultanious requests
                const promiseSaveCategories = Supplier.saveCategories(supplierId, categories);
                const promiseSaveGenders = Supplier.saveGenders(supplierId, genders);
                const promiseSaveAges = Supplier.saveAges(supplierId, ages);
                //collect succeeded results
                promiseSaveCategories.then((res) => {
                    results.push(res.length);
                }).catch((err) => {
                    console.log(err);
                });
                promiseSaveGenders.then((res) => {
                    results.push(res.length);
                }).catch((err) => {
                    console.log(err);
                });
                promiseSaveAges.then((res) => {
                    results.push(res.length);
                }).catch((err) => {
                    console.log(err);
                });
            }*/
            const incoterms = this.props.createSupplier.contact_info.incoterms;
            if (incoterms.length && supplierId) {
                const promiseSaveContacts = Supplier.saveContacts(supplierId, incoterms), results = [];
                promiseSaveContacts.then((res) => {
                    results.push(res.length);
                })
            }
            //inform user of success
            history.push(`/suppliers/view/${supplierId}`)
            this.props.dispatch({ type: 'SUPPLIER_WERE_CREATED' })
        }).catch((err) => {
            console.log(err);
            if ('response' in err) {
                const errMessage = err.response.request.response;
                if (errMessage) this.setState({errors: JSON.parse(errMessage)});
            }
        });
    };

    next = () => {
        if (this.props.createSupplier.step === 0) {
            this.state.generalInfoSchema.validate(this.props.createSupplier.general_info, {abortEarly: false})
                .then(valid => this.props.dispatch(generalFormSubmit({}), this.setState({ errors: [] })))
                .catch(err => {
                    this.setState({errors: err.errors})
                });
        }
        if (this.props.createSupplier.step === 1) {
            this.state.contactsInfoSchema.validate(this.props.createSupplier.contact_info, {abortEarly: false})
                .then(valid => this.props.dispatch(contactFormSubmit({}), this.setState({ errors: [] })))
                .catch(err => {
                    this.setState({errors: err.errors})
                });
        }
        if (this.props.createSupplier.step === 2) {
            this.state.optionsInfoSchema.validate(this.props.createSupplier.options_info, {abortEarly: false, recursive: true})
                .then(valid => this.props.dispatch(optionsFormSubmit({}), this.setState({ errors: [] })))
                .catch(err => {
                    this.setState({errors: err.errors})
                });
        }
    };

    render() {
        const promiseTerms = Supplier.getPaymentTerms();
        const step = this.props.createSupplier.step;

        return (
            <>
                <Prompt
                    when={this.state.modified && !this.state.created}
                    message={location => `Are you sure you want to skip changes?`}
                />
                <Steps currentStep={this.props.createSupplier.step} next={step < 3 ? this.next : null}/>
                {step === 0 ? <GeneralForm info={this.props.createSupplier.general_info} promiseTerms={promiseTerms}
                                           saveStepInfo={this.saveStepInfo}/> : null}
                {step === 1 ?
                    <ContactForm info={this.props.createSupplier.contact_info} saveStepInfo={this.saveStepInfo}
                                 stepBack={this.stepBack}/> : null}
                {step === 2 ?
                    <OptionsForm options_info={this.props.createSupplier.options_info} saveStepInfo={this.saveStepInfo}
                                 stepBack={this.stepBack}/> : null}
                {step === 3 ? <BankForm info={this.props.createSupplier.bank_info} createSupplier={this.createSupplier}
                                        saveStepInfo={this.saveStepInfo} stepBack={this.stepBack}/> : null}
                {this.state.errors.length > 0 && <div className='create__errors'>
                    {Object.keys(this.state.errors).map((error) =>
                        <span>{`${error === 'name' ? 'Company name' : error} - ${this.state.errors[error]}`}</span>)}
                </div>}
                {this.state.created ? <div className="create__answer">Supplier has been created<br/> <NavLink
                    to={`/suppliers/view/${this.state.supId}`}>Go to supplier's card</NavLink></div> : ''}
            </>
        );
    }
}

const mapStateToProps = ({createSupplier, dispatch}) => ({
    createSupplier,
    dispatch
});

export default connect(mapStateToProps)(CreateSupplierPage);
