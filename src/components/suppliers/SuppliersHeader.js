import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import Spans from './Spans.js';
import AddBtn from '../controls/addbtn';
import styled from 'styled-components';
import {createAction} from '../../actions';

const SettingsBtn = styled( ({className, onClick}) => {
  return <span className={`page-heading__settings ${className}`} onClick={onClick}><i className="icon-settings"></i></span>
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
    }
  };

  filterNameTimeout = null;

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

  handleChange = (e) => {
    const filterName = e.target.value;
    if(this.filterNameTimeout !== null){
      clearInterval(this.filterNameTimeout);
    }
    if(filterName){
      this.filterNameTimeout = setTimeout(() => {
        this.props.setFilterName(filterName);
      }, 500);
    }
  }

  render(){
    return(
      <div className="page-heading">
        <div className="page-heading__title">
          <div className="page-heading__top">
            <h1 className={`h1`}>{this.state.title}</h1>
            <AddBtn to={this.props.link || "/suppliers/create"} />
          </div>
          <h2 className={"page-subtitle"}>{this.state.subtitle}</h2>
        </div>
        <div className="page-heading__navs">
          <form className="page-heading__form">
            <div className="page-heading__search">
              <div className="search-bl">
                <input type="text" className="search-bl__input" placeholder='Search...' onChange={this.handleChange} />
                <button type="button" className="search-bl__btn" onClick={this.handleChange}><i className="icon-search"></i></button>
              </div>
            </div>
            <SettingsBtn active={this.props.activeSettings} onClick={this.props.onClickSettings}/>
            <Spans filterOutByRating={this.props.filterOutByRating} />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(undefined, (dispatch) => ({
  setFilterName: (filterName) => dispatch(createAction('SET_FILTER_NAME', filterName))
}))(SuppliersHeader);