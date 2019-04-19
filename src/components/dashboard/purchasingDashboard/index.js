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
          <div class="flex-block purchasing__flex-block">
            <div class="statuses">
              {this.state.statuses.map(status => <Status title={status} />)}
            </div>
            {/* charts */}
            <div class="purchasing__graphs">
              <div class="window">
                <div class="window-head">
                  <div class="window-title">
                    <i class="window-title__icon icon-analytics"></i>
                    NLG capacity
                  </div>
                  <div class="window-btns">
                    <a href="#" class="window-btn window-btn_refresh"><i class="icon-refresh"></i></a>
                    <a href="#" class="window-btn window-btn_hide"><i class="icon-angle-down"></i></a>
                    <a href="#" class="window-btn window-btn_close"><i class="icon-close"></i></a>
                  </div>
                </div>
                <div class="window-content">
                  <div class="graph purchasing-graph"><img src={graph3} alt=""/></div>
                </div>
              </div>
              <div class="window">
                <div class="window-head">
                  <div class="window-title">
                    <i class="window-title__icon icon-analytics"></i>
                    Quotation analytics
                  </div>
                  <div class="window-btns">
                    <a href="#" class="window-btn window-btn_refresh"><i class="icon-refresh"></i></a>
                    <a href="#" class="window-btn window-btn_hide"><i class="icon-angle-down"></i></a>
                    <a href="#" class="window-btn window-btn_close"><i class="icon-close"></i></a>
                  </div>
                </div>
                <div class="window-content">
                  <div class="graph purchasing-graph-2"><img src={graph4} alt=""/></div>
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