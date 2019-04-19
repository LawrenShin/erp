import React,{Component} from 'react';
import WriteMessage from './WriteMessage';
import ReadMessage from './ReadMessage';

export default (props) => {
  console.log(props);
  if(props.id){
    return(
      <WriteMessage id={props.id} />
    );
  }
}