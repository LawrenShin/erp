import React,{Component} from 'react';
import {connect} from 'react-redux';
import { createAction } from '../../actions';

  const Order = ({ name, title, addOrdering }) => (
    <span onClick={() => addOrdering(name.toLowerCase())}><i className="icon-arrow-dowble"></i>{title}</span>
);

const mapStateToProps = ({router, common}) => ({
  location: router.location.pathname.match(/[^\/]+/gi).join(''),
  ordering: common.ordering
});

export default connect(mapStateToProps, (dispatch) => ({
  addOrdering: (orderParams) => dispatch(createAction('ADD_ORDERING', orderParams))
}))(Order);