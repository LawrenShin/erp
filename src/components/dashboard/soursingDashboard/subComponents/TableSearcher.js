import React,{Component} from 'react';

class TableSearcher extends Component{

  render(){
    return(
      <form action="#">
        <div className="window__form-content">
          <div className="search-bl">
            <input type="text" className="search-bl__input"/>
            <button type="submit" className="search-bl__btn"><i className="icon-search"></i></button>
          </div>
        </div>
      </form>
    );
  }
}

export default TableSearcher;