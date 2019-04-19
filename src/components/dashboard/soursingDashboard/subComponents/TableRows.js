import React,{Component} from 'react';
import styled from 'styled-components';
import uuid from 'uuid'

const RowComponent =  styled.div`
  display: flex;
  justify-content: space-between;
  div:nth-child(1){
    flex-basis: 60%;
  }
  div:nth-child(2){
    flex-basis: 20%;
    text-align: center;
  }
  div:nth-child(3){
    flex-basis: 20%;
    text-align: center;
  }

  background: rgb(248,248,248);
  width: 100%;
  padding: 20px 10px;
  margin-bottom: 5px;
  :hover{
    background: rgb(227, 237, 241);
    transition: all 300ms ease-in;
  }
`;

class TableRows extends Component{

  renderRowTop30 = ({ name, total_amount_pcs, total_order_amount }) => (
    <RowComponent key={uuid()}>
      <div>{name}</div>
      {total_amount_pcs && <div>{total_amount_pcs}</div>}
      {total_order_amount && <div>{total_order_amount}</div>}
    </RowComponent>
  );

  renderRowTest = ({ name }) => <RowComponent><div>{name}</div></RowComponent>;

  render(){
    return(
      <>
        {this.props.tableType === 'top30' ? 
        this.props.rows.map(row => this.renderRowTop30(row)) 
        :
        this.props.rows.map(row => this.renderRowTest(row))}
      </>
    )
  }
}
export default TableRows;