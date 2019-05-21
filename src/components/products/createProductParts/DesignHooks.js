import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { createAction } from '../../../actions';
import ConnectedDropdown from '../../controls/ConnectedDropdown';
import { designStore } from '../../../ducks/createProduct';

const DesignHooks = (props) => {
    
  const renderDropdowns = (map) => {
    let drops = []
    for(let [name, options] of map){
      drops.push(
        <ConnectedDropdown 
          key={uuid()}
          name={name}
          options={options}
          saveToStore={props.saveToStore}
          valueFromStore={props.designStore[name]}
        />
      )
    }
    return drops.map(d => d)
  }

  return (
    <div className="product__item">
      <div className="product__heading">
        <i className="product__icon icon-design"></i>
        <div className="product__title">design</div>
      </div>
      <div className="product-details">
        <div className="product-columns">
            <div className="product-columns__item">
              <div className="box-field">
                <label className="box-field__label">Upload sketch</label>
                <label className="load-file">
                  <span className="box-field__input load-file__input"></span>
                  <i className="load-file__icon load-file__icon_1 icon-upload"></i>
                  <input type="file" className="load-file__file" />
                </label>
              </div>
            </div>
            { renderDropdowns(props.designMap.entries()) }
          </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  designStore: designStore(state)
}), dispatch => ({
  saveToStore: (payload) => dispatch(createAction('DESIGN', payload))
}))(DesignHooks)