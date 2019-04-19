import React, {Component} from 'react';
import {connect} from 'react-redux';
import {history} from '../../../routes/history';

import Dropdown from '../../controls/dropdown';
import Input from '../../controls/input';
import Checkbox from '../../controls/checkbox';
import MinMax from '../../controls/min-max';
import TextArea from '../../controls/text-area';
import Loading from '../../helpers/loading';
import Customer from '../../../requestor/customer';
import {createRequestAction} from '../../../actions';
const AxiosError = require('axios-error');

class Form extends Component{
  constructor(props){
    super(props);
    this.state = { info: {}, dicts: false, customersFilters: false, errors: false };
  }

  filterNameTransformer = (filterName, type) => {
    if(filterName){
      if(type === 'fromBack') 
        return `${filterName[0].toUpperCase()}${filterName.substr(1)}`.replace(/_/g, ' ');
      if(type === 'toBack') 
        return `${filterName[0].toUpperCase()}${filterName.substr(1)}`.replace(/ /g, '_');
    }
  }

  defineMaxLength = (name) => {
    switch(name){
      case 'okpo':
        return 8;
      case 'code':
      case 'kpp':
        return 9;
      case 'inn':
        return 10;
      default: 
        return 255;
    }
  }

  localSave = ({name, value, checked, placeholder}) => {
    this.setState((prev) => {
      let state = prev;
      state.info[name || this.filterNameTransformer(placeholder, 'toBack')] = value || checked;
      return state;
    });
  }

  componentDidMount(){
    this.props.getDicts();
    this.props.getFilters();
  }

  handleSave = async (text) => {
    try{
      const res = await Customer.create(this.state.info);

      if(res.status === 201) 
        this.setState({ errors: false, info: {} });
      if(text === 'save'){
        this.setState({info: {}});
        history.push('/customers');
      }
      if(text === 'save_n_add'){
        this.setState({info: {}});
        history.push('/customers/create');
      }
      if(text === 'save_n_edit'){
        this.setState({info: {}});
        history.push(`/customers/edit/${res.data.id}`);
      }
    }
    catch(err) { 
      const error = new AxiosError(err);
      console.log(error);
      if('response' in error){
        const errMessage = error.response.request.response;
        if(errMessage) this.setState({ errors: JSON.parse(errMessage) });
      }
    };
  }
  
  renderGeneral = () => {
    const names = ['head_contractor', 'inn', 'kpp', 'okpo', 'main_bank_account'];
    const titles = ['Head contractor', 'INN', 'KPP', 'OKPO', 'Main bank account'];
    const state = this.state;
    const {errors} = this.state;

    return (
      names.map( (v, i) => {
          const title = titles[i];
          return <Input key={v} label={title} name={v} onChange={this.localSave} error={errors[v]} value={state.info[v]} maxLength={this.defineMaxLength(v)} />
        }
      ).concat([
        <Input type="file" label={'Main contract'} name={'main_contact'} key={'main_contact'} onChange={this.localSave} error={errors['main_contact']} value={state['main_contact']} />,
        <MinMax label='Work schedule' minLabel="From" maxLabel="till" key={'work_schedule'}  minName='work_schedule_from' maxName='work_schedule_to' onChange={this.localSave} min={state.work_schedule_from} max={state.work_schedule_to}/>,  
        <Input type='number' label={'Lead time days (8 weeks)'} name={'lead_time_days'} key={'lead_time_days'} onChange={this.localSave} error={errors['lead_time_days']} value={state['lead_time_days']} />,
        <Input type="file" label={'Identity document'} name={'identity_document'} key={'identity_document'} onChange={this.localSave} error={errors['identity_document']} value={state['identity_document']} />,
        <Input label={'Code supplier'} name={'code_supplier'} key={'code_supplier'} onChange={this.localSave} error={errors['code_supplier']} value={state['code_supplier']} />, 
        <Input label={'INN view'} name={'inn_view'} key={'inn_view'} onChange={this.localSave} error={errors['inn_view']} value={state['inn_view']} />, 
        <Input label={'Delay'} name={'delay'} key={'delay'} onChange={this.localSave} error={errors['delay']} value={state['delay']} /> 
    ]));
  }

