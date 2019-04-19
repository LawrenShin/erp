import React,{Component} from 'react';

import Options from '../../../controls/options-multi';
import DeliveryTerms from './DeliveryTerms.js';
import StepControls from '../../../StepControls.js';
import Supplier from '../../../../requestor/supplier';

import styles from '../../../../css/suppliers/create/forms/forms.module.css';
import OptionsFormStyles from '../../../../css/suppliers/create/forms/optionsForm.module.css';

class OptionsForm extends Component{
  state = { 
    Categories: '',
    Genders: '',
    Ages: '',
    info: {},
    selectedCategories: this.props.options_info.selectedCategories || [],
    selectedGenders: this.props.options_info.selectedGenders || [],
    selectedAges: this.props.options_info.selectedAges || []
  };

  localSave = ({name, value, checked}) => {
    switch(name){
      case 'selectedCategories':
      case 'selectedGenders':
      case 'selectedAges':
        let arr = this.state[name];
        const i = arr.indexOf(value);
        if(i < 0){
          arr.push(value);
        }else{
          arr.splice(i, 1);
        }
        this.setState({ [name]: arr }, () => this.proceed(0));
      break;
      default:
        this.setState((prev) => {
          let state = prev;
          state.info[name] = value || checked;
          return state;
        }, () => this.proceed(0));
      break;
    }
  }
  proceed = (step = 1) => {
    const state = this.state;
    let info = {};
    if(state.selectedCategories.length) info.selectedCategories = state.selectedCategories;
    if(state.selectedGenders.length) info.selectedGenders = state.selectedGenders;
    if(state.selectedAges.length) info.selectedAges = state.selectedAges;

    this.props.saveStepInfo({ ...info }, 'options', step);
  }

  componentDidMount(){
    const promiseAllOptions = Supplier.getAllOptions();
    promiseAllOptions.then((res) => {
      this.setState({
        Ages: res[0].results.map(({id, name}) => ({value: id, name})),
        Genders: res[1].results.map(({id, name}) => ({value: id, name})),
        Categories: res[2].results.map(({id, name}) => ({value: id, name}))
      });
    }).catch((err) => {
      console.log(err);
    })
  }
  
  render(){
    const state = this.state;
    if(state.Categories || state.Ages || state.Genders){
      return(
        <div className="bg-box box-supplier">
					<form>
						<div className="options">
							<div className="options__col">
                <Options 
                  label='Categories' 
                  name='Categories' 
                  list={this.state.Categories} 
                  onChange={this.localSave} />
               </div>
            
							<div className="options__col">
                <Options 
                  name='Genders' 
                  label='Genders' 
                  list={this.state.Genders} 
                  onChange={this.localSave} />

                <Options 
                  multi
                  name='Ages' 
                  label='Ages' 
                  list={this.state.Ages} 
                  onChange={this.localSave} />
              </div>
            </div>
            <DeliveryTerms localSave={this.localSave} />
          </form>
        </div>
      );
    }else{
      return(
        null
        );
    }
  }
}

export default OptionsForm;