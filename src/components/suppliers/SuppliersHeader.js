import React, {Component, useState} from 'react'
import {connect} from 'react-redux'

import Spans from './Spans.js'
import AddBtn from '../controls/addbtn'
import styled from 'styled-components'
import {createAction} from '../../actions'
import ModalSemantic from '../common/ModalSemantic'
import QuotationCreateWizard from '../quotations/quotationWizard/QuotationCreateWizard'

export const SearchBar = ({ storeVal, name, setFilterName, title }) => {
  let filterNameTimeout = null;
  
  const handleChange = (e) => {
    const filterName = e.target.value
    
    if(filterNameTimeout !== null){
      clearInterval(filterNameTimeout)
    }
    
    filterNameTimeout = setTimeout(() => {
      title ? setFilterName(filterName, title) : setFilterName(name, filterName)
    }, 500)
  }
  return (
    <div className="page-heading__navs">
      <form className="page-heading__form" onSubmit={(e) => e.preventDefault()}>
        <div className="page-heading__search">
          <div className="search-bl">
            <input
              id='nameSearcher' 
              type="text" 
              className="search-bl__input" 
              placeholder='Search...' 
              onChange={handleChange} 
              defaultValue={storeVal} />
            <button type="button" className="search-bl__btn" onClick={handleChange}><i className="icon-search"></i></button>
          </div>
        </div>
        {/* <SettingsBtn active={this.props.activeSettings} onClick={this.props.onClickSettings}/>
        <Spans filterOutByRating={this.props.filterOutByRating} /> */}
      </form>
    </div>
  )
}

const SettingsBtn = styled( ({className, onClick}) => {
  return <></> /* Return for future use *//*<span className={`page-heading__settings ${className}`} onClick={onClick}><i className="icon-settings"></i></span>*/
})`
  cursor: pointer;
  i {
    position: relative;
    transition: 0.3s linear;    
    display: inline-block;
  }
  
  ${({active}) => active && `
    color: #40bde8;
    i {      
      transform: rotateZ(360deg);
    }
  `}
`;

class SuppliersHeader extends Component{
  state = { 
    title: this.props.title || 'Suppliers', 
    subtitle: this.props.subtitle || 'List of current suppliers', 
    icons : {
      asset: false,
      add: false,
      settings: false
    },
  };

  static defaultProps = {
    onClickSettings: () => {}
  } 

  clickIcon = (name) => {
    this.setState((prev) => {
      const state = prev;
      state.icons[name] = !prev.icons[name];
      return state;
    })
  }
  
  render(){
    return(
      <div className="page-heading">
        <div className="page-heading__title">
          <div className="page-heading__top">
            <h1 className={`h1`}>{this.state.title}</h1>

            { this.props.quotation ? 
                <ModalSemantic
                  style={{ marginLeft: '0 !important' }}
                  trigger={ <div className={`page-heading__icon`}><span className="cls-1">+</span></div> }>
                  <QuotationCreateWizard />
                </ModalSemantic> 
              : 
                <AddBtn to={this.props.link || "/suppliers/create"} /> }

          </div>
          <h2 className={"page-subtitle"}>{this.state.subtitle}</h2>
        </div>
          <SearchBar
            storeVal={this.props.name}
            setFilterName={this.props.setFilterName}
            title={this.state.title} />
      </div>
    );
  }
}

export default connect(state => ({
  name: state.suppliers.options.name__icontains
}), (dispatch) => ({
  setFilterName: (filterName, title) => dispatch(createAction(`SET_FILTER_NAME_${title.toUpperCase().substr(0, title.length - 1)}`, filterName))
}))(SuppliersHeader);