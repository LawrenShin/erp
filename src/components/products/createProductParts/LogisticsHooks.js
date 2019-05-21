import React, { Component } from 'react'
import uuid from 'uuid'
import { createAction } from '../../../actions'
import { logisticsStore } from '../../../ducks/createProduct'
import { connect } from 'react-redux'
import Input from '../../controls/input'


class LogisticsHooks extends Component {
  irrigateHeader = (name) => `${name[0].toLowerCase()}${name.substr(1).replace(/ /g, "_")}`
  state = { 
    number_gtd: { 
      label: 'Number gtd', 
      value: this.props.logisticsStore.number_gtd || ''
    }, 
    vat_rate: { 
      label: 'Vat rate', 
      value: this.props.logisticsStore.vat_rate || 0
    }, 
    code_tnved: { 
      label: 'Code tnved', 
      value: this.props.logisticsStore.code_tnved || '' 
    }, 
    country_origin_id: { 
      label: 'Country origin id', 
      value: this.props.logisticsStore.country_origin_id || '' 
    }
  }

  handleChange = ({ target: {name, value} }) => this.setState((prev => {
    let newState = Object.assign({}, prev)
    newState[name].value = value
    return newState
  }))

  renderInputs = (state) => {
    const list = Object.keys(state).map(k => state[k].label)

    return list.map(inp => {
      const properName = this.irrigateHeader(inp)
      return <div className="product-details__item" key={uuid()}>
        <div className="box-field">
          <Input 
            simple={true} 
            onChange={this.handleChange}
            onBlur={({ target }) => this.props.saveToStore({ name: properName, data: target.value })}
            value={this.state[properName].value}
            name={properName}
            label={`${inp} `} />
        </div>
      </div>
    })
  }

  render(){
    return (
      <div className="product__item">
        <div className="product__heading">
          <i className="product__icon icon-logostics"></i>
          <div className="product__title">logistics</div>
        </div>
        <div className="product-details">
          <div className="product-details__box">
            {this.renderInputs( this.state )}
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