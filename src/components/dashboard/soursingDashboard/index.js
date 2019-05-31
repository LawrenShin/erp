import React,{Component} from 'react';
import {connect} from 'react-redux';

import {createRequestAction} from '../../../actions';
import Header from '../Header';
import RatingTable from './subComponents/RatingTable';
import LinearChartContainer from './subComponents/LinearChartContainer';
import Loading from '../../helpers/loading';

class SourcingDashboard extends Component{

  async componentDidMount(){
    await this.props.getTop30Suppliers();
    await this.props.getTestSuppliers();
    await this.props.getNlgCapacityChart();
  }

  render(){
    return(
      <>
        <Header 
          title='Dashboard' 
          subTitle='SOURCING MANAGER' />
        {this.props.nlgCapacityChart.state === 'loaded' ? <LinearChartContainer 
          fromServer={this.props.nlgCapacityChart.data} />
        :
        <Loading />}
        <div className="flex-block sourcing__flex-block">
          <RatingTable 
            tableTitle='TOP 30 SUPPLIERS' 
            list={this.props.top30} />
          <RatingTable 
            tableTitle='SUPPLIERS WITH TEST STATUS' 
            list={this.props.testSuppliers} />
        </div>
      </>
    )
  }
}

const mapStateToProps = ({ dashboard }) => ({
  top30: dashboard.top30,
  testSuppliers: dashboard.testSuppliers,
  nlgCapacityChart: dashboard.nlgCapacityChart
});

export default connect(mapStateToProps, (dispatch) => ({
  getTestSuppliers: () => dispatch(createRequestAction('dashboard', 'getTestSuppliers')),
  getTop30Suppliers: (name) => dispatch(createRequestAction('dashboard', 'getTop30Suppliers', name)),
  getNlgCapacityChart: () => dispatch(createRequestAction('dashboard', 'getNlgCapacityChart'))
}))(SourcingDashboard);