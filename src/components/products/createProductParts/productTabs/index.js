import React, { useState } from 'react';
import uuid from 'uuid'

import ConnectedDropdown from '../../../controls/ConnectedDropdown';

const ProductTabsHooks = (props) => {
    const [tab, setTab] = useState('shell_fabric')

    const tabs = ['shell_fabric', 'padding', 'lining', 'decor_fabric', 'trims']
    const renderTabs = () => tabs.map(t => {
        return (
        <span 
            key={uuid()}
            className={`nav-tab__link ${tab === t ? 'active' : ''}`} 
            onClick={() => setTab(t)}>
            {t}
        </span>
        )
    })

    const renderDropdowns = (map, index) => {
        let drops = []
        for(let [name, options] of map){
          drops.push(
            <ConnectedDropdown 
              key={uuid()}
              name={`${name}_${index}`}
              options={options}
              saveToStore={props.saveToStore}
              valueFromStore={props.shell_fabric_tab[`${name}_${index}`]}
            />
          )
        }
        return drops.map(d => d)
      }
  
  return(
    <div className="tabs-product">
      <div className="nav-tab">
          {renderTabs()}
      </div>
      <div className="tabs-product__wrap">
          <div className="product-details__box">
              {renderDropdowns(props.fabricMap, 1)}
              {renderDropdowns(props.fabricMap, 2)}
              {renderDropdowns(props.fabricMap, 3)}
          </div>
        </div>
    </div>
  )
}
export default ProductTabsHooks;