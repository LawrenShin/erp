import React, {PureComponent} from 'react';
import * as yup from 'yup'

import Input from '../../../controls/input';
import Checkbox from '../../../controls/checkbox';

import PopupCallback from '../../../common/PopupCallback'

class BankForm extends PureComponent {
    state = {
        info: {},
        bankInfoSchema: yup.object().shape({
            swift: yup.string().max(11).required(),
            iban: yup.string().required(),
            beneficiary_account_number: yup.string().required(),
            beneficiary_bank: yup.string().required(),
            beneficiary_name: yup.string().required(),
            bank_address: yup.string().required(),
        }),
        errors: [],
    };

    localSave = ({name, value, checked}) => {
        this.setState((prev) => {
            let state = prev;
            state.info[name] = value || checked;
            return state;
        }, () => this.proceed())
    }

    proceed = () => this.props.saveStepInfo(this.state.info, 'bank', 0);
    
    handleSave = () => {
        this.state.bankInfoSchema.validate(this.state.info, {abortEarly: false})
            .then(valid => this.props.createSupplier(this.state.info), this.setState({ errors: [] }))
            .catch(err => {
                this.setState({errors: err.errors})
                return
            });
    }

    componentDidMount() {
        if (this.props.info && Object.keys(this.props.info).length) {
            this.setState({info: this.props.info});
        }
    }

    render() {
        return (
            <div className="bg-box box-supplier">
                <form>
                    <div className="form-box form-box-bank">
                        <div className="form-box__item">
                            <Input required='required' onChange={this.localSave} name='beneficiary_name' label="Beneficiary name" simple/>
                            <Checkbox name='beneficiary_name_same_as_supplier' label='Same as Supplier'
                                      onChange={this.localSave}/>
                        </div>
                        <Input required='required' onChange={this.localSave} name='beneficiary_bank' label="Beneficiary bank"/>
                        <Input required='required' onChange={this.localSave} name='beneficiary_account_number'
                               label="Beneficiary account number"/>
                        <Input required='required' onChange={this.localSave} name='bank_address' label="Bank Address"/>
                        <Input required='required' onChange={this.localSave} name='swift' label="SWIFT"/>
                        <Input required='required' onChange={this.localSave} name='iban' label="IBAN"/>
                    </div>
                    <input type="button" className="btn" value="Save" onClick={this.handleSave}></input>
                </form>
                {this.state.errors.map(e => <span color='red'>{e}</span>)}
            </div>
        );
    }
}

export default (BankForm);