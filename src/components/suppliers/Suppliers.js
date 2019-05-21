import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { createAction } from '../../actions';

import SuppliersHeader from './SuppliersHeader.js';
import Filters from './Filters.js';
import Table from './Table.js';
import { fetchFilters } from '../../actions/suppliers.js';
import {Loading, Error} from '../helpers';

class Suppliers extends Component {
    state = {
        filterName: '',
        checkBoxes: [{ inReact: "Respond in time", inUrl: "is_timely_response_to_letters" },
        { inReact: "Offeres Cost break down", inUrl: "is_cost_break_down" },
        { inReact: "No spam questions", inUrl: "is_no_spam_any_work_questions" },
        { inReact: "Efficiency work with orders", inUrl: "is_efficiency_work_with_orders" },
        { inReact: "Discount reject delay", inUrl: "is_discount_reject_delay" }],
        tableWidth: 0,
        tableHeight: 0,
        showFilters: true
    };

    componentDidMount(){
        this.props.fetchFiltersReq();
    }

    filterOutByRating = (e, data) => { console.log(data) };

    onResize = (width, height) => {
        this.setState({tableWidth: width, tableHeight: height});
    }

    toggleFilters = () => {
        this.setState( ({showFilters}) => ({showFilters: !showFilters}) );
    }

    render(){
        const {state} = this.props.filters;
        const {showFilters} = this.state;

        return(
            <React.Fragment>
                <SuppliersHeader 
                    activeSettings={showFilters} 
                    onClickSettings={this.toggleFilters} 
                    filterOutByRating={this.filterOutByRating} 
                    link='suppliers/create' />
                {state === "loaded" ? 
                    <>
                        {showFilters ? <Filters onResize={this.onResize} filters={this.props.filters.data} checkBoxesToRender={this.state.checkBoxes} /> : null}
                        {<Table 
                            list={this.props} 
                            store={this.props.store} 
                            graphDetailsToStore={this.props.graphDetailsToStore}
                        />}
                    </>
                : state === "loading" ? <Loading/> : <Error error={this.props.filters.err} />
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({suppliers, requestList, checkBoxes, filterName, suppliers: {list, options, filters}, common}) => ({
    requestList,
    filters,
    checkBoxes,
    list,
    filterName,
    options,
    store:{
        common,
        suppliers
    }
});

export default connect(
    mapStateToProps,
    (dispatch) => ({
        graphDetailsToStore: (details) => dispatch(createAction('SET_GRAPH_DETAILS_SUPPLIERS', details)),
        fetchFiltersReq: () => dispatch(fetchFilters())
    })
    )(Suppliers);