import React, {Component} from 'react';
import {connect} from 'react-redux';

import SuppliersHeader from '../suppliers/SuppliersHeader.js';
import ProductFilters from './ProductFilters.js';
import Table from './Table.js';
import {createRequestAction, createAction} from '../../actions';
import {renamedFilters, renamedProducts} from '../../selectors/products';
import Pointer from '../controls/pointer';
import Loading from '../helpers/loading';

class Products extends Component {
    state = { 
        tableWidth: 0,
        tableHeight: 0
    };

    clearAll = () => this.props.clearOptions();

    clickIcon = () => {
        alert('I will definetly do that, but later.');
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.options !== prevProps.options){
            this.props.list(this.props.options);
        }
    }

    updateOptions = (filter, value) => {
        this.props.setOptions({
            ...this.props.options,
            [filter]: value
        });
    }

    onResize = (width, height) => {
        this.setState({tableWidth: width, tableHeight: height});
    }

    componentDidMount(){
        this.props.clearOptions();
        this.props.getFilters();
        this.props.list();
    }

    render(){
        const offset = this.props.options.offset, limit = this.props.options.limit;
        return(
            <>
                <SuppliersHeader title='Products' subtitle='LIST OF CURRENT PRODUCTS' products={true} link='/products/create' />
                {this.props.filters.state === 'loaded' ? 
                <>
                    <ProductFilters onResize={this.onResize} filters={this.props.filters.data} updateOptions={this.updateOptions} clearAll={this.clearAll} options={this.props.options} />
                    <div className="unload-link">
                        <Pointer><i className="icon-xlsx"></i><span>Export to Excel</span></Pointer>
                    </div>
                    
                    <Table store={this.props.state}  />                     
                </>
                :
                <Loading/>}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    state,
    products: state.products.list,
    filters: renamedFilters(state),
    options: state.products.options,
    headers: state.products.headers
});

export default connect(mapStateToProps, 
    (dispatch) => ({
        list: (options) => dispatch(createRequestAction('product', 'list', [options])),
        getFilters: () => dispatch(createRequestAction('product', 'getFilters')),
        setOptions: (options) => dispatch(createAction('SET_OPTIONS', {options})),
        clearOptions: () => dispatch(createAction('CLEAR_OPTIONS'))
    }))(Products);