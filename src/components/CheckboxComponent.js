import React,{Component} from 'react';

class CheckboxComponent extends Component{
  state = { checked: this.props.checked || false };

  handleClick = (e) => {
    const data = { placeholder: e.target.name, value: e.target.checked};
    this.props.onChange(data);
    this.setState({ checked: !this.state.checked });
  }

  render(){
      return(
        <div className={this.props.className || `filters-box__item`}>
          <div className="checkbox-elem">
            <input 
              disabled={this.props.readOnly} 
              value={true} 
              type="checkbox" 
              id={this.props.name} 
              name={this.props.name} 
              onClick={this.handleClick} 
              defaultChecked={this.props.defaultChecked || false} />
            <label className="checkbox-label" htmlFor={this.props.name}>{this.props.label}</label>
          </div>
        </div>
      );
  }
}

export default CheckboxComponent;