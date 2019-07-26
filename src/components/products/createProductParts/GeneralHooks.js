import React, {useState} from 'react';
import {connect} from 'react-redux';

import {Message} from 'semantic-ui-react'
import Input from '../../controls/input';
import ConnectedDropdown from '../../controls/ConnectedDropdown';
import {createAction} from '../../../actions';
import {generalStore} from '../../../ducks/productSagas/createProduct'
import Checkbox from "../../controls/checkbox";

const GeneralHooks = (props) => {
    const [name, setName] = useState(props.product.name || '');
    const [target_price, setTargetPrice] = useState(props.product.target_price || '');
    const [moq, setMoq] = useState(props.product.moq || 0);
    const [code, setCode] = useState(props.product.code || '');
    const [vendor_code, setVendorCode] = useState(props.product.vendor_code || '');

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
                                required='required'
                                simple={true}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => props.saveToStore({name: 'name', data: name})}
                                name='name'
                                value={name}
                                label="Name"/>
                            {props.requestErrors.response && <Message
                                color='red'
                                size='small'>
                                {props.requestErrors.response.name[0]}
                            </Message>}
                        </div>
                    </div>
                    {props.generalMap && <ConnectedDropdown
                        required='required'
                        name='theme'
                        options={props.generalMap.get('themes').map((s, i) => ({name: s.name, id: s.name}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.theme}
                    />}
                    {props.generalMap && <ConnectedDropdown
                        required='required'
                        name='trade_mark'
                        options={props.generalMap.get('trademark').map((s) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.trade_mark}
                    />}
                    {props.generalFilter && <ConnectedDropdown
                        required='required'
                        name='season'
                        options={props.generalFilter.season.map((s, i) => ({name: s.text, id: s.value}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.season}
                    />}
                    {props.requestErrors.response && <Message
                        color='red'
                        size='small'>
                        {props.requestErrors.response.season[0]}
                    </Message>}
                    <div className="product-columns__item">
                        <div className="select-elem">
                            <Input
                                required='required'
                                type='number'
                                simple={true}
                                onChange={(e) => setTargetPrice(e.target.value)}
                                onBlur={() => props.saveToStore({name: 'target_price', data: target_price})}
                                name='target_price'
                                value={target_price}
                                label="Target price"/>
                        </div>
                    </div>
                    {props.generalFilter && <ConnectedDropdown
                        required='required'
                        name='year'
                        options={props.generalFilter.year.map((s, i) => ({name: s.text, id: s.value}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.year}
                    />}
                    {props.generalMap && <ConnectedDropdown
                        required='required'
                        name='collection'
                        options={props.generalMap.get('collections').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.collection}
                    />}
                    {props.requestErrors.response && <Message
                        color='red'
                        size='small'>
                        {props.requestErrors.response.collection[0]}
                    </Message>}
                    <div className="product-columns__item">
                        <Input
                            required='required'
                            label='MOQ'
                            simple={true}
                            name='moq'
                            type='number'
                            onChange={(e) => setMoq(e.target.value)}
                            onBlur={() => props.saveToStore({name: 'moq', data: moq})}
                            value={moq}/>
                    </div>
                    <div className="product-columns__item">
                        <Input
                            disabled={props.edit ? true : false}
                            label='Code 1C'
                            simple={true}
                            name='code'
                            type='number'
                            className={props.edit ? 'hover-none' : ''}
                            onChange={(e) => setCode(e.target.value)}
                            onBlur={() => props.saveToStore({name: 'code', data: code})}
                            value={code}/>
                    </div>
                    <div className="product-columns__item">
                        <Input
                            label='Article'
                            simple={true}
                            name='vendor_code'
                            type='number'
                            onChange={(e) => setVendorCode(e.target.value)}
                            onBlur={() => props.saveToStore({name: 'vendor_code', data: vendor_code})}
                            value={vendor_code}/>
                    </div>
                    {props.generalFilter && <ConnectedDropdown
                        label='Product manager'
                        required='required'
                        name='buing_manager'
                        options={props.generalFilter.buying_manager.map((s) => ({name: s.text, id: s.value}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.userId}
                    />}
                    {props.generalFilter && <ConnectedDropdown
                        name='department'
                        options={props.generalFilter.department.map((s) => ({name: s.text, id: s.value}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.department}
                    />}
                    <div className="product-columns__item">
                        <Checkbox
                            label='Package'
                            name='package'
                            checked={props.product.package}
                            onChange={(e) => props.saveToStore({name: 'package', data: e.checked})}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect((state) => ({
    store: generalStore(state),
    userId: state.auth.id
}), (dispatch) => ({
    saveToStore: (payload) => dispatch(createAction('GENERAL', payload))
}))(GeneralHooks);