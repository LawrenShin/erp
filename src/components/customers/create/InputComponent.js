import React,{Component} from 'react';

import {Input} from 'semantic-ui-react';

import styles from '../../../css/customers/create/form.module.css';

const InputComponent = (props) => {
  return(
    <div className={[styles.input, styles['noName-inputs'], props.errorTitle ? styles['error-color'] : null].join(' ')}>
      <label htmlFor={props.name}>{props.title} :{props.errorTitle ? props.errorTitle : null}</label>
      <Input onChange={props.localSave} name={props.name} defaultValue={props.savedInfo ? props.savedInfo : ''} className={props.errorTitle ? styles['error-border'] : null} />
    </div>
  )
}

export default InputComponent;