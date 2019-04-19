import React,{Component} from 'react';
import {connect} from 'react-redux';

class ComponentHeader extends Component{
  state = {  };
  
  render(){
    return (
      <div>
        universal
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
});

export default connect(mapStateToProps)(ComponentHeader);