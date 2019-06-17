import React, {PureComponent} from 'react';
import _ from 'lodash';
import {NavLink} from 'react-router-dom';
import Loading from '../helpers/loading';
import Table from '../common/table';
import Api from '../../requestor/api';
import axios from 'axios';
import Common from '../../requestor/common';
import ReactCountryFlag from 'react-country-flag';
import styled from 'styled-components';
import Order from '../common/order';
import {combineOptions} from '../../selectors/options';

import InnerRow from './InnerRow';

import connectApi from '../../components/api-wrapper';

class ExpandComponent extends React.PureComponent {
    static defaultProps = {
        onClick: () => {}
    }
    onClick = () => {
        this.props.onClick();
    }
    render() {
        const {className, ...rest} = this.props;
        return <div className={`${className}`} {...rest} onClick={this.onClick}><i className="icon-arrow-down"></i></div>
    }
}

const Expand = styled(ExpandComponent)`
    color: #40bde8;
    cursor: pointer;
    margin-right: 30%;
    transform: rotateZ(-90deg);
    transition: 0.3s linear;

    ${({active}) => active && `transform: rotateZ(0);` }
`;

class DynamicTable extends React.PureComponent {

  fields = {
    id: "Id",
    name: "Name",
    status: "Status",
    factory_country: "Country",
    categories: "Deal in",
    get_rating: "Raiting",
    get_financial_rating: "Financial rating",
    get_reliability_rating: "Reabitiy rating",
    payment_terms_id: "Payment Term",  
    total_order_usd: "Total order, USD",
    total_order_qnty: "Total order qnty, pieces",
    delivery_terms: "Delivery term"    
  }

  state = {
    list: [],
    cities: [], 
    countries: [],
    rowIndex: -1,
    backRowIndex: -1,
    loading: false,
    options: [],
    graphDetails: null
  }

  timeout = null;
  backY = 0;
  backX = 0;
  offset = 0;
  count = 0;

  filterNameTimer = null;

  constructor(props){
    super(props);
    props.getApi().onChange = this.onChange;
  }

  async onChange(props, prevProps){
    const combinedOpt = combineOptions(this.props.store),
    prevCombinedOpt = combineOptions(prevProps.store),
    isEqual = _.isEqual(combinedOpt, prevCombinedOpt),
    {getApi} = this.props;
    
    if(!isEqual){
      this.setState({options: combinedOpt, loading: true}, async () => {
        const suppliers = await getApi("supplier").run("list", this.state.options);

        this.setState({
          list: suppliers.results,
          loading: false
        });
        this.fetchGraphDetails(this.state.list);
      });
    }
  }

  async componentDidUpdate(prevProps, prevState){
    this.onChange(this.props, prevProps);
  }

  onScroll = async ({valueY, valueX, height}) => {       
      
    if(this.state.loading)
        return;

    const { getApi } = this.props;

    if(valueY / height > 0.9 && valueY > this.backY && this.offset + this.state.options.limit < this.count) {

        this.setState({loading: true}, async () => {

            this.offset += this.state.options.limit;
            
            const data =  {
                ...this.state.options,
                offset: this.offset
            }
            this.setState(async ({list}) => ({list: await getApi("supplier").run("list", this.state.options).results.concat(data), loading: false}));        
        });
    }

    this.backY = valueY;
  }

  fetchGraphDetails = async (list) => {
    const {getApi, graphDetailsToStore} = this.props;
    let graphDetails = [];
    for(let i of list){
      try{
        const res = await getApi('supplier').run('getGraphsDetails', i.id);
        graphDetails.push(res);
      }catch(e){
        console.log(e);
      }
    }
    if(graphDetailsToStore) graphDetailsToStore(graphDetails);
  }

  async componentDidMount(){
    this.setState({
      loading: true
    })

    const {getApi} = this.props;
    const categories = await getApi("supplier").run("getCategories");
    const suppliers = await getApi("supplier").run("list", this.state.options);

    Api.all([Common.getCities(), Common.getCountries()]).then(axios.spread((cities, countries) => {
      cities = cities.results;
      countries = countries.results;

      this.setState({ 
          cities, 
          countries
      });
    })).catch((err) => { console.log(err) });

    this.setState({
      list: suppliers.results,
      loading: false,
      categories
    });
    this.fetchGraphDetails(this.state.list);
  }


