import React, {useState} from 'react';
import uuid from 'uuid'

import ConnectedDropdown from '../../../controls/ConnectedDropdown';
import Input from "../../../controls/input";

const ProductTabsHooks = (props) => {
    const [tab, setTab] = useState('shell_fabric');

    const tabs = ['shell_fabric', 'padding', 'lining', 'decor_fabric', 'trims']
    //const tabs = ['shell_fabric'];
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
        let requireds = ['shell_fabric_1', 'weight_1', 'compositions_1', 'constructions_1'];
        let withouts = ['constructions', 'compositions'];
        let newname = '';
        for (let [name, options] of map) {
            const req = requireds.filter(word => word === `${name}_${index}`)[0];
            const filter = withouts.filter(word => word === name)[0];
            if (filter) {
                newname = name.substr(0, name.length - 1);
            } else {
                newname = name;
            }
            const editName = name === 'shell_fabric' ? `${name}_${index}` : `shell_fabric_${index}_${newname}`;
            drops.push(
                <ConnectedDropdown
                    required={req ? 'required' : ''}
                    key={uuid()}
                    name={`${name}_${index}`}
                    options={options}
                    saveToStore={props.saveToStore}
                    valueFromStore={props.product[editName] || props.shell_fabric_tab[`${name}_${index}`]}
                />
            )
        }
        return drops.map(d => d)
    };

    return (
        <div className="tabs-product">
            <div className="nav-tab">
                {renderTabs()}
            </div>
            <div className="tabs-product__wrap">
                <div className="product-details__box">
                    {props.fabricMap && <ConnectedDropdown
                        required='required'
                        name='shell_fabric_1'
                        options={props.fabricMap.get('shell_fabric').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.shell_fabric_1}
                    />}
                    <div className="product-columns__item">
                        <Input
                            required='required'
                            simple={true}
                            onBlur={(e) => props.saveToStore({name: 'shell_fabric_1_weight', data: e.target.value})}
                            name='shell_fabric_1_weight'
                            value={props.product.shell_fabric_1_weight}
                            label="Shell fabric weight 1"/>
                    </div>
                    {props.fabricMap && <ConnectedDropdown
                        required='required'
                        name='shell_fabric_1_composition'
                        options={props.fabricMap.get('compositions').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.shell_fabric_1_composition}
                    />}
                    {props.fabricMap && <ConnectedDropdown
                        required='required'
                        name='shell_fabric_1_construction'
                        options={props.fabricMap.get('constructions').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.shell_fabric_1_construction}
                    />}
                    {props.fabricMap && <ConnectedDropdown
                        name='shell_fabric_2'
                        options={props.fabricMap.get('shell_fabric').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.shell_fabric_2}
                    />}
                    <div className="product-columns__item">
                        <Input
                            simple={true}
                            onBlur={(e) => props.saveToStore({name: 'shell_fabric_2_weight', data: e.target.value})}
                            name='shell_fabric_2_weight'
                            value={props.product.shell_fabric_2_weight}
                            label="Shell fabric weight 2"/>
                    </div>
                    {props.fabricMap && <ConnectedDropdown
                        name='shell_fabric_2_composition'
                        options={props.fabricMap.get('compositions').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.shell_fabric_2_composition}
                    />}
                    {props.fabricMap && <ConnectedDropdown
                        name='shell_fabric_2_construction'
                        options={props.fabricMap.get('constructions').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.shell_fabric_2_construction}
                    />}
                    {props.fabricMap && <ConnectedDropdown
                        name='shell_fabric_3'
                        options={props.fabricMap.get('shell_fabric').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.shell_fabric_3}
                    />}
                    <div className="product-columns__item">
                        <Input
                            simple={true}
                            onBlur={(e) => props.saveToStore({name: 'shell_fabric_3_weight', data: e.target.value})}
                            name='shell_fabric_3_weight'
                            value={props.product.shell_fabric_3_weight}
                            label="Shell fabric weight 3"/>
                    </div>
                    {props.fabricMap && <ConnectedDropdown
                        name='shell_fabric_3_composition'
                        options={props.fabricMap.get('compositions').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.shell_fabric_3_composition}
                    />}
                    {props.fabricMap && <ConnectedDropdown
                        name='shell_fabric_3_construction'
                        options={props.fabricMap.get('constructions').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.shell_fabric_3_construction}
                    />}
                    {/*renderDropdowns(props.fabricMap, 1)}
                    {renderDropdowns(props.fabricMap, 2)}
                    {renderDropdowns(props.fabricMap, 3)*/}
                </div>
            </div>
        </div>
    )
}
export default ProductTabsHooks;