import React, {PureComponent} from 'react';

import moment from 'moment';
import PaymentTerms from './PaymentTerms.js';
import SingleDatePickerComponent from '../../../common/SingleDatePickerComponent';
import StepControls from '../../../StepControls.js';
import Input from '../../../controls/input';
import Checkbox from '../../../controls/checkbox';
import Options from '../../../controls/options';
import MinMaxInput from '../../../controls/min-max';
import TextArea from '../../../controls/text-area';
import CheckboxComponent from "../../../CheckboxComponent";
import Pointer from "../../../controls/pointer";

class GeneralForm extends PureComponent{
  state = { info: {},
    options: {
      status: [ {name: 'Stop', value: 'IN'}, {name: 'Active', value: 'AC'}, {name: 'Test', value: 'TS'} ],
      type: [ {name: 'Agent', value: 'AG'}, {name: 'Factory', value: 'FC'} ]
    },
    checkboxes: ['Respond in time', 'Offers cost breakdown', 'Responsiveness in working with orders', 'Gives discount for reject sand product delay', 'Doesn\'t bother with work spam'],
    terms: []
  };
  // renders
  renderCheckboxes = (box) => {
    const name = box.replace(/ /g, '_').replace(/'/g, '').replace(box[0], box[0].toLowerCase());

    return(
      <div className="general-list__item" key={box}>
        <Checkbox
          simple={true}
          checked={true}
          className="box-field-checkbox"
          onChange={this.localSave}
          label={box}
          name={name}/>
      </div>
    )
  };
  //actions
  localSave = ({ target }) => {
    const {name, value, checked} = target;
    this.setState((prev) => {
      let state = prev;
      state.info[name] = value || checked;
      return state;
    }, () => this.proceed(0))
  };
  
  saveDate = (date) => {
    this.setState((prev) => {
      let state = prev;
      state.info['payment_terms_date'] = date;
      return state;
    }, () => this.proceed(0))
  };

  proceed = (step = 1) => {
    this.props.saveStepInfo(this.state.info, 'general', step)
  };

  componentDidMount() {
    //payment terms data fetching
    let termsOptions = [];
    this.props.promiseTerms.then((res) => {
      const terms = (res.data.results);
      terms.map((term) => {
        let option = { key: term.name, value: term.id, text: term.name };
        termsOptions.push(option);
      });
      //preset existing data
      const date = new Date()
      this.setState({ info: { payment_terms_date: moment(date).format('DD/MM/YYYY') }})
      if(this.props.info && Object.keys(this.props.info).length) {
        this.setState({ terms: termsOptions, info: this.props.info });
      }else{
        this.setState({ terms: termsOptions });
      }
    });
  }

  render(){
    //data fetching for datepicker
    const state = this.state, props = this.props;
    let date = undefined;
    if('payment_terms_date' in state.info){
      date = moment(state.info.payment_terms_date, "DD, MM YYYY");
      if('payment_terms_date' in props.info) date = moment(props.info.payment_terms_date, "DD, MM, YYYY");
    };

    return(
      <div className="bg-box box-supplier">        
        <form onSubmit={() => this.proceed()}>
          <div className="general-form general-form_supplier">
            <div className="form-box">
              <Input required='required' onChange={this.localSave} label="Company name" name='name' value={'name' in state.info ? state.info.name : ''} />
              <Input onChange={this.localSave} label="Supplier code" name='supplier_code_1c' value={'supplier_code_1c' in state.info ? state.info.supplier_code_1c : ''} />
              <Input required='required' onChange={this.localSave} label="Agreement number" name='agreement_number' value={'agreement_number' in state.info ? state.info.agreement_number : ''} />
              <Options 
                required='required' 
                name="status" 
                label="Status" 
                list={this.state.options.status} 
                onChange={this.localSave} 
                selectedOptions={props.info.status} />
              <Options 
                required='required' 
                name='type' 
                label="Type" 
                list={this.state.options.type} 
                onChange={this.localSave} 
                selectedOptions={props.info.type} />
              <Input required='required' onChange={this.localSave} label="Purchaser" name='purchaser' value={'purchaser' in state.info ? state.info.purchaser : ''} />
              <Input required='required' onChange={this.localSave} label="Consignee" name='consignee' value={'consignee' in state.info ? state.info.consignee : ''} />
              <div className="form-box__item">
                <label className="box-field__label">Payment terms</label>
                <div className="term-select">
                  <div className="select-elem">
                  { this.state.terms.length ? <PaymentTerms localSave={this.localSave} options={this.state.terms} name='payment_terms' />
                  : 'loading terms'}
                  </div>
                  {/* <div className="item-add">
                    <a href="#">
                      <i className="icon-plus"></i>
                    </a>
                  </div>
                  <div className="item-remove">
                    <a href="#">
                      <i className="icon-trash"></i>
                    </a>
                  </div> */}
                </div>                
              </div>

              <SingleDatePickerComponent required='required' date={ date } saveDate ={this.saveDate} />
              
              <Input onChange={this.localSave} label="Manufacturer" name='manufacturer' value={'manufacturer' in state.info ? state.info.manufacturer : ''} />
              <Input required='required' onChange={this.localSave} label="Importer" name='importer' value={'importer' in state.info ? state.info.importer : ''} />
              <Input type='number' label="Factory capacity"  onChange={this.localSave} name='factory' value={'factory' in state.info ? state.info.factory : ''} />
              <Input onChange={this.localSave} label="NLG" name='nlg' value={'nlg' in state.info ? state.info.nlg : ''}  type='number' />
              <MinMaxInput 
                required='required' 
                onChange={this.localSave} 
                label="MOQ" 
                minName='moq_min' 
                maxName='moq_max' 
                min={'moq_min' in state.info ? state.info.moq_min : ''} 
                max={'moq_max' in state.info ? state.info.moq_max : ''} />
              <TextArea label="Comment" rows='10' name='comment' onChange={this.localSave} value={'comment' in state.info ? state.info.comment : ''} />
            </div>
            <div className="general-form__aside">
              <div className="general-list general-list_column">
                  {this.state.checkboxes.map((box) => this.renderCheckboxes(box))}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default GeneralForm;