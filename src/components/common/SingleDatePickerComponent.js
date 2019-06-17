import React, { Component } from 'react';

import moment from 'moment';
import 'react-dates/initialize';
//import 'react-dates/lib/css/_datepicker.css';
import '../../css/suppliers/create/forms/react_dates_overrides.css';
import { SingleDatePicker } from 'react-dates';

  class SingleDatePickerComponent extends Component{
    state = { calendarFocused: null, date: moment() };
    
    changeFocus = (e) => this.setState({ calendarFocused: e !== undefined ? e : !this.state.calendarFocused });
    handleDateChange = (date) => this.props.saveDate(moment(date).format('DD/MM/YYYY'));

    
    render(){
      const date = this.props.date || this.state.date;

      if(this.props.simple) {
        return(
          <>
            <SingleDatePicker 
              // isDayBlocked={day => this.props.twoWeeksCheck(day)}
              date={ moment(date, 'DD/MM/YYYY') } 
              displayFormat="DD/MM/YYYY"
              onDateChange={date => this.handleDateChange(date)}
              focused={this.state.calendarFocused}
              onFocusChange={({focused}) => this.changeFocus(focused)}
              id='datePickerQ'
              styles={{'z-index': '1000'}}
              numberOfMonths={1}
              openDirection={this.props.openDirection || 'up'}
            />
          </>
        );  
      }
      return(
        <React.Fragment>
          <div className="form-box__item">
            <div className="box-field">
                <span className={`box-field__label ${this.props.required}`}><i className="icon-supplie-history" style={{marginRight: 3}}></i>Select payment start date</span>
                <SingleDatePicker 
                  date={ moment(date, 'DD/MM/YYYY') } 
                  displayFormat="DD/MM/YYYY"
                  onDateChange={date => this.handleDateChange(date)}
                  focused={this.state.calendarFocused}
                  onFocusChange={({focused}) => this.changeFocus(focused)}
                  id='datePicker'
                  styles={{'z-index': '1000'}}
                  openDirection='up'
                />       
            </div>
          </div>
          
        </React.Fragment>
      );
    }
  }

export default SingleDatePickerComponent;