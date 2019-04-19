import React,{Component} from 'react';
import moment from 'moment';

export default class WeeklyPaymentsComponent extends Component{
  state = {
    firstDay: '',
    secondDate: '',
    weeklyPayments: ''
  }

  componentDidMount(){
    const {week_dates_range, USD} = this.props.data;
    const firstDay = moment(week_dates_range[0]).format('DD'),
    secondDate = moment(week_dates_range[1]).format('DD MMM, YYYY');
    this.setState({ firstDay, secondDate, weeklyPayments: `$ ${USD}` });
  }

  render(){
    return(
      <div className="info-msg__content">
        <div className="info-msg__head">
          <div className="info-msg__title">Weekly payments</div>
          <div className="date">
            <div className="date-val">{this.state.firstDay}-{this.state.secondDate}</div>
            <i className="icon-supplie-history"></i>
          </div>
        </div>
        <div className="info-msg__price">{this.state.weeklyPayments}</div>
      </div>
    );
  }
}