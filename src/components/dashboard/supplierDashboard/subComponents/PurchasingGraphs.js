import React,{Component} from 'react';

export default class PurchasingGraphs extends Component {
  
  render(){
    return(
      <div className="purchasing__graphs"> 
        <div className="dashboard-info">
          <div className="dashboard-info__item dashboard-info__item_link">
            <div className="dashboard-info__icon bg-yellow"><i className="icon-upload"></i></div>
            <div className="dashboard-info__details">Upload Packing list</div>
          </div>
          <div className="dashboard-info__item dashboard-info__item_link">
            <div className="dashboard-info__icon bg-turquoise"><i className="icon-messages"></i></div>
            <div className="dashboard-info__details">Connect with buyer</div>
          </div>
          <div className="dashboard-info__item dashboard-info__item_link">
            <div className="dashboard-info__icon bg-purple"><i className="icon-bill"></i></div>
            <div className="dashboard-info__details dashboard-info__details_1">Upload Proforma Invoice / Confirm&nbsp;Order</div>
          </div>
          <div className="dashboard-info__item dashboard-info__item_link">
            <div className="dashboard-info__icon bg-aquamarine"><i className="icon-instruction"></i></div>
            <div className="dashboard-info__details">View packing instructions</div>
          </div>
          <div className="dashboard-info__item">
            <div className="dashboard-info__icon bg-red"><i className="icon-warning"></i></div>
            <div className="dashboard-info__details dashboard-info__details_big">
              <div className="dasboard-text_strong">There is a quotation in process</div>
            </div>
          </div>
          <div className="dashboard-info__item">
            <div className="dashboard-info__icon bg-red"><i className="icon-warning"></i></div>
            <div className="dashboard-info__details dashboard-info__details_big">
              <div className="dasboard-text_strong">Upload your prices:</div>
              <div className="upload-buttons">
                <span className="btn btn2 btn-upload">Use online form</span>
                <span className="upload-diveder-text">or</span>
                <span className="variant-upload">
                  <span className="btn btn2 btn-upload upload-file-btn">Download Excel file<input type="file" className="file-hidden" /></span>
                  <span className="btn btn2 btn-upload upload-file-btn">Upload completed file<input type="file" className="file-hidden" /></span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-tabs dashboard-tabs_supliers">
          <div className="dashboard-nav">
            <span className="dashboard-nav__link selected">price level</span>
            <span className="dashboard-nav__link">order quantity</span>
            <span className="dashboard-nav__link">assortments</span>
            <span className="dashboard-nav__link">summary</span>
          </div>
          <div className="window">
            <div className="window-head window-head_single">
              <div className="window-btns">
                <a href="#" className="window-btn window-btn_refresh"><i className="icon-refresh"></i></a>
                <a href="#" className="window-btn window-btn_hide"><i className="icon-angle-down"></i></a>
                <a href="#" className="window-btn window-btn_close"><i className="icon-close"></i></a>
              </div>
            </div>
            <div className="window-content">
              <div className="graph purchasing-graph"><img src="img/graph3.jpg" alt="" /></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}