import React,{Component} from 'react';
import {connect} from 'react-redux';

import Input from '../../controls/input';
import ChooseList from './ChooseList';
import { createRequestAction, createAction } from '../../../actions';

class Modal extends Component{

	 state = {timeout: '', userList: []};
	 
	 localSave = ({name}) => {
      this.setState(prev => {
        let userList = prev.userList;
        const isPresent = userList.indexOf(name);
        if(isPresent < 0){
          userList.push(name);
        }else{
          userList.splice(isPresent, 1);
        }
        return {userList};
      });
  }

	componentDidMount(){
		document.getElementById('search-for-user').focus().select()
		document.getElementById('app_header').style.zIndex = 0;
		this.props.lookupUser({query: ''})
	}

	componentWillUnmount(){
		document.getElementById('app_header').style.zIndex = 2;
	}

	handleSearchChange = ({value}) => {
		if(this.state.timeout){
			clearTimeout(this.state.timeout);			
		}
		const query = value;
		if(value)
			this.setState({
				timeout: setTimeout(() => {
					this.props.lookupUser({query});
				}, 500)})
	}
	
	handleSave = () => {
		let selectedUsers = this.props.users.data;
		this.props.pullUsers(selectedUsers.filter((user) => {
			if(this.state.userList.indexOf(user.id) > -1) return user;
		}));
	}

  render(){
    return(
			<>
			<div className="modal-overlay" onClick={() => this.props.toggleModal('')}></div>
			<div className="popup" style={{position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', transform: 'translate(-50%,-50%)', zIndex: 100}}>
				<div className="popup-head">
					<div className="popup__title">Choose people to see this e-mail</div>
				</div>
				<div className="popup-body">
					<div>
						<div className="search-box">
							<div className="search-bl">
								<Input 
									name='search-for-user'
									simple={true} 
									type="text" 
									className="search-bl__input" 
									onChange={this.handleSearchChange} />
								<button type="submit" className="search-bl__btn"><i className="icon-search"></i></button>
							</div>
						</div>
						{this.props.users.state === "loaded" ?
							<ChooseList 
								handleSave={this.handleSave} 
								localSave={this.localSave} 
								toggleModal={this.props.toggleModal} 
								list={this.props.users.data} /> : ''
						}
					</div>
				</div>
				<span className="popup__close" onClick={() => this.props.toggleModal('')}>X</span>
			</div>
		</>		
		)
		
  }
}

const mapStateToProps = ({messages: {users}}) => ({
	users
});

export default connect(mapStateToProps,
	(dispatch) => ({
		lookupUser: (query) => dispatch(createRequestAction('messages', 'lookupUser', [query])),
		clearUsersModal: () => dispatch(createAction('CLEAR_USERS_MODAL')),
	}))(Modal);