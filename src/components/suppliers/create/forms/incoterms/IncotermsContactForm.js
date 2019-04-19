import React, {Component} from 'react';

import {Form, Icon} from 'semantic-ui-react';
import Incoterm from './Incoterm.js';

import styles from '../../../../../css/suppliers/create/forms/additionalContact.module.css';
import contactStyles from '../../../../../css/suppliers/create/forms/contactForm.module.css';

class AdditionalContactForm extends Component{
  state = {
    fields: ['PURPOSE', 'PERSON', 'EMAIL', 'TELE1', 'TELE2'],
    incoterms: ''
  };

  addIncoterm = () => {
    this.setState((prev) => {
      let incoterms = prev.incoterms;
      incoterms.push({ purpose: '', person: '', email: '', tele1: '', tele2: '' });
      return { incoterms };
    })
  }

  saveIncotermData = (name, value, index) => {
    this.setState((prev) => {
      let incToChange = prev.incoterms[index], prevIncoterms = prev.incoterms;
      incToChange[name] = value;
      prevIncoterms[index] = incToChange;
      return { incoterms: prevIncoterms };
    })
  }
  
  removeIncoterm = (index) => {
    this.setState((prev) => {
      let incoterms = prev.incoterms;
      incoterms.splice(index, 1);
      if(!incoterms.length) incoterms.push({ purpose: '', person: '', email: '', tele1: '', tele2: '' });
      return { incoterms };
    });
  }

  componentDidMount(){
    this.setState({ incoterms: this.props.prevIncoterms || [{ purpose: '', person: '', email: '', tele1: '', tele2: '' }] });
  }

  render(){
    return(
      <div className="table-add-wrap">
        <div className="table-add">
          <div className="table-add__row table-add__head">
            {this.state.fields.map((field, index) => <div className="table-add__th" key={index}>{field}</div>)}
            <div className="table-add__th td-remove"></div>
          </div>
          
          {this.state.incoterms ? this.state.incoterms.map((incoterm, index) => 
          <div className="table-add__row">
            <Incoterm inputNames={incoterm} index={index} saveIncotermData={this.saveIncotermData} removeIncoterm={this.removeIncoterm} />
          </div>) : <h1>Loading incoterms...</h1>
        }
          
        </div>
        <div className="port-add">
          <span style={{cursor: "pointer"}} onClick={this.addIncoterm}>
            <i className="icon-add-button"></i>
            <span className="port-add__text">Add another Incoterm plus port</span>
          </span>
        </div>
      </div>

      /*<div className={styles.container}>
        <Form className={styles['additional-form']}>
          <div className={styles['additional-contacts-container']}>
            {this.state.fields.map((field, index) => <div className={styles['option-additional-contacts']} key={index}>{field}</div>)}
          </div>
          {this.state.incoterms ? this.state.incoterms.map((incoterm, index) => <Incoterm inputNames={incoterm} index={index} saveIncotermData={this.saveIncotermData} removeIncoterm={this.removeIncoterm} />) : <h1>Loading incoterms...</h1>}
        </Form>
        <div className={contactStyles['add-incoterm']}>
          <span><Icon onClick={this.addIncoterm} name='plus' size='small' className={styles['add-incoterm']} /> Add another incoterm plus port</span>
        </div>
    </div>*/
    );
  }
} 
export default AdditionalContactForm;