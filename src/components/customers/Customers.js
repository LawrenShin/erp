import React, {Component} from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {renamedFiltersSelector, customersSelector} from '../../selectors/customers';
import {combineOptions} from '../../selectors/options';
import SuppliersHeader from '../suppliers/SuppliersHeader.js';
import ProductFilters from '../products/ProductFilters.js';
import Table from '../common/table';
import Loading from '../helpers/loading';
import {createRequestAction, createAction} from '../../actions';
import {NavLink} from 'react-router-dom';
import Order from '../common/order';

const FIELDS = { 
    "id": 'Id', 
    "code": 'Code', 
    "name": 'Name', 
    "head_contractor_name": 'Head contractor', 
    "type_item_price": 'Item price', 
    "region": 'Region', 
    "parent": 'Parent' 
};

class Customers extends Component {
    state = { 
        customersFilters: '',
        customers: [],
        customersAmount: 0,
        tableWidth: 0,
        tableHeight: 0,
        defaultOptions: {},
        supplementedCustomersList: []
    };

    filterNameTimer = null;

    clearAll = () => {
        this.props.clearOptions();
        this.setState({defaultOptions: {}});
    }
    clickIcon = () => {
        alert('I will definetly do that... later.');
    }

    updateOptions = (filter, value) => {
        this.props.setOptions({
            ...this.props.options,
            [filter]: value
        });
        this.setState(state => ({defaultOptions: {...state.defaultOptions, [filter]: value}}));
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.customers.state === 'loaded' && !this.state.supplementedCustomersList.length){
            this.supplementCustomersList(this.props.customers.data);
        }
        if(this.props.customers !== prevProps.customers){
            this.supplementCustomersList(this.props.customers.data);
        }

        const prevCombinedOptions = combineOptions(prevProps.state, "customer"),
        combinedOptions = combineOptions(this.props.state, 'customer'),
        isEqual = _.isEqual(prevCombinedOptions, combinedOptions);
        if(!isEqual){
            this.props.list(combinedOptions);
        }
    }
    componentDidMount(){
        this.props.getFilters();
        this.props.getParents();
        this.props.getRegions();
        this.props.getTypePrice();
        this.props.list(this.props.options);
    }

    supplementCustomersList = (customers) => {
        const parentsList = this.props.parents.data.results, 
        priceTypesList = this.props.typeItemPrice.data.results,
        regions = this.props.regions.data.results;

        let supplementedCustomersList = [];
        supplementedCustomersList = customers.map(customer => {
            for(let parent of parentsList){
                if(customer.parent === parent.id)
                    customer.parent = parent.name;
            }
            for(let priceType of priceTypesList){
                if(customer.type_item_price === priceType.id)
                    customer.type_item_price = priceType.name;
            }
            for(let region of regions){
                if(customer.region === region.id)
                    customer.region = region.name;
            }
            return customer;
        });
        this.setState({ supplementedCustomersList });
    }

    onResize = (width, height) => {
        this.setState({tableWidth: width, tableHeight: height});
    }
    // to refactor
    filterOutByName = (e) => { 
        if(this.filterNameTimer !== null) {
            clearInterval(this.filterNameTimer)
        };
        const filterName = e.target.value;
        if(filterName){
            this.filterNameTimer = setTimeout(() => {
                const filteredList = this.state.supplementedCustomersList.filter(customer => customer.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
                this.setState({ supplementedCustomersList: filteredList });
            }, 500);
        }else{
            this.props.list(this.props.options);
        }
    };
    // to refactor

    render(){
        return(
            <>  
            <SuppliersHeader title='Customers' subtitle='LIST OF CURRENT CUSTOMERS' link='/customers/create' filterOutByName={this.filterOutByName} />
            {this.props.customersFilters ? 
                <>           
                    <ProductFilters onResize={this.onResize} filters={this.props.customersFilters.data} updateOptions={this.updateOptions} clearAll={this.clearAll} options={this.props.options} defaultOptions={this.state.defaultOptions}/>
                    {this.state.supplementedCustomersList.length ? 
                    <Table 
                        fixed={3}
                        height={400} 
                        fields={FIELDS} 
                        data={this.state.supplementedCustomersList} 
                        header={(title, name) => <Order title={title} name={name} />}
                        cell={(value, name) => name === "id" ? <NavLink to={`/customers/view/${value}`}>{value}</NavLink> : value}
                    /> 
                    : 
                    <Loading/>
                    } 
                </>
                :
                <Loading/>
            }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    customersFilters: renamedFiltersSelector(state),
    options: combineOptions(state, "customer"),
    customers: state.customer.list,
    options: state.customer.options,
    typeItemPrice: state.customer.typeItemPrice,
    parents: state.customer.parents,
    regions: state.customer.regions,
    state
});

export default connect(mapStateToProps, 
    (dispatch) => ({
        getTypePrice: () => dispatch(createRequestAction('customer', 'getTypePrice')),
        getParents: () => dispatch(createRequestAction('customer', 'getParents')),
        getRegions: () => dispatch(createRequestAction('customer', 'getRegions')),
        getFilters: () => dispatch(createRequestAction('customer', 'getFilters')),
        list: (options) => dispatch(createRequestAction('customer', 'list', [options])),
        setOptions: (options) => dispatch(createAction('SET_OPTIONS', {options})),
        clearOptions: () => dispatch(createAction('CLEAR_OPTIONS'))
    }))(Customers);