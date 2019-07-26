import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const PaymentTerms = (props) => {
  return(
    <Dropdown 
      options={props.options}
      defaultValue={props.defaultValue}
      disabled={props.readOnly} 
      placeholder={props.options[0].text} 
      onChange={props.localSave || props.onChange || (() => {})} 
      search 
      selection />
  );
}

export default PaymentTerms;