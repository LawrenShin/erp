import React, {Component} from 'react';
import { connect } from 'react-redux';

import { addOptions, clearOptions } from '../../actions/suppliers.js';
import Dropdown from '../controls/dropdown';
import RatingDropdown from './RatingDropdown.js';
import CheckboxComponent from '../CheckboxComponent.js';
import { supplierList } from '../../actions/suppliers';
import { format } from 'url';

const irrigateHeader = (name) => `${name[0].toUpperCase()}${name.substr(1).replace("_", " ")}`;

class Filters extends Component {

  ref = React.createRef();

  getHeight = () => {
    const height = document.body.clientHeight - this.ref.current.getBoundingClientRect().bottom - 120;
    return height > 600 ? height : 600;
  }

  onResize = () => {
    this.props.onResize(this.ref.current.clientWidth, this.getHeight());
  }

  componentDidMount() {
    this.props.getList(this.props.options);
    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  //event handlers
  handleChange = (data) => {
    const {placeholder, value} = data;
    this.props.addOptions({placeholder, value});
  }
  handleClickClearAll = () => {
    this.props.clearOptions();
  }
  handleClickCheckbox = (e, data) => {
    data.placeholder = data.name; data.value = data.checked;
    this.props.addOptions(data);
  }
  componentDidUpdate(){
    console.log('update', this.props.options);
    this.props.getList(this.props.options);
  }
  

  renderDropdown = (name, filters) => {
    const {options} = this.props;
    return (
      <Dropdown value={options[name]} key={name} name={name} options={filters} placeholder={irrigateHeader(name)} onChange={this.handleChange} />
    )
  };

  renderCheckboxes = (box) => <CheckboxComponent onChange={this.handleClickCheckbox} label={box.inReact} name={box.inUrl} key={box.inUrl} defaultChecked={true}/>;

  render(){
    const ratings = ['general_rating', 'financial_rating', 'reliability_rating'];
    const {filters} = this.props;

    return(
      <div ref={this.ref}>
        <div className="filters-header">
          <span className="filters-header__title">Filters</span>
          <button type="reset" className="filters-header__reset" onClick={this.handleClickClearAll} >Clear all<i className="icon-trash"></i></button>
        </div>
        
        <div className="filters-box filters-box-without-decor">
          {Object.keys(filters).map((f) => this.renderDropdown(f, filters[f]))}
          {ratings.map((rating) => <RatingDropdown key={rating} type={rating} /> )}
          {this.props.checkBoxesToRender && this.props.checkBoxesToRender.map((box) => this.renderCheckboxes(box))}
        </div>  
      </div>
    );
  }
}
const mapStateProps = ({suppliers}) => ({
  options: suppliers.options
});

export default connect(mapStateProps, 
  (dispatch) => ({
    getList: (options) => dispatch(supplierList(options)),
    addOptions: (option) => dispatch(addOptions(option)),
    clearOptions: () => dispatch(clearOptions())
}))(Filters);