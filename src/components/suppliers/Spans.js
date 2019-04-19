import React,{Component} from 'react';

import styles from '../../css/suppliers/suppliersHeader.module.css';

class Spans extends Component{
  state = { selected: undefined, tops: ['TOP YEAR', 'TOP MONTH', 'TOP WEEK'] };

  handleClick = (index) => { this.setState((prev) => prev.selected === index ? { selected: undefined } : { selected: index }); 
  };

  render(){
    return(
      <div className="filters-list">
        {[0, 1, 2].map((index) => (
          <span
            style={{cursor: "pointer"}}
            key={index}
            className={this.state.selected === index ? `filters-list__link selected` : `filters-list__link`}
            onClick={(e) => {e.preventDefault(); this.handleClick(index);}}>
            {this.state.tops[index]}
          </span>
        ))}
      </div>
    );
  }
}

export default Spans;
