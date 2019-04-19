import React, {Component} from 'react';

import Input from '../../../controls/input';
import Checkbox from '../../../controls/checkbox';

class BankForm extends Component{
  state = { info: {} };

  localSave = ({name, value, checked}) => {
    this.setState((prev) => {
      let state = prev;
      state.info[name] = value || checked;
      return state;
    }, () => this.proceed())
  }

  proceed = () => this.props.saveStepInfo(this.state.info, 'bank', 0);

  handleSave = () => {
    this.props.createSupplier(this.state.info);
  }

  componentDidMount(){
    if(this.props.info && Object.keys(this.props.info).length) {
      this.setState({ info: this.props.info });
    }
  }

  render(){
    return(
      <div className="bg-box box-supplier">
				<form>
          <div className="form-box form-box-bank">
            <div className="form-box__item">	
              <Input onChange={this.localSave} name='beneficiary_name' label="Beneficiary name" simple/>
              <Checkbox name='beneficiary_name_same_as_supplier' label='Same as Supplier' onChange={this.localSave} />
            </div>
            <Input onChange={this.localSave} name='beneficiary_bank' label="Beneficiary bank" />
            <Input onChange={this.localSave} name='beneficiary_account_number' label="Beneficiary account number" />
            <Input onChange={this.localSave} name='bank_address' label="Bank Address" />
            <Input onChange={this.localSave} name='swift' label="SWIFT" />
            <Input onChange={this.localSave} name='iban' label="IBAN" />
          </div>
          <input type="button" className="btn" value="Save" onClick={this.handleSave}></input>
        </form>
      </div>  
    );
  }
}

export default BankForm;