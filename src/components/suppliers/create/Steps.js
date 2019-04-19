import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createAction} from '../../../actions';
import {history} from '../../../routes/history';

const steps = ['GENERAL INFORMATION', 'CONTACTS', 'OPTIONS', 'BANK INFORMATION'];
const icons = ["icon-general-info", "icon-contacts", "icon-options", "icon-accounting"];

class Steps extends Component{

  handleClick = () => {

  }

  render(){
    return(
        <React.Fragment>
          <div className="page-heading page-heading_supplier">	
							<div className="page-heading__title">
								<div className="page-heading__top">
									<h1 className="h1">Create supplier</h1>
								</div>
							</div>
							<div className="page-heading__navs">								
								<div className="card-filters-nav">
									<span style={{cursor: "pointer"}} onClick={this.props.currentStep ? this.props.back: () => history.goBack()} className="card-filters-nav__item card-filters-nav__back">
										<i className="icon-arrow-left"></i>
									</span>
                  {this.props.next ?
                    <span style={{cursor: "pointer"}} onClick={this.props.next} className="card-filters-nav__item card-filters-nav__next">
                      <i className="icon-arrow-left"></i>
                    </span> : ''
                  }                  
								</div>
							</div>
					</div>

          <div className="supplier-steps-navigation">
            <div className="supplier-steps-nav">
            {steps.map((step, index) => (
              this.props.currentStep >= index ?
                <div className="supplier-steps-nav__item complete">
                    <div className="supplier-steps-nav__link">
                    <i className={icons[index]}></i><span className="supplier-steps-nav__title">{step}</span>
                    </div>
                </div>
              :
              <div className="supplier-steps-nav__item"> 
                <div className="supplier-steps-nav__link">
                  <i className={icons[index]}></i><span className="supplier-steps-nav__title">{step}</span>
                </div>
              </div>
            ))}
            </div>
          </div>
        </React.Fragment>
    );
  }
}

export default connect(
  null,
  (dispatch) => ({
    back: () => dispatch(createAction('STEP_BACK'))
  })
)(Steps);
