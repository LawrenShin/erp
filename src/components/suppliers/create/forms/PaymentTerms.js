import React,{Component} from 'react';

import { Dropdown } from 'semantic-ui-react';

const PaymentTerms = (props) => {
  return(
    <Dropdown {...props} placeholder={props.options[0].text} onChange={props.localSave || props.onChange || (() => {})} search selection />
  );
}

export default PaymentTerms;