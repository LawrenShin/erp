import React,{Component} from 'react';

import Header from '../Header';
import PurchasingGraphs from './subComponents/PurchasingGraphs';
import Statuses from './subComponents/statuses';

export default class SupplierDashboard extends Component{

  render(){
    return(
      <>
        <Header title='Dashboard' subTitle='PURCHASIGN MANAGER' />
        <div class="purchasing">
          <div class="flex-block purchasing__flex-block">
            <PurchasingGraphs />
            <Statuses />
          </div>
        </div>
      </>
    );
  }
}