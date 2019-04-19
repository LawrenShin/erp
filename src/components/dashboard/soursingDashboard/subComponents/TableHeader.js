import React,{Component} from 'react';

const TableHeader = (props) => {
  return(
    <div className="window-head">
      <div className="window-title">
        <i className="window-title__icon icon-bookmark-button"></i>
        {props.title}
      </div>
      <div className="window-btns">
        <a href="#" className="window-btn window-btn_refresh"><i className="icon-refresh"></i></a>
        <a href="#" className="window-btn window-btn_hide"><i className="icon-angle-down"></i></a>
        <a href="#" className="window-btn window-btn_close"><i className="icon-close"></i></a>
      </div>
    </div>
  )
}
export default TableHeader;