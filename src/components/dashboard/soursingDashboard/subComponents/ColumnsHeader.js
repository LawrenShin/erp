import React,{Component} from 'react';
import styled from 'styled-components';

const TableTitle = styled.div`
  font-size: 10px;
  font-weight: 400;
  color: #658292;  
  font-family: Lato, arial, sans-serif;

  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  
  div{
    padding-left: 5px;
  }
  div:first-child{
    flex-basis: 60%;
  }
  div:nth-child(2){
    flex-basis: 20%;
    text-align: center;
  }
  div:nth-child(3){
    text-align: center;
    flex-basis: 20%;
  }
`;

const ColumnsHeader = (props) => (
  <TableTitle>
    <div>Supplier</div>
    <div>Total amount,pcs</div>
    <div>Total order amount, USD</div>
  </TableTitle>
);
export default ColumnsHeader;