import React,{Component} from 'react';
import Header from '../Header';
import Status from './subComponents/Status';
import graph3 from '../../../assets/img/graph3.jpg';
import graph4 from '../../../assets/img/graph4.jpg';

class PurchasingDashboard extends Component{
  state = { statuses: ['PROTO SAMPLE STATUS', 'SECOND SAMPLE STATUS', 'PPS STATUS', 'FRI STATUS', 'W/H DATE STATUS'] };

  render(){
    return(
      <>
        <Header title='Dashboard' subTitle='PURCHASIGN MANAGER' />
        <div className="purchasing">
          <div className="flex-block purchasing__flex-block">
            <div className="statuses">
              {this.state.statuses.map(status => <Status title={status} />)}
            </div>
            {/* charts */}
            <div className="purchasing__graphs">
              <div className="window">
                <div className="window-head">
                  <div className="window-title">
                    <i className="window-title__icon icon-analytics"></i>
                    NLG capacity
                  </div>
                  <div className="window-btns">
                    <a href="#" className="window-btn window-btn_refresh"><i className="icon-refresh"></i></a>
                    <a href="#" className="window-btn window-btn_hide"><i className="icon-angle-down"></i></a>
                    <a href="#" className="window-btn window-btn_close"><i className="icon-close"></i></a>
                  </div>
                </div>
                <div className="window-content">
                  <div className="graph purchasing-graph"><img src={graph3} alt=""/></div>
                </div>
              </div>
              <div className="window">
                <div className="window-head">
                  <div className="window-title">
                    <i className="window-title__icon icon-analytics"></i>
                    Quotation analytics
                  </div>
                  <div className="window-btns">
                    <a href="#" className="window-btn window-btn_refresh"><i className="icon-refresh"></i></a>
                    <a href="#" className="window-btn window-btn_hide"><i className="icon-angle-down"></i></a>
                    <a href="#" className="window-btn window-btn_close"><i className="icon-close"></i></a>
                  </div>
                </div>
                <div className="window-content">
                  <div className="graph purchasing-graph-2"><img src={graph4} alt=""/></div>
                </div>
              </div>
            </div>
            {/* charts */}
          </div>
        </div>
      </>
    )
  }
}

export default PurchasingDashboard;