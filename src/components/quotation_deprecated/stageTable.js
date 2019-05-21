import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Table as DataTable, Column, Cell} from 'fixed-data-table-2';

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
                key={`Target_price`}
                columnKey={`Target_price`}
                header={<Cell><span><i className="icon-arrow-dowble"></i>Target price</span></Cell>}
                cell={({rowIndex, width, height}) => (
                  <Cell
                    width={width}
                    height={height}
                    >
                    $5
                  </Cell>
                )}
                width={150}
            />      

            {((step) => {
                switch(step){
                    case '2':
                        return [
                            <Column 
                                key={`1234567890`}
                                columnKey={`1234567890`}
                                header={<Cell><span><i className="icon-arrow-dowble"></i>1234567890</span></Cell>}
                                cell={({rowIndex, width, height}) => (
                                <Cell
                                    width={width}
                                    height={height}
                                    >        
                                    $7            
                                </Cell>
                                )}
                                width={150}
                            />, 

                            <Column 
                                key={`1234567890_1`}
                                columnKey={`1234567890_1`}
                                header={<Cell><span><i className="icon-arrow-dowble"></i>1234567890</span></Cell>}
                                cell={({rowIndex, width, height}) => (
                                <Cell
                                    width={width}
                                    height={height}
                                    >                    
                                    <div class="status-stage status-stage_1">$5</div>
                                </Cell>                                    
                                )}
                                width={150}
                            />,   

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
                                    $8    																		        
                                </Cell>
                                )}
                                width={150}
                            />,  

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
                                    $8    																		        
                                </Cell>
                                )}
                                width={150}
                            />,  

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
                                    $5																        
                                </Cell>
                                )}
                                width={150}
                            />,  

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
                                   $8														        
                                </Cell>
                                )}
                                width={150}
                            />,  

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
                                    $8																	        
                                </Cell>
                                )}
                                width={150}
                            />  
                        ]
                    break;
                    case '1':
                    return [
                        <Column 
                            key={`1234567890`}
                            columnKey={`1234567890`}
                            header={<Cell><span><i className="icon-arrow-dowble"></i>1234567890</span></Cell>}
                            cell={({rowIndex, width, height}) => (
                            <Cell
                                width={width}
                                height={height}
                                >        
                                          
                            </Cell>
                            )}
                            width={150}
                        />, 

                        <Column 
                            key={`1234567890_1`}
                            columnKey={`1234567890_1`}
                            header={<Cell><span><i className="icon-arrow-dowble"></i>1234567890</span></Cell>}
                            cell={({rowIndex, width, height}) => (
                            <Cell
                                width={width}
                                height={height}
                                >                    
                                
                            </Cell>                                    
                            )}
                            width={150}
                        />,   

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
                                $7																        
                            </Cell>
                            )}
                            width={150}
                        />,  

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
                                Cancelled   																		        
                            </Cell>
                            )}
                            width={150}
                        />,  

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
                                <div class="status-stage status-stage_remind">
                                    <span class="btn-remind">Remind</span>
                                </div>																        
                            </Cell>
                            )}
                            width={150}
                        />,  

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
                               <div class="status-stage status-stage_low">$5</div>														        
                            </Cell>
                            )}
                            width={150}
                        />,  

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
                                $8																	        
                            </Cell>
                            )}
                            width={150}
                        />  
                    ]                    
                    default:
                        return [<Column 
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
                                $7																        
                            </Cell>
                            )}
                            width={150}
                            />];
                    
                }
            })(this.props.step)}
        </DataTable>
      </div>
    );    
  }
};

export default Table;
