import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactCountryFlag from 'react-country-flag';
import { NavLink } from 'react-router-dom';
import Loading from '../helpers/loading';
import {Table, Column, Cell} from 'fixed-data-table-2';
import Api from '../../requestor/api';
import Common from '../../requestor/common';
import axios from 'axios';
import {createRequestAction} from '../../actions';
import Pagination from '../Pagination';

class List extends Component{
  state = { cities: null, countries: null };

  componentDidMount(){
    if(this.props.categories.state !== "loaded")
      this.props.getCategories();

    Api.all([Common.getCities(), Common.getCountries()]).then(axios.spread((cities, countries) => {
      cities = cities.results;
      countries = countries.results;

      this.setState({ 
          cities, 
          countries
      });
    })).catch((err) => { console.log(err) });
  }

  render(){
    if(this.props.list.state === "loading"){
      return <Loading/>;
    }
    if(this.props.list.state === "error"){
      return <h1>error: {this.props.list.err}</h1>;
    }

    const filteredList = this.props.list.data.filter((item) =>  
      this.props.filterName ? 
      item.name.toLowerCase().indexOf(this.props.filterName.toLowerCase()) !== -1
      : item      
    );

    return (
      filteredList.length ?
      <div className="table-supplier-list">
        <Table 
          width={this.props.width}
          rowsCount={filteredList.length} 
          rowHeight={78} 
          showScrollbarX={true}
          headerHeight={50}
          height={this.props.height}
        >
          {this.props.addToQutation ?
          <Column 
            columnKey={"add"}
            fixed={true}
            header={<Cell></Cell>}
            cell={({rowIndex, width, height}) => (
              <Cell
                width={width}
                height={height}
                >
                <span class="action-quatation action-quatation_add">Add supplier to quatation</span>
              </Cell>
            )}
            width={150}
          />
          : null
          }
          <Column 
            columnKey={"id"}
            fixed={true}
            header={<Cell><span><i className="icon-arrow-dowble"></i>ID</span></Cell>}
            cell={({rowIndex, width, height}) => (
              <Cell
                width={width}
                height={height}
                >
                <NavLink to={`/suppliers/view/${filteredList[rowIndex].id}`}>{filteredList[rowIndex].id}</NavLink>
              </Cell>
            )}
            width={150}
          />
          <Column
            columnKey={"name"}
            fixed={true}
            header={<Cell><span><i className="icon-arrow-dowble"></i>Name</span></Cell>}
            cell={({rowIndex, width, height}) => (
              <Cell
                width={width}
                height={height}
                >
                <div className="col-name">{filteredList[rowIndex].name}</div>
								<span>{filteredList[rowIndex].type === 'FC' ? 'Factory' : 'Agent'}</span>
              </Cell>
            )}
            width={150}
          />
          <Column
            columnKey={"status"}
            header={<Cell>Status</Cell>}
            cell={({rowIndex, width, height}) => (
              <Cell
                width={width}
                height={height}
                >
                {
                filteredList[rowIndex].status !== 'AC' ? 
                  <div className="col-status col-status_inactive">inactive</div> 
                  :
                  <div className="col-status col-status_active">active</div>
                }
              </Cell>
            )}
            width={150}
          />
          <Column
            columnKey={"categories"}
            header={<Cell><span><i className="icon-arrow-dowble"></i>Deal in</span></Cell>}
            cell={({rowIndex, width, height}) => (
              <Cell
                width={width}
                height={height}
                >
                {filteredList[rowIndex].categories ? <span>{
                  filteredList[rowIndex].categories
                    .map( v => {
                      return this.props.categories.data && this.props.categories.data.find(({id}) => v === id).name || v
                    } ).join(', ')}</span> : ''}
              </Cell>
            )}
            width={150}
          />
          <Column
            columnKey={"factory_country"}
            header={<Cell><span><i className="icon-arrow-dowble"></i>Country</span></Cell>}
            cell={({rowIndex, width, height}) => (
              <Cell
                width={width}
                height={height}
                >
                {filteredList[rowIndex].factory_country && this.state.countries ? <ReactCountryFlag code={this.state.countries.find(({id}) => filteredList[rowIndex].factory_country === id).iso.toLowerCase()} svg styleProps={{width: '20px',height: '10px'}} /> : null}
                {filteredList[rowIndex].factory_country && this.state.countries ? <span>{this.state.countries.find(({id}) => filteredList[rowIndex].factory_country === id).name}</span> : null}
              </Cell>
            )}
            width={150}
          />
          <Column
            columnKey={"get_rating"}
            header={<Cell><span><i className="icon-arrow-dowble"></i>Rating</span></Cell>}
            cell={({rowIndex, width, height}) => (
              <Cell
                width={width}
                height={height}
                >
                {filteredList[rowIndex].get_rating ? <span>{filteredList[rowIndex].get_rating}%</span> : null}
              </Cell>
            )}
            width={150}
          />
          <Column
            columnKey={"payment_terms_id"}
            header={<Cell><span><i className="icon-arrow-dowble"></i>Payment Term</span></Cell>}
            cell={({rowIndex, width, height}) => (
              <Cell
                width={width}
                height={height}
                >
                {filteredList[rowIndex].payment_terms_id ? <span>{filteredList[rowIndex].payment_terms_id}</span> : null}
              </Cell>
            )}
            width={150}
          />
          <Column
            columnKey={"get_financial_rating"}
            header={<Cell><span><i className="icon-arrow-dowble"></i>Financial rating</span></Cell>}
            cell={({rowIndex, width, height}) => (
              <Cell
                width={width}
                height={height}
                >
                {filteredList[rowIndex].get_financial_rating ? <span>{filteredList[rowIndex].get_financial_rating}</span> : null}
              </Cell>
            )}
            width={150}
          />
          <Column
            columnKey={"get_reability_rating"}
            header={<Cell><span><i className="icon-arrow-dowble"></i>Reability rating</span></Cell>}
            cell={({rowIndex, width, height}) => (
              <Cell
                width={width}
                height={height}
                >
                {filteredList[rowIndex].get_reability_rating ? <span>{filteredList[rowIndex].get_reability_rating}</span> : null}
              </Cell>
            )}
            width={150}
          />
          <Column
            columnKey={"total_order_usd"}
            header={<Cell><span><i className="icon-arrow-dowble"></i>Tolal order, USD</span></Cell>}
            cell={({rowIndex, width, height}) => (
              <Cell
                width={width}
                height={height}
                >
                {filteredList[rowIndex].total_order_usd ? <span>{filteredList[rowIndex].total_order_usd}</span> : null}
              </Cell>
            )}
            width={150}
          />
          <Column
            columnKey={"total_order_qnty"}
            header={<Cell><span><i className="icon-arrow-dowble"></i>Tolal order, qnty</span></Cell>}
            cell={({rowIndex, width, height}) => (
              <Cell
                width={width}
                height={height}
                >
                {filteredList[rowIndex].total_order_qnty ? <span>{filteredList[rowIndex].total_order_qnty}</span> : null}
              </Cell>
            )}
            width={150}
          />
          <Column
            columnKey={"incoterms_port"}
            header={<Cell><span><i className="icon-arrow-dowble"></i>Incoterms + Port</span></Cell>}
            cell={({rowIndex, width, height}) => (
              <Cell
                width={width}
                height={height}
                >
                {filteredList[rowIndex].incoterms_port ? <span>{filteredList[rowIndex].incoterms_port}</span> : null}     
              </Cell>
            )}
            width={150}
          />
        </Table>
        {
          this.props.updateOptions ?
          <Pagination updateOptions={this.props.updateOptions} paginationData={{...this.props.paginationData, amount: this.props.list.data.count}} />
          : null
        }
        
      </div>  
      :
      <p>Empty</p>    
    );
  }
}

export default connect(
  ({suppliers: {list, options, categories}}) => ({
    list,
    options,
    categories
  }),
  (dispatch) => ({
    getCategories: () => dispatch(createRequestAction("supplier", "getCategories"))
  })
)(List);
