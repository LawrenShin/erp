import React,{Component} from 'react';

import {Dropdown} from 'semantic-ui-react';

import styles from '../../../../../css/suppliers/create/forms/forms.module.css';
import contactStyles from '../../../../../css/suppliers/create/forms/contactForm.module.css';

class DropdownComponent extends Component{
  transformName = (name) => name.replace(/ /g, '_').replace(name[0], name[0].toLowerCase());

  handleChange = (e, {name, value}) => {
    name = this.transformName(name);
    this.props.localSave(e, {name, value});
  }

  render(){
    return (
      <div className={styles.input}>
        <span>{`${this.props.field} ${this.props.factory ? this.props.factory : ''}`} :</span>
        <Dropdown 
          onChange={this.handleChange} 
          className={contactStyles.field} 
          name={this.props.field} 
          search selection 
          options={this.props.options} />
      </div>
    );
  }
}

export default DropdownComponent;