import React, { useState } from 'react';
import svg from '../../css/svg.module.css'

const irrigateHeader = (name) => `${name[0].toUpperCase()}${name.substr(1).replace("_", " ")}`;

const menuField = (opt, state, valueFromStore) => {
  const isActive = (state.option === opt.id || valueFromStore === opt.id) ? 'active' : '';
  return <div 
    key={opt.id}
    className={`item ${isActive}`} 
    data-option={opt.id}
    onClick={(e) => state.save(+e.target.getAttribute('data-option'))}>
      {opt.name}
  </div>
}

const ConnectedDropdown = ({ name, options, saveToStore, valueFromStore }) => {
  const [option, setOption] = useState(0)
  const [visibleMenu, setVisibleMenu] = useState(false)

  const selectedOption = options.filter(o => (o.id === option || o.id === valueFromStore) )[0]

  const save = (d) => {
    saveToStore({ name, data: d })
    setOption(d)
  }

  return(
    <div className="product-columns__item">
      <div className={`select-elem ${visibleMenu ? '-is-unfolded' : ''}`}>
        <label className="box-field__label">{irrigateHeader(name)}:</label>
        <div className="ui fluid selection dropdown" onClick={() => setVisibleMenu(!visibleMenu)}>
          {selectedOption && selectedOption.name}
          <input 
            type="text" 
            className="select-elem__toggler" 
            disabled
          />
          <div 
            className='menu'
            style={{ display: visibleMenu ? 'block' : 'none' , zIndex: 9000}}
            >
            <div 
              key='not selected'
              className={`item ${(option === 0 && !valueFromStore) ? 'active' : ''}`}
              onClick={(e) => save(0)}>
                Not selected
            </div>
            {options.map(opt => menuField(opt, {option, save}, valueFromStore))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectedDropdown