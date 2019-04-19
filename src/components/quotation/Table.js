import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Table as DataTable, Column, Cell} from 'fixed-data-table-2';

class Table extends Component {
  render(){
    const {list} = this.props;

    if(typeof this.props.list !== 'string'){
    return (
      list.length ?
      <div className="table-supplier-list">
        <DataTable 
          width={this.props.width}
          rowsCount={list.length} 
          rowHeight={78} 
          showScrollbarX={true}
          headerHeight={50}
          height={this.props.height}          
        >
          {
            Object.keys(list[0]).map((prop, i) => 
              <Column 
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
                        const item = list[rowIndex];

                        if(item[prop] !== null){
                          if(item[prop].length > 10) item[prop] = item[prop].slice(0, 15);
                          return !i ? <NavLink to={`/quotations/view/${item[prop]}`}>{item[prop]}</NavLink> : <span>{item[prop]}</span>;
                        }else{
                          return <span></span>;
                        }
                      })()                      
                    }
                  </Cell>
                )}
                width={150}
              />
            )
          }
        </DataTable>
      </div>
      :
      <h1>No data were found</h1>      
    );
    }else{
      return (
        <h1>{this.props.list}</h1>
      );
    }
  }
};

export default Table;
