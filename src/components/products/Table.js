import React, {Component} from 'react';
import _ from 'lodash';
import {NavLink} from 'react-router-dom';
import { Message } from 'semantic-ui-react';
import Loading from '../helpers/loading';
import Table from '../common/table';
import Product from '../../requestor/product';
import connectApi from '../api-wrapper';
import {combineOptions} from '../../selectors/options';
import Order from '../common/order';
import { listExtender } from '../common/helperFunctions';

class DynamicTable extends Component {

  fields = {
    id: "Id",
    name: "Name",
    year: "Year",
    theme: "Theme",
    department: "Department",
    vendor_code: "Vendor Code",
    category: "Category",
    color: "Color",
    gender: "Gender",
    age: "Age"
  }

  state = {
    list: [],
    cities: {}, 
    countries: {},
    rowIndex: -1,
    loading: false,
    errors: null
  }
  constructor(props){
    super(props);
  }

  backY = 0;
  backX = 0;
  offset = 0;
  count = 0;

  onScroll = async ({valueY, valueX, height}) => {
      try{
        const { products } = this.props.store;
        const combinedOpt = combineOptions(this.props.store, 'products');
        if(this.state.loading)
        return;
        // console.log('async', valueY / height > 0.85, valueY > this.backY, this.offset < products.count);
        if(valueY / height > 0.9 && valueY > this.backY && this.offset + combinedOpt.limit < this.count) {
          this.setState({loading: true}, async () => {
              this.offset += combinedOpt.limit;
              const data = await Product.list({
                  ...combinedOpt,
                  offset: this.offset
              }).then( data => data.results );
              // console.log("data", data);
              this.setState(({list}) => ({list: list.concat(data), loading: false}));        
          });
        }
      }catch(e){
        console.log(e);
      }
    this.backY = valueY;
  }

  async onChange(props, prevProps){
    const combinedOpt = combineOptions(props.store, 'products'),
    prevCombinedOpt = combineOptions(prevProps.store, 'products'),
    isEqual = _.isEqual(combinedOpt, prevCombinedOpt),
    {getApi} = this.props;
    
    if(!isEqual){
      this.setState({options: combinedOpt, loading: true}, async () => {
        const products = await getApi("product").run("list", this.state.options);

        this.setState({
          list: products.results,
          loading: false
        });
      });
    }
  }

  async componentDidMount(){
    const {getApi} = this.props;

    try{
      this.setState({ loading: true });

      const list = await getApi('product').run('list', combineOptions(this.props.store)),
      themes = await getApi('product').run('getProductThemes'),
      categories = await getApi('product').run('getProductsCategories'),
      colors = await getApi('product').run('getProductColors');
      
      listExtender(list.results, { theme: themes.results, color: colors.results, category: categories.results });

      this.setState({ 
        list: list.results,
        loading: false
      });
    }catch(e){
      console.log(e);
      this.setState({ errors: 'Could not get list' });
    }
  }
  componentDidUpdate(prevProps){
    this.onChange(this.props, prevProps);
  }

  render(){
    if(!this.state.loading){
        return (
          <div style={{position: "relative"}}>
            {this.state.errors && <Message color='red'>{this.state.errors}</Message>}
            <Table 
              fields={this.fields} 
              data={this.state.list.length === 0 ? 'No items were found' : this.state.list} 
              cell={(value, name) => name === "id" ? <NavLink to={`/products/view/${value}`}>{value}</NavLink> : value} 
              header={(name, title) => <Order name={name} title={title} />} 
              fixed={2} height={600} onScroll={this.onScroll} />
        </div>
      );
    }else{
      return <Loading style={{position: "absolute", left: "45%", top: "45%", display: "inline-block"}} />;
    }
  }
};

export default connectApi(DynamicTable);