  filterOutByName = async (filterName) => { // rework this like that -> dispatch action from SuppliersHeader to set filterName in common. It will trigger the update
    const {getApi} = this.props;
    const options = combineOptions(getApi("common").state, "suppliers");

    if(this.filterNameTimer !== null) {
        clearInterval(this.filterNameTimer);
    };
    if(filterName){
        this.filterNameTimer = setTimeout(async () => {
            const filteredList = await getApi("supplier").run("list", options).data.filter(supplier => supplier.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
            this.setState({ list: filteredList });
        }, 500);
    }
  };

  render(){
    const fields = this.props.addToQuotation ? Object.assign({q: ''}, this.fields) : this.fields;

    return (      
      <div style={{position: "relative"}}>
        <Table
            className={this.props.className}
            fields={fields}
            data={this.state.list}
            rowAfter={(row, id) => {
                if(row === this.state.rowIndex) {
                  return <InnerRow
                    row={ row }
                    graphDetails={ this.props.store.suppliers.graphDetails }
                  />
                }
                else if(row === this.state.backRowIndex) {
                  return <InnerRow
                    id={ id }
                    graphDetails={ this.props.store.suppliers.graphDetails }
                    collapse
                  />
                }
                else
                    return null;
            }}
            cell={(value, name, row) =>
                name === "q" ? <span className="action-quatation action-quatation_add">Add supplier to quotation</span> :
                name === "id" ? (
                    this.props.addToQuotation ?
                    <>
                      <NavLink to={`/suppliers/view/${value}`}>{value}</NavLink>
                    </> :
                    <>
                        <div className="-flex">
                        <Expand active={row === this.state.rowIndex} onClick={() => {this.setState(({rowIndex}) => rowIndex === row ? ({rowIndex: -1, backRowIndex: row, list: Array.from(this.state.list)}) : ({backRowIndex: rowIndex, rowIndex: row, list: Array.from(this.state.list)}))}}/>
                        <NavLink to={`/suppliers/view/${value}`}>{value}</NavLink>
                        </div>
                    </>
                ) :
                name === "name" ? <><div className="col-name">{this.state.list[row].name.replace("&nbsp;", " ")}</div><span>{this.state.list[row].type === 'FC' ? 'Factory' : 'Agent'}</span></> :
                name === "status" ?
                    (this.state.list[row].status !== 'AC' ?
                      <div className="col-status col-status_inactive">inactive</div>
                      :
                      <div className="col-status col-status_active">active</div>
                    ) :
                name === "factory_country" ?
                    (
                        <>
                            {this.state.list[row].factory_country && this.state.countries && this.state.countries.find(({id}) => this.state.list[row].factory_country === id) ? <ReactCountryFlag code={this.state.countries.find(({id}) => this.state.list[row].factory_country === id).iso.toLowerCase()} svg styleProps={{width: '20px',height: '10px'}} /> : null}
                            {this.state.list[row].factory_country && this.state.countries && this.state.countries.find(({id}) => this.state.list[row].factory_country === id) ? <span>{this.state.countries.find(({id}) => this.state.list[row].factory_country === id).name}</span> : null}
                        </>
                    ) :
                (name === "categories" && "categories" in this.state.list[row] && this.state.list[row].categories.length) ?
                    (
                      this.state.list[row].categories ?

                      <span>
                      {
                        this.state.list[row].categories
                          .map( v => {
                            return this.state.categories.data && (this.state.categories.data.find(({id}) => v === id) || {}).name || v
                          } ).join(', ')
                      }
                      </span> : ''
                    ) :
                name === "payment_terms_id" ? "TT / / 100--10t postpay" :
                name === "delivery_terms" ? "EXW Beijing" :
                /rating$/.test(name) ? `${value}%` :
                /total/.test(name) ? Math.floor(Math.random() * 10000 + 500) :
                value}
            header={(title, name) => name !== 'q' ? <Order name={name} title={title} /> : null}
            fixed={2}
            height={600}
            onScroll={this.onScroll}
        />
        {this.state.loading ? <Loading style={{position: "absolute", left: "45%", top: "45%", display: "inline-block", zIndex: 1000}} /> : null}
      </div>
      
    );
  }
};


export default connectApi(DynamicTable)