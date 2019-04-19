import React,{Component} from 'react';
import uuid from 'uuid';
import {Table, Column, Cell} from 'fixed-data-table-2';
import {NavLink} from 'react-router-dom';

class FilesTable extends Component{
  renderFileCell = (file) => {
    return(
      <div className="ataches-list__item" key={uuid()}>
        <NavLink to="messages" className="ataches-list__link">
          <div className="ataches-list__img">
            <i className="icon-zip"></i>
          </div>
          <div className="ataches-list__title">{file.documentName}</div>
          <div className="ataches-list__subtitle">{file.supplier}</div>
          <div className="ataches-list__date">{file.date}</div>
        </NavLink>
      </div>
    );
  }

  render(){
    const fakeArr = this.props.fakeArr, columnWidth = 200;

    if(this.props.layout === 'list'){
      return(
        <div>

        </div>
      );
    }else{
      return(
        <div className="ataches-list">
          {fakeArr.map(file => this.renderFileCell(file))}
        </div>
      );
    }
  }
}

export default FilesTable;
{/* <Table
  width={this.props.width}
  rowsCount={fakeArr.length} 
  rowHeight={30} 
  showScrollbarX={false}
  headerHeight={25}
  height={this.props.height}>
    <Column 
      columnKey={"type"}
      fixed={true}
      header={<Cell><span><i className="icon-arrow-dowble"></i>Type</span></Cell>}
      cell={({rowIndex, width, height}) => (
        <Cell
          width={width}
          height={height}
          >
          <NavLink to={``}>{fakeArr[rowIndex].type}</NavLink>
        </Cell>
      )}
      width={columnWidth}
    />
    <Column 
      columnKey={"documentName"}
      fixed={true}
      header={<Cell><span><i className="icon-arrow-dowble"></i>Document name</span></Cell>}
      cell={({rowIndex, width, height}) => (
        <Cell
          width={width}
          height={height}
          >
          <NavLink to={``}>{fakeArr[rowIndex].documentName}</NavLink>
        </Cell>
      )}
      width={columnWidth}
    />
    <Column 
      columnKey={"supplier"}
      fixed={true}
      header={<Cell><span><i className="icon-arrow-dowble"></i>Supplier</span></Cell>}
      cell={({rowIndex, width, height}) => (
        <Cell
          width={width}
          height={height}
          >
          <NavLink to={``}>{fakeArr[rowIndex].supplier}</NavLink>
        </Cell>
      )}
      width={columnWidth}
    />
    <Column 
      columnKey={"date"}
      fixed={true}
      header={<Cell><span><i className="icon-arrow-dowble"></i>Date</span></Cell>}
      cell={({rowIndex, width, height}) => (
        <Cell
          width={width}
          height={height}
          >
          <NavLink to={``}>{fakeArr[rowIndex].date}</NavLink>
        </Cell>
      )}
      width={columnWidth}
    />
  </Table> */}