import React from 'react';
import uuid from 'uuid';
import {connect} from 'react-redux';
import {createAction} from '../../../actions';
import ConnectedDropdown from '../../controls/ConnectedDropdown';
import {designStore} from '../../../ducks/productSagas/createProduct';
import {Message} from 'semantic-ui-react'

export const WrappError = ({requestErrors, ...rest}) => {
    return (
        <>
            <ConnectedDropdown {...rest} />
            {(requestErrors && requestErrors.response[rest.name]) &&
            <Message color='red' size='small'>{requestErrors.response[rest.name]}</Message>}
        </>
    )
}

const DesignHooks = (props) => {

    const renderDropdowns = (map) => {
        let drops = [];
        let requireds = ['colors', 'styles', 'product_group', 'gender', 'ages'];
        let newnames = ['colors', 'ages'];
        let withouts = ['groups', 'decors', 'styles'];
        for (let [name, options] of map) {
            if(name === 'colors' || name === 'gender' || name === 'ages') {continue;}
            // console.log(props.product[name]) // data is raw, some fields missing some of them null. Can't preset data until can create product
            const req = requireds.filter(word => word === name)[0];
            const newname = newnames.filter(word => word === name)[0];
            const filter = withouts.filter(word => word === name)[0];
            const newn = '';
            if(newname) {
                name = name.substr(0, name.length - 1);
            }
            if(filter) {
                newn = name.substr(0, name.length - 1);
            } else {
                newn = name;
            }
            drops.push(<WrappError
                required={req ? 'required' : ''}
                key={uuid()}
                name={name}
                options={options}
                saveToStore={props.saveToStore}
                valueFromStore={props.product[newn] || props.designStore[name]}
                requestErrors={props.requestErrors}
            />)
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
                    {/*<div className="product-columns__item">
                        <div className="box-field">
                            <label className="box-field__label required">Upload sketch</label>
                            <label className="load-file">
                                <span className="box-field__input load-file__input"></span>
                                <i className="load-file__icon load-file__icon_1 icon-upload"></i>
                                <input type="file" name='main_image' className="load-file__file" required />
                            </label>
                        </div>
                    </div>*/}

                    {props.designMap && <ConnectedDropdown
                        required='required'
                        name='color'
                        options={props.designMap.get('colors').map((s, i) => ({name: s.name, id: s.name}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.color}
                    />}

                    {props.designMap && <ConnectedDropdown
                        required='required'
                        name='age'
                        options={props.designMap.get('ages').map((s, i) => ({name: s.name, id: s.name}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.age}
                    />}

                    {props.designMap && <ConnectedDropdown
                        required='required'
                        name='gender'
                        options={props.designMap.get('gender').map((s, i) => ({name: s.name, id: s.name}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.gender}
                    />}

                    {props.designMap && <ConnectedDropdown
                        label='Product type'
                        name='nomenclature_group'
                        options={props.designMap.get('groups').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.nomenclature_group}
                    />}

                    {props.designMap && <ConnectedDropdown
                        name='decor'
                        options={props.designMap.get('decors').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.decor}
                    />}
                    {props.designMap && <ConnectedDropdown
                        required='required'
                        name='print_mood'
                        options={props.designMap.get('print_mood').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.print_mood}
                    />}
                    {props.designMap && <ConnectedDropdown
                        label='Style for technical files'
                        required='required'
                        name='style'
                        options={props.designMap.get('styles').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.style}
                    />}
                    {props.designMap && <ConnectedDropdown
                        name='designer'
                        options={props.designMap.get('designers').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.designer}
                    />}
                    {props.designMap && <ConnectedDropdown
                        name='wearing_occasion'
                        options={props.designMap.get('wearing_occasion').map((s, i) => ({name: s.name, id: s.id}))}
                        saveToStore={props.saveToStore}
                        valueFromStore={props.product.wearing_occasion}
                    />}

                    {/*renderDropdowns(props.designMap.entries())*/}
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