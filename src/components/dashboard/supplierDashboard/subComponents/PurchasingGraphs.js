import React,{Component} from 'react';

export default class PurchasingGraphs extends Component {
  
  render(){
    return(
      <div class="purchasing__graphs"> 
        <div class="dashboard-info">
          <div class="dashboard-info__item dashboard-info__item_link">
            <div class="dashboard-info__icon bg-yellow"><i class="icon-upload"></i></div>
            <div class="dashboard-info__details">Upload Packing list</div>
          </div>
          <div class="dashboard-info__item dashboard-info__item_link">
            <div class="dashboard-info__icon bg-turquoise"><i class="icon-messages"></i></div>
            <div class="dashboard-info__details">Connect with buyer</div>
          </div>
          <div class="dashboard-info__item dashboard-info__item_link">
            <div class="dashboard-info__icon bg-purple"><i class="icon-bill"></i></div>
            <div class="dashboard-info__details dashboard-info__details_1">Upload Proforma Invoice / Confirm&nbsp;Order</div>
          </div>
          <div class="dashboard-info__item dashboard-info__item_link">
            <div class="dashboard-info__icon bg-aquamarine"><i class="icon-instruction"></i></div>
            <div class="dashboard-info__details">View packing instructions</div>
          </div>
          <div class="dashboard-info__item">
            <div class="dashboard-info__icon bg-red"><i class="icon-warning"></i></div>
            <div class="dashboard-info__details dashboard-info__details_big">
              <div class="dasboard-text_strong">There is a quotation in process</div>
            </div>
          </div>
          <div class="dashboard-info__item">
            <div class="dashboard-info__icon bg-red"><i class="icon-warning"></i></div>
            <div class="dashboard-info__details dashboard-info__details_big">
              <div class="dasboard-text_strong">Upload your prices:</div>
              <div class="upload-buttons">
                <span class="btn btn2 btn-upload">Use online form</span>
                <span class="upload-diveder-text">or</span>
                <span class="variant-upload">
                  <span class="btn btn2 btn-upload upload-file-btn">Download Excel file<input type="file" class="file-hidden" /></span>
                  <span class="btn btn2 btn-upload upload-file-btn">Upload completed file<input type="file" class="file-hidden" /></span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard-tabs dashboard-tabs_supliers">
          <div class="dashboard-nav">
            <span class="dashboard-nav__link selected">price level</span>
            <span class="dashboard-nav__link">order quantity</span>
            <span class="dashboard-nav__link">assortments</span>
            <span class="dashboard-nav__link">summary</span>
          </div>
          <div class="window">
            <div class="window-head window-head_single">
              <div class="window-btns">
                <a href="#" class="window-btn window-btn_refresh"><i class="icon-refresh"></i></a>
                <a href="#" class="window-btn window-btn_hide"><i class="icon-angle-down"></i></a>
                <a href="#" class="window-btn window-btn_close"><i class="icon-close"></i></a>
              </div>
            </div>
            <div class="window-content">
              <div class="graph purchasing-graph"><img src="img/graph3.jpg" alt="" /></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}