import React,{Component} from 'react';

class CheckboxComponent extends Component{
  state = { checked: this.props.checked || false };

  handleClick = (e) => {
    const data = { name: e.target.name, checked: e.target.checked, target: {...e.target} };
    this.props.onChange(e, data);
    this.setState({ checked: !this.state.checked });
  }

  render(){
      return(
        <div className={this.props.className || `filters-box__item`}>
          <div className="checkbox-elem">
            <input type="checkbox" id={this.props.name} name={this.props.name} onClick={this.handleChange} defaultChecked={this.props.defaultChecked || false} />
            <label className="checkbox-label" htmlFor={this.props.name}>{this.props.label}</label>
          </div>
        </div>
      );
  }
}

export default CheckboxComponent;