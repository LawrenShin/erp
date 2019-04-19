import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactCountryFlag from 'react-country-flag';
import { NavLink } from 'react-router-dom';
import Loading from '../../helpers/loading';
import {Table, Column, Cell} from 'fixed-data-table-2';

class List extends Component{

  render(){
    if(this.props.list.state === "loading"){
      return <Loading/>;
    }
    if(this.props.list.state === "error"){
      return <h1>error: {this.props.list.err}</h1>;
    }
    
    return (
      this.props.list.data.length ?
      <div className="table-supplier-list">
        <Table 
          width={this.props.width}
          rowsCount={this.props.list.data.length} 
          rowHeight={78} 
          showScrollbarX={true}
          headerHeight={50}
          height={this.props.height}
        >          
          {
            Object.keys(this.props.list.data[0]).map((prop, i) => 
              <Column 
                fixed={i<2}
                key={this.props.headers[i]}
                columnKey={this.props.headers[i]}
                header={<Cell><span><i className="icon-arrow-dowble"></i>{this.props.headers[i]}</span></Cell>}
                cell={({rowIndex, width, height}) => (
                  <Cell
                    width={width}
                    height={height}
                    >
                    {
                      (() => {
                        const item = this.props.list.data[rowIndex];
                        return <span>{item[prop]}</span>;
                      })()                      
                    }
                  </Cell>
                )}
                width={150}
              />
            )
          }
        </Table>        
        
      </div>  
      :
      <p>Empty</p>    
    );
  }
}

export default List;
