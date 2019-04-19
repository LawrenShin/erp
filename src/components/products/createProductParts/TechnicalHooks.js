import React, { useState } from 'react';
import { connect } from 'react-redux';

import { technicalStore } from '../../../ducks/createProduct';
import { createAction } from '../../../actions';
import { nameProperly } from '../../../ducks/createProduct/technical';
import Input from '../../controls/input';
import Checkbox from '../../controls/checkbox';
import ProductTabsHooks from './productTabs';
import ConnectedDropdown from '../../controls/ConnectedDropdown';

const TechnicalHooks = (props) => {
    // const [checkedBox, setCheckedBox] = useState([])

    // const localSave = ({checked, name}) => {
    //     const boxToCheck = {name, checked}
    //     if(!checked){
    //         setCheckedBox([...checkedBox.filter(c => c.name !== name)])
    //     }else{
    //        setCheckedBox([...checkedBox, boxToCheck]) 
    //     }
    // }

    const checkboxesList = ['Drip dry', 'Do not wash', 'Line dry', 'Machine wash cold', 'Professional drycleaning', 'Do not bleach', 'Do not iron deco', 'Do not dry-clean', 'Gentle wash up to 30c', 'Iron up to 200c', 'Flat dry', 'Do not iron', 'Cold iron', 'Iron steam', 'Do not tumble dry', 'Iron on reversed side', 'Hand wash', 'Color may fade with light chlorin...', 'Deco detail sh/be remove before ...', 'Iron steam on reverse side', 'Bleach when needed', 'Do not wring', 'Any bleach allowed', 'Machine wash warm']

    const renderCheckboxes = (checkboxesList) => checkboxesList.map((ch, i) => {
        ch = ch.replace(/\./g, '')
        const nameInStore = ch.replace(/[\s,\-,\/]/g, '_').toLowerCase(),
        valueFromStore = props.technicalStore.checkboxes[nameInStore]
        return (
            <div className="product-columns__item product-columns__item_checkboxes">							
                <div className="checkbox-elem">
                    <Checkbox 
                        label={ch} 
                        name={nameInStore} 
                        checked={valueFromStore}
                        onChange={props.saveToStoreCheckbox}
                    />
                </div>
            </div>
        )
    })

    const renderDropdowns = (map) => {
        let drops = []
        for(let [name, options] of map){
          drops.push(
            <ConnectedDropdown 
              name={name}
              options={options}
              saveToStore={props.saveToStore}
              valueFromStore={props.technicalStore[name]}
            />
          )
        }
        return drops.map(d => d)
    }

    return (
        <div className="product__item">
            <div className="product__heading">
                <i className="product__icon icon-tech"></i>
                <div className="product__title">technical</div>
            </div>
            <div className="product-details">
                <div className="product-details__box">
                    { renderDropdowns(props.technicalMap.entries()) }
                </div>

                <ProductTabsHooks 
                    fabricMap={props.fabricMap} 
                    saveToStore={props.saveToStore}
                    shell_fabric_tab={props.technicalStore.shell_fabric_tab}
                />

                <div className="product-columns product-checkboxes">
                    {renderCheckboxes(checkboxesList)}
                </div>
            </div>
        </div>
    );
}

export default connect((state) => ({
    technicalStore: technicalStore(state)
}), (dispatch) => ({
    saveToStoreCheckbox: ({checked, name}) => {
        name = nameProperly(name)
        dispatch(createAction('TECHNICAL_CHECKBOX', {checked, name}))
    },
    saveToStore: (payload) => dispatch(createAction('TECHNICAL', payload))
}))(TechnicalHooks);