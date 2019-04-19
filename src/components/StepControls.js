import React,{Component} from 'react';
import {connect} from 'react-redux';

const StepControls = (props) => {
  return (
    <div className="steps-nav">
      <span onClick={props.handleClick} className="steps-nav__arrow"><i className="icon-next"></i></span>	
    </div>
  );
}

const mapStateToProps = (state) => ({
  step: state.createSupplier.step
})

export default connect(mapStateToProps)(StepControls);