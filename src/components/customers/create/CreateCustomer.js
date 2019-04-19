import React,{Component} from 'react';
import Form from './Form.js';
import {NavLink} from 'react-router-dom';

class CreateCustomer extends Component{
  state = {  };

  render(){
    return(
      <>
        <div className="page-heading page-heading_supplier">	
          <div className="page-heading__title">
            <div className="page-heading__top">
              <h1 className="h1">Create customer</h1>
            </div>
          </div>
          <div className="page-heading__navs">								
            <div className="card-filters-nav">
              <NavLink className="card-filters-nav__item card-filters-nav__back" to="/customers/">
                <i className="icon-arrow-left"></i>
              </NavLink>
            </div>
          </div>
        </div>
        <Form />
      </>
    );
  }
}

export default CreateCustomer;