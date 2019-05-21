import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Table as DataTable, Column, Cell} from 'fixed-data-table-2';
import Checkbox from '../controls/checkbox';

class Table extends Component {
  render(){
    return (
      <div className="table-supplier-list">
        <DataTable 
          width={this.props.width}
          rowsCount={3} 
          rowHeight={78} 
          showScrollbarX={true}
          headerHeight={50}
          height={this.props.height}          
        >
          
            <Column 
              key={`Style_name`}
              columnKey={`Style_name`}
              header={<Cell><span><i className="icon-arrow-dowble"></i>Style name</span></Cell>}
              cell={({rowIndex, width, height}) => (
                <Cell
                  width={width}
                  height={height}
                  >
                  Aisha
                </Cell>
              )}
              width={150}
            />

            <Column 
                key={`Group`}
                columnKey={`Group`}
                header={<Cell><span><i className="icon-arrow-dowble"></i>Group</span></Cell>}
                cell={({rowIndex, width, height}) => (
                  <Cell
                    width={width}
                    height={height}
                    >
                    Jersy
                  </Cell>
                )}
                width={150}
              />      

            <Column 
                key={`Shell_fabric`}
                columnKey={`Shell_fabric`}
                header={<Cell><span><i className="icon-arrow-dowble"></i>Shell fabric</span></Cell>}
                cell={({rowIndex, width, height}) => (
                  <Cell
                    width={width}
                    height={height}
                    >
                    Cotton
                  </Cell>
                )}
                width={150}
              />         

            <Column 
                key={`Color`}
                columnKey={`Color`}
                header={<Cell><span><i className="icon-arrow-dowble"></i>Color</span></Cell>}
                cell={({rowIndex, width, height}) => (
                  <Cell
                    width={width}
                    height={height}
                    >
                    Black
                  </Cell>
                )}
                width={150}
              />      

            <Column 
                key={`1234567890`}
                columnKey={`1234567890`}
                header={<Cell><span><i className="icon-arrow-dowble"></i>1234567890</span></Cell>}
                cell={({rowIndex, width, height}) => (
                <Cell
                    width={width}
                    height={height}
                    >        
                    <Checkbox />            
                </Cell>
                )}
                width={150}
            /> 

            <Column 
                key={`1234567890_1`}
                columnKey={`1234567890_1`}
                header={<Cell><span><i className="icon-arrow-dowble"></i>1234567890</span></Cell>}
                cell={({rowIndex, width, height}) => (
                <Cell
                    width={width}
                    height={height}
                    >                    
                    <Checkbox />            
                </Cell>                                    
                )}
                width={150}
            />   

            <Column 
                key={`1234567890_2`}
                columnKey={`1234567890_2`}
                header={<Cell><span><i className="icon-arrow-dowble"></i><span class="tooltip-wrap">
                1234567890
                <span class="tooltip-th">ANHUI GARMENTS IMP.&amp;EXP. CO., LTD</span>
            </span>
            <span class="products-count">4 products</span>		</span></Cell>}
                cell={({rowIndex, width, height}) => (
                <Cell
                    width={width}
                    height={height}
                    >                           
                    <Checkbox />               																		        
                </Cell>
                )}
                width={150}
            />  

            <Column 
                key={`1234567890_3`}
                columnKey={`1234567890_3`}
                header={<Cell><span><i className="icon-arrow-dowble"></i><span class="tooltip-wrap">
                1234567890
                <span class="tooltip-th">ANHUI GARMENTS IMP.&amp;EXP. CO., LTD</span>
            </span>
            <span class="products-count">4 products</span>		</span></Cell>}
                cell={({rowIndex, width, height}) => (
                <Cell
                    width={width}
                    height={height}
                    >                           
                    <Checkbox />               																		        
                </Cell>
                )}
                width={150}
            />  

            <Column 
                key={`1234567890_4`}
                columnKey={`1234567890_4`}
                header={<Cell><span><i className="icon-arrow-dowble"></i><span class="tooltip-wrap">
                1234567890
                <span class="tooltip-th">ANHUI GARMENTS IMP.&amp;EXP. CO., LTD</span>
            </span>
            <span class="products-count">4 products</span>		</span></Cell>}
                cell={({rowIndex, width, height}) => (
                <Cell
                    width={width}
                    height={height}
                    >
                    <Checkbox />            																        
                </Cell>
                )}
                width={150}
            />  

            <Column 
                key={`1234567890_5`}
                columnKey={`1234567890_5`}
                header={<Cell><span><i className="icon-arrow-dowble"></i><span class="tooltip-wrap">
                1234567890
                <span class="tooltip-th">ANHUI GARMENTS IMP.&amp;EXP. CO., LTD</span>
            </span>
            <span class="products-count">4 products</span>		</span></Cell>}
                cell={({rowIndex, width, height}) => (
                <Cell
                    width={width}
                    height={height}
                    >                           
                    <Checkbox />            													        
                </Cell>
                )}
                width={150}
            />

            <Column 
                key={`1234567890_6`}
                columnKey={`1234567890_6`}
                header={<Cell><span><i className="icon-arrow-dowble"></i><span class="tooltip-wrap">
                1234567890
                <span class="tooltip-th">ANHUI GARMENTS IMP.&amp;EXP. CO., LTD</span>
            </span>
            <span class="products-count">4 products</span>		</span></Cell>}
                cell={({rowIndex, width, height}) => (
                <Cell
                    width={width}
                    height={height}
                    >                           
                    <Checkbox />            																	        
                </Cell>
                )}
                width={150}
            />  
                        
        </DataTable>
      </div>
    );    
  }
};

export default Table;
