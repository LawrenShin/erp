import React, {Component} from 'react';

import {connect} from 'react-redux';
import {createRequestAction} from '../../actions';

import MessagesContent from './MessagesContent';
import Menu from './subComponents/Menu';
import ContentHeader from './ContentHeader';
import Messages from '../../requestor/messages';
import Modal from './modal/Modal';

class MessagesComponent extends Component {
    state = { modal: false, userList: false, unread: 0 };

    componentDidMount(){
        document.querySelector(".content-page").classList.add('content-page-messages');
    }

    componentWillUnmount(){
        document.querySelector(".content-page").classList.remove('content-page-messages');
    }

    handleFlagMessage = () => {
        if(this.props.selectedMessages.length){
            let promises = this.props.selectedMessages.map((id) => 
                Messages.flagMessage(id)
            );
            Promise.all(promises).then(() => this.props.getAllMessages());
        }
    }

    handleDeleteMessage = () => {
        if(this.props.selectedMessages.length){
            let promises = this.props.selectedMessages.map((id) => 
                Messages.deleteMessage(id)
            );
            Promise.all(promises).then(() => this.props.getAllMessages());
        }
    }

    toggleModal = () => this.setState({ modal: !this.state.modal });
    pullUsers = (userList) => this.setState({modal: false, userList});

    componentDidUpdate(prevProps, prevState){
        //happens when we select whot to forward message and click forward
        if(prevProps.inbox !== this.props.inbox && this.props.inbox.state === "loaded"){
            this.setState({messages: this.props.inbox.data});
        }
        
        if(this.state.userList){
            const promises = this.state.userList.map((user) => {
                Messages.forwardMessage({ message_id: this.props.selectedMessages[0], user_id_to: user.id }).then(res => res);
            });
            Promise.all(promises).then((res) => {
                this.setState({ userList: false });
            })
        }
    }
    
    render(){
        return(
        <>
            <div className="messages-aside">
                <Menu type={this.props.match.params.type} unread={this.props.inbox.unread} />
            </div>
            <div className="messages-content">
                <ContentHeader 
                    toggleModal={this.toggleModal}
                    handleFlagMessage={this.handleFlagMessage} 
                    handleDeleteMessage={this.handleDeleteMessage} 
                    section={this.props.match.params.folder || "all"} 
                    flagMessage={this.props.flagMessage} />
                <MessagesContent 
                    type={this.props.match.params.type}
                    section={this.props.match.params.folder || "all"} />
            </div>
            {this.state.modal && <Modal 
                toggleModal={this.toggleModal} 
                pullUsers={this.pullUsers} />}
        </>
        );
    }
}

const mapStateToProps = ({messages:{inbox, selectedMessages}}) => ({
    inbox,
    selectedMessages
});

export default connect(mapStateToProps,
    (dispatch) => ({
        getAllMessages: () => dispatch(createRequestAction("messages", "getAllMessages")),
        flagMessage: (id) => dispatch(createRequestAction('messages', 'flagMessage', id))
    }))(MessagesComponent);