import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Table as DataTable, Column, Cell} from 'fixed-data-table-2';
import Pagination from '../Pagination.js';
import styled from 'styled-components';

class Table extends Component {
  static defaultProps = {
    rowHeight: 78,
    headerHeight: 50,
    colWidth: 150
  }

  render(){
    const {list} = this.props;

    if(typeof this.props.list !== 'string'){
    return (
      list.length ?
      <>
        <DataTable 
          className={this.props.className}
          width={this.props.width}
          rowsCount={list.length} 
          rowHeight={this.props.rowHeight} 
          showScrollbarX={true}
          headerHeight={this.props.headerHeight}
          height={this.props.height}
        >
          {
            Object.keys(list[0]).map((prop, i) => 
              <Column 
                fixed={!i}
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
                          return <span data-col-index={`${i}`}><span title={item[prop]}>{item[prop]}</span></span>;
                        }else{
                          return <span data-col-index={`${i}`}></span>;
                        }
                      })()                      
                    }
                  </Cell>
                )}
                width={this.props.colWidth}
              />
            )
          }
        </DataTable>
        {this.props.updateOptions && this.props.paginationData ? 
        <Pagination updateOptions={this.props.updateOptions} paginationData={this.props.paginationData} />     
        :
        null
        }
      </>
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

export default styled(Table)`
  .public_fixedDataTable_bodyRow {
    height: ${p => `${(p.rowHeight || 78)-8}px !important`};
  }
  .financial-rating__table .public_fixedDataTableCell_cellContent{
    display: flex;
  }
  span{
    justify-content: center;
    display: flex;       

    span{
      display: block;
      white-space: nowrap; 
      text-overflow: ellipsis;
      overflow: hidden; 
      max-width: ${p => `${(p.colWidth || 150)-16}px`};
    }
  }  
  [data-col-index="0"]{
    justify-content: flex-start;
  }  
  ${({hideVScrollbar}) => hideVScrollbar ? `.fixedDataTableLayout_horizontalScrollbar {
    display: none !important;
  }` : ''
  }
  .ScrollbarLayout_main.ScrollbarLayout_mainVertical.public_Scrollbar_main{
    display: block !important;
  }
`;
