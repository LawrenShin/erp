import React,{Component} from 'react';
import ColumnsHeader from './ColumnsHeader';
import TableRows from './TableRows';
import Loading from '../../../helpers/loading';

const warning = () =>(
    <div class="warning">
      <i class="warning__icon icon-warning"></i>
      <div class="warning__text">do not forget to change status after first invoice</div>
  </div>
);

class Content extends Component {
  state = { tableType: this.props.tableTitle === 'TOP 30 SUPPLIERS' ? 'top30' : 'test' };

  render(){
    if(this.props.list){
      return (
        <>
          {this.props.tableTitle === 'TOP 30 SUPPLIERS' ? <ColumnsHeader /> : warning()}
          <TableRows rows={this.props.list.data} tableType={this.state.tableType} />
        </>
      )
    }else{
      return <Loading />;
    }
  }
}

export default Content;