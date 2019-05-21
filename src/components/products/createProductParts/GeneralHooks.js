import React, { useState } from 'react';
import { connect } from 'react-redux';

import Input from '../../controls/input';
import ConnectedDropdown from '../../controls/ConnectedDropdown';
import Checkbox from '../../controls/checkbox';
import { createAction } from '../../../actions';
import { generalStore } from '../../../ducks/createProduct'

const GeneralHooks = (props) => {
  const [trade_mark, setName] = useState( props.store.trade_mark || '' );
  const [target_price, setTargetPrice] = useState( props.store.target_price || 0 );
  const [collection, setCollection] = useState( props.store.collection || '' );
  const [buying_manager, setBuyingManager] = useState( props.store.buying_manager || '' );
  const [MOQ_range, setMOQ_range] = useState(props.store.MOQ || { from: '', to: '' });

  return (
    <div className="product__item">
      <div className="product__heading">
          <i className="product__icon icon-customers"></i>
          <div className="product__title">general</div>
      </div>
      <div className="product-details">
        <div className="product-columns">
          <div className="product-columns__item">
            <div className="box-field">
              <Input 
                simple={true} 
                onChange={(e) => setName(e.target.value)}
                onBlur={() => props.saveToStore({ name: 'trade_mark', data: trade_mark })}
                name='trade_mark'
                value={trade_mark}
                label="Trade mark" />
            </div>
          </div>
          {props.generalMap && <ConnectedDropdown 
            name='season'
            options={props.generalMap.get('season').map((s, i) => ({ name: s.value, id: i+1 }))}
            saveToStore={props.saveToStore}
            valueFromStore={props.store.season}
          />}
          <div className="product-columns__item">
            <div className="select-elem">
            <Input 
                simple={true} 
                onChange={(e) => setTargetPrice(e.target.value)}
                onBlur={() => props.saveToStore({ name: 'target_price', data: target_price })}
                name='target_price'
                value={target_price}
                label="Target price" />
            </div>
          </div>
          <div className="product-columns__item">
            <div className="select-elem">
              <label className="box-field__label">Year:</label>
              <div className="ui fluid selection dropdown">
                <input type="hidden" />
                <div className="default text">2019</div>
                <i className="dropdown icon"></i>
                <div className="menu">
                  <div className="item" data-value="af">2019</div>
                  <div className="item active" data-value="ax">offline</div>
                </div>
              </div>
            </div>
          </div>
          <div className="product-columns__item">
            <div className="select-elem">
              <label className="box-field__label">Collection:</label>
              {/* <div className="ui fluid selection dropdown">
                <input type="hidden" />
                <div className="default text">Весна-Лето 2019</div>
                <i className="dropdown icon"></i>
                <div className="menu">
                  <div className="item" data-value="af">Весна-Лето 2019</div>
                  <div className="item active" data-value="ax">offline</div>
                </div>
              </div> */}
              <Input
                className='width-90' 
                simple={true} 
                name='collection'
                type='text'
                onChange={(e) => setCollection(e.target.value)}
                onBlur={() => props.saveToStore({ name: 'collection', data: collection })}
                value={collection} />
            </div>
          </div>
          <div className="product-columns__item">									
            <div className="box-field">
              <label className="box-field__label">MOQ: </label>
              <div className="box-field_two">
                <span className="box-field__smalllabel">From</span>
                <Input
                  className='width-90' 
                  simple={true} 
                  name='MOQ_from'
                  type='number'
                  onChange={(e) => setMOQ_range({ ...MOQ_range, from: e.target.value })}
                  onBlur={() => props.saveToStore({ name: 'moq', data: MOQ_range })}
                  value={MOQ_range.from} />
                <span className="box-field__smalllabel">to</span>
                <Input
                  className='width-90' 
                  simple={true}
                  type='number' 
                  name='MOQ_to' 
                  onChange={(e) => setMOQ_range({ ...MOQ_range, to: e.target.value })}
                  onBlur={() => props.saveToStore({ name: 'moq', data: MOQ_range })}
                  value={MOQ_range.to} />
              </div>
            </div>
          </div>
          <div className="product-columns__item">
            <div className="box-field">
              <label className="box-field__label">Code 1C</label>
              <div className="box-field__results">00000004060</div>
            </div>
          </div>
          <div className="product-columns__item">
            <div className="box-field">
              <label className="box-field__label">Vendor code:</label>
              <div className="box-field__results">00000004060</div>
            </div>
          </div>
          <div className="product-columns__item">
            <div className="select-elem">
              <label className="box-field__label">Buying manager:</label> 
              {/* <div className="ui fluid selection dropdown">
                <input type="hidden" />
                <div className="default text">Nick Sipson</div>
                <i className="dropdown icon"></i>
                <div className="menu">
                  <div className="item" data-value="af">Nick Sipson</div>
                  <div className="item active" data-value="ax">offline</div>
                </div>
              </div> */}
              <Input
                className='width-90' 
                simple={true} 
                name='buying_manager'
                type='text'
                onChange={(e) => setBuyingManager(e.target.value)}
                onBlur={() => props.saveToStore({ name: 'buying_manager', data: buying_manager })}
                value={buying_manager} />
            </div>
          </div>
          <div className="product-columns__item">																		
            <div className="checkbox-elem checkbox-elem_1">
              <input type="checkbox" id="checkbox-1" />
              <label className="checkbox-label" htmlFor="checkbox-1">Package</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  store: generalStore(state)
}), (dispatch) => ({
  saveToStore: (payload) => dispatch(createAction('GENERAL', payload))
}))(GeneralHooks);