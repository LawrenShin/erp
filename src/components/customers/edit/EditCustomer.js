import React, {Component} from 'react';
import {connect} from 'react-redux';
import {history} from '../../../routes/AppRouter.js';

import Dropdown from '../../controls/dropdown';
import Input from '../../controls/input';
import Checkbox from '../../controls/checkbox';
import MinMax from '../../controls/min-max';
import TextArea from '../../controls/text-area';

import {singleCustomerSelector} from '../../../selectors/customers';
import Loading from '../../helpers/loading';
import {createRequestAction} from '../../../actions';

class EditCustomer extends Component{
  state = { info: {}, dicts: false, customersFilters: false, errors: false };

  filterNameTransformer = (filterName, type) => {
    if(filterName){
      if(type === 'fromBack') return filterName.replace(filterName[0], filterName[0].toUpperCase()).replace(/_/g, ' ');
      if(type === 'toBack') return filterName.replace(filterName[0], filterName[0].toLowerCase()).replace(/ /g, '_');
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

  handleChangeDropdown = ({data:{value}, name}) => this.localSave({name, value});

  componentDidMount(){

    this.props.getCustomer(this.props.match.params.id);
    this.props.getDicts();
    this.props.getFilters();
  }

  handleSave = (text) => {
  
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
        <Input label={'Lead time days (8 weeks)'} name={'lead_time_days'} key={'lead_time_days'} onChange={this.localSave} error={errors['lead_time_days']} value={state['lead_time_days']} />,  
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

  componentDidUpdate(){
    if(this.props.customer.state === 'loaded' && !Object.keys(this.state.info).length)
      this.setState({ info: {...this.props.customer.data} });
    if(this.props.dicts.state === 'loaded' && !this.state.dicts)
      this.setState({ dicts: {...this.props.dicts.data} });
    if(this.props.customersFilters.state === 'loaded' && !this.state.customersFilters)
      this.setState({ customersFilters: {...this.props.customersFilters.data} });
  }

  render(){
    const state = this.state.info, errors = this.state.errors;

    if(Object.keys(this.state.info).length && this.state.dicts && this.state.customersFilters){
    return (
      <>
        <div className="page-heading page-heading_full">	
          <div className="page-heading__title">
            <div className="page-heading__top">
              <div className="page-heading__edit">
                <Input simple rows='1' className='page-heading__inputhead' onChange={this.localSave} label='' name='name' value={state.name} />
                <a className="page-heading__icon page-heading__icon_circle"><i className="icon-edit"></i></a>
              </div>
            </div>
            <div className="page-subtitle_strong">1234GG1234</div>
          </div>
        </div>
        <div className="bg-box box-supplier-form">
          <form>
            <div className="coment-area description-area">
              <TextArea simple label="Description" rows='5' onChange={this.localSave} name='description' value={state.description} />
            </div>
            <div className="box-supplier-form__item">

              <h2 className="decor-heading">
                <i className="icon-general-info"></i>GENERAL INFORMATION
              </h2>

              <div className="general-form general-form_create general-form_create_columns">
                <div className="form-box">
                  <Dropdown uiType="form-box" name='parent' label='Parent' options={this.state.customersFilters.parent} onChange={this.handleChangeDropdown} value={state.parent} />
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
                    <Dropdown uiType="form-box" name='region' label='Region' options={this.state.dicts.region} onChange={this.handleChangeDropdown} value={state.region} />
                    <Input name='access_group_contractor' label='Access group contractor' onChange={this.localSave} />
                    <Input name='manufacturer' label='Manufacturer' onChange={this.localSave} />
                    <Dropdown uiType="form-box" name='port' label='Port' options={this.state.dicts.port} onChange={this.handleChangeDropdown} value={state.port} />
                  </div>
              </div>

              <h2 className="decor-heading">
                <i className="icon-options"></i>OPTIONS
              </h2>

              <div className="general-form general-form_create_options">
                <div className="form-box">
                  <Input name='commission_remuneration' label='Commission remuneration' onChange={this.localSave} />
                  <Input name='calc_method_commission_remuneration' label='Calc method commission remuneration' onChange={this.localSave} />
                  <Input name='allowable_amount_debt' label='Allowable amount debt' onChange={this.localSave} />
                  <Input name='type_settlements' label='Type settlements' onChange={this.localSave} />
                  <Dropdown uiType="form-box" name='type_delivery' label='Type delivery' options={this.state.dicts.type_delivery} onChange={this.handleChangeDropdown} value={state.type_delivery} />
                  <Dropdown uiType="form-box" name='type_entity' label='Type entity' options={this.state.dicts.type_entity} onChange={this.handleChangeDropdown} value={state.type_entity} />
                  <Dropdown uiType="form-box" name='type_item_price' label='Type item price' options={this.state.dicts.type_item_price} onChange={this.handleChangeDropdown} value={state.type_item_price} />
									<div className="form-box__item">
                    <Checkbox label='Is sign control amount debt' name='is_sign_control_amount_debt' onChange={this.localSave} checked={state.is_sign_control_amount_debt} />
                  </div>
                </div>
                <div className="form-box-aside">
                  <div className="coment-area description-area">
                    <TextArea simple label="Comment" rows='5' onChange={this.localSave} name='comment' value={state.comment} />
                  </div>
                </div>
              </div>
            </div>

            <div className="options-buttons">
              <button type="button" className="btn btn2 btn-save" onClick={() => this.handleSave('save')}>Save</button>
            </div>

          </form>  
        </div>
      </>
    );
    }else{
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => ({
  customer: singleCustomerSelector(state),
  dicts: state.customer.dicts,
  customersFilters: state.customer.customersFilters
});

export default connect(mapStateToProps,
  (dispatch) => ({
    getCustomer:  (id) => dispatch(createRequestAction('customer', 'getById', [id])),
    getDicts: () => dispatch(createRequestAction('customer', 'getDropdowns')),
    getFilters: () => dispatch(createRequestAction('customer', 'getFilters'))
  }))(EditCustomer);