  renderCheckboxes = () => {
    const names = ['is_non_resident', 'is_deleted', 'is_nds', 'is_tax', 'is_transport'];
    const titles = ['Is non resident', 'Is deleted', 'Is NDS', 'Is tax', 'Is transport'];

    return names.map( (v, i) => {
      const title = titles[i];
      return (
        <div key={v} className="general-list__item">
            <Checkbox label={title} name={v} onChange={this.localSave} checked={false} />
        </div>
      );
    });
  }


  render(){
    if(this.props.dicts.state === 'loaded' && !this.state.dicts)
      this.setState({ dicts: {...this.props.dicts.data} });
    if(this.props.customersFilters.state === 'loaded' && !this.state.customersFilters)
      this.setState({ customersFilters: {...this.props.customersFilters.data} });

    const state = this.state.info, errors = this.state.errors;
    if(this.state.dicts && this.state.customersFilters){
    return (
      <div className="bg-box box-supplier-form">
        <form>
          <div className="general-form general-form_create">
            <div className="form-box">
              <Input label='Name' name='name' onChange={this.localSave} error={errors.name} value={state.name} />
              <Input label='Code' name='code' onChange={this.localSave} error={errors.code} value={state.code} maxLength={this.defineMaxLength('code')} />
            </div>
          </div>
          <div className="coment-area description-area">									
            <TextArea simple label="Description" rows='5' onChange={this.localSave} name='description' value={state.description} />
          </div>
          <div className="box-supplier-form__item">

            <h2 className="decor-heading">
              <i className="icon-general-info"></i>GENERAL INFORMATION
            </h2>

            <div className="general-form general-form_create general-form_create_columns">
              <div className="form-box">
                <Dropdown uiType="form-box" name='parent' label='Parent' options={this.state.customersFilters.parent} onChange={this.localSave} value={state.parent} />
                {this.renderGeneral()}
              </div>

              <div className="general-form__aside">
                <div className="general-list general-list_column">
                  {this.renderCheckboxes()}
                </div>
              </div>
            </div>

            <h2 className="decor-heading">
              <i className="icon-contacts"></i>CONTACTS
            </h2>
            <div className="general-form general-form_create">							
								<div className="form-box">
                  <Dropdown uiType="form-box" name='region' label='Region' options={this.state.dicts.region} onChange={this.localSave} value={state.region} />
                  <Input name='access_group_contractor' label='Access group contractor' onChange={this.localSave} />
                  <Input name='manufacturer' label='Manufacturer' onChange={this.localSave} />
                  <Dropdown uiType="form-box" name='port' label='Port' options={this.state.dicts.port} onChange={this.localSave} value={state.port} />
                </div>
            </div>

            <h2 className="decor-heading">
							<i className="icon-options"></i>OPTIONS
						</h2>

						<div className="general-form general-form_create_options">
							<div className="form-box">
                <Dropdown uiType="form-box" name='type_delivery' label='Type delivery' options={this.state.dicts.type_delivery} onChange={this.localSave} value={state.type_delivery} />
                <Input name='access_group_contractor' label='Access group contractor' onChange={this.localSave} />
                <Dropdown uiType="form-box" name='type_entity' label='Type entity' options={this.state.dicts.type_entity} onChange={this.localSave} value={state.type_entity} />
                <Dropdown uiType="form-box" name='type_item_price' label='Type item price' options={this.state.dicts.type_item_price} onChange={this.localSave} value={state.type_item_price} />
              </div>
            </div>
          </div>

          <div className="options-buttons">
            <button type="button" className="btn" onClick={() => this.handleSave('save_n_add')}>Save and add another</button>
            <button type="button" className="btn" onClick={() => this.handleSave('save_n_edit')}>Save and continue editing</button>
            <button type="button" className="btn btn2 btn-save" onClick={() => this.handleSave('save')}>Save</button>
          </div>

        </form>  
      </div>  
    );
    }else{
      return <Loading/>;
    }
  }
}

const mapStateToProps = (state) => ({
  customer: {...state.createCustomer},
  dicts: state.customer.dicts,
  customersFilters: state.customer.customersFilters
});

export default connect(mapStateToProps,
  (dispatch) => ({
    getDicts: () => dispatch(createRequestAction('customer', 'getDropdowns')),
    getFilters: () => dispatch(createRequestAction('customer', 'getFilters'))
  }))(Form);