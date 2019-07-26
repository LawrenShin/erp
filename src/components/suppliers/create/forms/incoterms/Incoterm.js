import React, {Component} from 'react';
import Input from '../../../../controls/input';

class Incoterm extends Component{  
  state = { inputNames: '' };

  handleChange = (e) => {
    const { name, value } = e
    if(this.props.onChangeFormik) this.props.onChangeFormik(e)
    this.props.saveIncotermData(name, value, this.props.index)
  }

  handleDelete = () => this.props.removeIncoterm(this.props.index);

  renderInputs = (name, index) => {
    let prevVal = this.state.inputNames[name];

    return(
      <Input readOnly={this.props.readOnly} onChange={this.handleChange} name={name} value={prevVal} uiType="tableInside" />
    );
  }

  componentDidMount(){
    this.setState({ inputNames: this.props.inputNames });
  }
  
  render(){
    return(
      <>
        {Object.keys(this.state.inputNames).map((name, index) => this.renderInputs(name, index))}
        <div className="table-add__td td-remove">
          <span onClick={this.handleDelete} style={{cursor: "pointer"}} className="table-add__remove"><i className="icon-trash"></i></span>
        </div>
      </>  
    );
  }
}
export default Incoterm;