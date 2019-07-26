import React, {PureComponent, useState} from 'react'
import {createAction} from '../../../actions'
import {logisticsStore} from '../../../ducks/productSagas/createProduct'
import {connect} from 'react-redux'
import ConnectedDropdown from "../../controls/ConnectedDropdown";
import Api from "../../../requestor/api";
import CommonApi from "../../../requestor/common";

const LogisticHook = ({label, saveToStore, storeValue, properName}) => {
    const [value, setValue] = useState(storeValue || false);

    return <div className="product-details__item" key={`${properName}_${label}`}>
        <div className="box-field">
            <label style={{display: 'block', fontWeight: '700', marginBottom: '6px'}}
                   htmlFor={properName}>{label}: </label>
            <input
                style={{width: '100%'}}
                type='number'
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => saveToStore({name: properName, data: value})}
                value={value}
                name={properName}
                label={label}/>
        </div>
    </div>
};

class LogisticsHooks extends PureComponent {
    state = {
        fields: {
            number_gtd: {
                label: 'Number gtd',
                value: this.props.product.number_gtd || ''
            },
            vat_rate: {
                label: 'Vat rate',
                value: this.props.product.vat_rate || 0
            },
        }
        /*code_tnved: {
            label: 'Code tnved',
            value: this.props.product.code_tnved || ''
        },
        country_origin_id: {
            label: 'Country origin id',
            value: this.props.product.country_origin_id || ''
        }*/
    };

    async componentDidMount() {
        if (!this.state.countries) {
            const countries = await CommonApi.getCountries().then(res => res.results);
            this.setState({countries})
        }
    }

    renderInputs = (state) => Object.keys(state).map(inpName => <LogisticHook
        saveToStore={this.props.saveToStore}
        storeValue={this.state.fields[inpName].value}
        properName={inpName}
        label={this.state.fields[inpName].label}
    />);

    render() {
        return (
            <div className="product__item">
                <div className="product__heading">
                    <i className="product__icon icon-logostics"></i>
                    <div className="product__title">logistics</div>
                </div>
                <div className="product-details">
                    <div className="product-details__box">
                        <div className="product-details__item">
                            {this.props.logisticMap && <ConnectedDropdown
                                name='code_tnved'
                                options={this.props.logisticMap.get('code_tnved').map((s, i) => ({
                                    name: s.name,
                                    id: s.id
                                }))}
                                saveToStore={this.props.saveToStore}
                                valueFromStore={this.props.product.code_tnved}
                            />}
                        </div>
                        <div className="product-details__item">
                            {this.state.countries && <ConnectedDropdown
                                required='required'
                                name='country'
                                options={this.state.countries.map((s, i) => ({
                                    name: s.name,
                                    id: s.id
                                }))}
                                saveToStore={this.props.saveToStore}
                                valueFromStore={this.props.product.country}
                            />}
                        </div>
                        {this.renderInputs(this.state.fields)}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
        logisticsStore: logisticsStore(state)
    }),
    (dispatch) => ({
        saveToStore: (payload) => dispatch(createAction('LOGISTICS', payload))
    }))(LogisticsHooks)