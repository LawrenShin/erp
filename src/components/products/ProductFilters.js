import React,{Component} from 'react';
import uuid from 'uuid';
import Dropdown from '../controls/dropdown';

class ProductFilters extends Component{
  state = {
    includeList: [
      'age',
      'trade_mark',
      'gender',
      'color',
      'style_name',
      'buying_manager',
      'department',
      'theme',
      'season',
      'year',
      'trade_mark',
      'kind',
      'nomenclature_group',
    ]
  };

  ref = React.createRef();

  getHeight = () => {
    const height = document.body.clientHeight - this.ref.current.getBoundingClientRect().bottom - 120;
    return height > 600 ? height : 600;
  }

  onResize = () => {
    this.props.onResize(this.ref.current.clientWidth, this.getHeight());
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  filterNameTransformer = (filterName, type) => {
    if(type === 'fromBack') return filterName.replace(filterName[0], filterName[0].toUpperCase()).replace(/_/g, ' ');
    if(type === 'toBack')   return filterName.replace(filterName[0], filterName[0].toLowerCase()).replace(/ /g, '_');
  }
  
  handleClickClearAll = () => {
    this.props.clearAll();
  }

  handleChange = ({placeholder, value}) => {
    this.props.updateOptions(this.filterNameTransformer(placeholder, 'toBack'), value);
  }

  renderDropdown = (name, filters) => {
    const {options} = this.props;
    const placeholder = this.filterNameTransformer(name, 'fromBack');

    return (
      <Dropdown value={options[name]} key={uuid()} name={name} options={filters} placeholder={placeholder === 'Nomenclature group' ? 'Product type' : placeholder} onChange={this.handleChange} />
    )
  };

  render(){
    return(
      <div ref={this.ref}>
        <div className="filters-header">
          <span className="filters-header__title">Filters</span>
          <button type="reset" className="filters-header__reset" onClick={this.handleClickClearAll} >Clear all<i className="icon-trash"></i></button>
        </div>
        
        <div className="filters-box filters-box-without-decor">
          {Object.keys(this.props.filters).map((f) => {
            if(this.state.includeList.indexOf(f) === -1) return null
            return this.renderDropdown(f, this.props.filters[f])
          })}
        </div>  
      </div>
    );
  }
}

export default ProductFilters;