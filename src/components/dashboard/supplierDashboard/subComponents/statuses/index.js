import React,{Component} from 'react';

import Status from './Status';

export default class Statuses extends Component {
  state = { statuses: ['Proto sample status', 'Second sample status', 'PPS status', 'FRI status', 'W/H date status'] }
  render(){
    return(
      <div className="statuses">
        {this.state.statuses.map(statusTitle => <Status title={statusTitle} />)}
      </div>
    );
  }
}