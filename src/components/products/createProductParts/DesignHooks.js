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
        let requireds = ['upload_sketch', 'color', 'style_name', 'product_group', 'gender', 'age'];
        for (let [name, options] of map) {
            // console.log(props.product[name]) // data is raw, some fields missing some of them null. Can't preset data until can create product
            const req = requireds.filter(word => word === name)[0];
            drops.push(<WrappError
                required={req ? 'required' : ''}
                key={uuid()}
                name={name}
                options={options}
                saveToStore={props.saveToStore}
                valueFromStore={props.product[name] || props.designStore[name]}
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
                    <div className="product-columns__item">
                        <div className="box-field">
                            <label className="box-field__label required">Upload sketch</label>
                            <label className="load-file">
                                <span className="box-field__input load-file__input"></span>
                                <i className="load-file__icon load-file__icon_1 icon-upload"></i>
                                <input type="file" className="load-file__file" required />
                            </label>
                        </div>
                    </div>
                    {renderDropdowns(props.designMap.entries())}
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