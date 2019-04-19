import React,{Component} from 'react';
import TableHeader from './TableHeader';
import TableSearcher from './TableSearcher';
import Content from './Content';

class RatingTable extends Component{

  render(){
    return(
      <div className="window-box">
        <div className="window">
          <TableHeader title={this.props.tableTitle} />
          <div className="window-content">
            <div className="window__form">
              {this.props.tableTitle === 'TOP 30 SUPPLIERS' && <TableSearcher />}
            </div>
            
            <div className="sourcing__top-table">
              <div className="fixedDataTableLayout_main public_fixedDataTable_main" style={{width: '100%'}}>
                <div className="fixedDataTableLayout_rowsContainer" style={{width: '100%'}}>
                  <Content tableTitle={this.props.tableTitle} list={this.props.list} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default RatingTable;