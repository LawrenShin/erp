import React, {useState} from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid'

import {technicalStore} from '../../../ducks/productSagas/createProduct';
import {createAction} from '../../../actions';
import {nameProperly} from '../../../ducks/productSagas/createProduct/technical';
import Input from '../../controls/input';
import Checkbox from '../../controls/checkbox';
import ProductTabsHooks from './productTabs';
import ConnectedDropdown from '../../controls/ConnectedDropdown';
import {WrappError} from './DesignHooks'

const TechnicalHooks = (props) => {
    const checkboxesList = ['Drip dry', 'Do not wash', 'Line dry', 'Machine wash cold', 'Professional drycleaning', 'Do not bleach', 'Do not iron deco', 'Do not dry-clean', 'Gentle wash up to 30c', 'Iron up to 200c', 'Flat dry', 'Do not iron', 'Cold iron', 'Iron steam', 'Do not tumble dry', 'Iron on reversed side', 'Hand wash', 'Color may fade with light chlorin...', 'Deco detail sh/be remove before ...', 'Iron steam on reverse side', 'Bleach when needed', 'Do not wring', 'Any bleach allowed', 'Machine wash warm']

    const renderCheckboxes = (checkboxesList) => checkboxesList.map((ch, i) => {
        ch = ch.replace(/\./g, '')
        const nameInStore = ch.replace(/[\s,\-,\/]/g, '_').toLowerCase(),
            valueFromStore = props.technicalStore.checkboxes[nameInStore]
        return (
            <div className="product-columns__item product-columns__item_checkboxes" key={uuid()}>
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
        let drops = [];
        let requireds = ['kinds', 'sizes', 'category'];
        for (let [name, options] of map) {
            if(name === 'category') {
                continue;
            }
            const req = requireds.filter(word => word === name)[0];
            drops.push(
                <WrappError
                    key={uuid()}
                    required={req ? 'required' : ''}
                    name={name}
                    options={options}
                    saveToStore={props.saveToStore}
                    valueFromStore={props.product[name] || props.technicalStore[name]}
                    requestErrors={props.requestErrors}
                />
            )
        }
        return drops.map(d => d)
    };

    return (
        <div className="product__item">
            <div className="product__heading">
                <i className="product__icon icon-tech"></i>
                <div className="product__title">technical</div>
            </div>
            <div className="product-details">
                <div className="product-details__box">
                    {props.technicalMap && <ConnectedDropdown
                        required='required'
                        name='category'
                        options={props.technicalMap.get('category').map((s, i) => ({name: s.name, id: s.name}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.category}
                    />}
                    {props.technicalMap && <ConnectedDropdown
                        label='Product category'
                        required='required'
                        name='kind'
                        options={props.technicalMap.get('kinds').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.kind}
                    />}
                    {props.technicalMap && <ConnectedDropdown
                        label='Size range'
                        required='required'
                        name='size_grid'
                        options={props.technicalMap.get('sizes').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.size_grid}
                    />}
                    {props.technicalMap && <ConnectedDropdown
                        required='required'
                        name='purpose'
                        options={props.technicalMap.get('purpose').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.purpose}
                    />}
                    {props.technicalMap && <ConnectedDropdown
                        required='required'
                        name='length'
                        options={props.technicalMap.get('length').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.length}
                    />}
                    {props.technicalMap && <ConnectedDropdown
                        label='Pocket type'
                        required='required'
                        name='type_pocket'
                        options={props.technicalMap.get('typepocket').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.type_pocket}
                    />}
                    {props.technicalMap && <ConnectedDropdown
                        label='Waist level'
                        required='required'
                        name='level_waist'
                        options={props.technicalMap.get('levelwaist').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.level_waist}
                    />}
                    {props.technicalMap && <ConnectedDropdown
                        label='Neck type'
                        required='required'
                        name='kind_neck'
                        options={props.technicalMap.get('kindneck').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.kind_neck}
                    />}
                    {props.technicalMap && <ConnectedDropdown
                        label='Fastener type'
                        required='required'
                        name='kind_fastener'
                        options={props.technicalMap.get('kindfastener').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.kind_fastener}
                    />}
                    {props.technicalMap && <ConnectedDropdown
                        label='Shape'
                        required='required'
                        name='silhouette'
                        options={props.technicalMap.get('silhouettes').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.silhouette}
                    />}
                    {props.technicalMap && <ConnectedDropdown
                        label='Strap type'
                        required='required'
                        name='kind_strap'
                        options={props.technicalMap.get('kindstrap').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.kind_strap}
                    />}
                    {props.technicalMap && <ConnectedDropdown
                        required='required'
                        name='sleeve'
                        options={props.technicalMap.get('sleeve').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.sleeve}
                    />}
                    {/*renderDropdowns(props.technicalMap.entries())*/}
                </div>

                <ProductTabsHooks
                    product={props.product}
                    fabricMap={props.fabricMap}
                    saveToStore={props.saveToStore}
                    shell_fabric_tab={props.technicalStore.shell_fabric_tab}
                />

                {/*<div className="product-columns product-checkboxes">
                    {renderCheckboxes(checkboxesList)}
                </div>*/}
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