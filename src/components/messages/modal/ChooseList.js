import React,{Component} from 'react';
import Checkbox from '../../controls/checkbox';

class ChooseList extends Component{

  renderUsers = (user) => {
    return (
      <div key={user.id} className="choose-list__item checkbox-revert">
        <div className="checkbox-elem">
          <Checkbox name={user.id} label={user.name} defaultChecked={false} onChange={this.props.localSave} />
        </div>
      </div>
    )
  }

  render(){
    return(
      <>
        <div className="choose-list">
        {/* items goes here */}
        {this.props.list ? this.props.list.map((user) => this.renderUsers(user)) : ''}
        </div>
        <div className="choose-btn">
          <span className="btn" onClick={() => this.props.toggleModal('')} >Cancel</span>
          <button type="button" value="Save" className="btn btn2" onClick={this.props.handleSave}>Save</button>
        </div>
      </>
    )
  }
}

export default ChooseList;