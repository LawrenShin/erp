import React,{Component} from 'react';
import {connect} from 'react-redux';

import {addOptions} from '../../actions/suppliers.js';
import styles from '../../css/suppliers/filters.module.css';
import 'rc-slider/assets/index.css';
import { relative } from 'path';

class RatingDropdown extends Component{
  state = { rangeVisibility: false, values: { from: 0, to: 100 } };

  handleClickRating = () => {
    this.setState({ rangeVisibility: !this.state.rangeVisibility });
  };
  handleRatingChanges = (value) => {
    this.setState({ values: { from: value[0], to: value[1] } });
    value = { from: value[0], to: value[1] };
    let changes = {placeholder: this.props.type, value};
    this.props.dispatch(addOptions(changes));
  }

  ref = React.createRef();

  handleClickOutside = (e) => {
    if(e.target.closest(".filters-box__item") !== this.ref.current && this.state.rangeVisibility){
      this.handleClickRating();
    }
  }

  componentDidMount(){
    document.body.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount(){
    document.body.removeEventListener("click", this.handleClickOutside);
  }

  render(){
    const Slider = require('rc-slider');
    const createSliderWithToolTip = Slider.createSliderWithTooltip;
    const Range = createSliderWithToolTip(Slider.Range);

    const RangeStyle = [styles.rating, this.state.rangeVisibility ? '' : styles.hide].join(' ');
    let name = '';
    switch(this.props.type){
      case 'general_rating': 
        name = 'rating';break;
      case 'financial_rating': 
        name = 'financial rating';break;
      case 'reliability_rating': 
        name = 'reliability rating';break;
    }
    return(
      <div className="filters-box__item" ref={this.ref}>
					<div className="filters-elem select-elem select-elem select-elem_multiple">
            <div className="select-elem__text" style={{position: "relative", cursor: "pointer"}} onClick={this.handleClickRating}>
              {name[0].toUpperCase() + name.substr(1)}
              <i aria-hidden="true" className="dropdown icon" style={{position: "absolute", right: 0}}></i>
            </div>
            <div className={RangeStyle} style={{zIndex: 99999, position: "relative"}}>
              <Range min={0} max={100}
                defaultValue={[ this.props.ratings[this.props.type].from, this.props.ratings[this.props.type].to ]}
                tipFormatter={value => `${value}%`} 
                handleStyle={{border: 'none', boxShadow: '0 0 5px black'}}
                onAfterChange={this.handleRatingChanges} />
            </div>
          </div>
    </div>  
    );
  }
}

const mapStateToProps = (state) => ({
  ratings: state.suppliers.options.ratings
});

export default connect(mapStateToProps)(RatingDropdown);