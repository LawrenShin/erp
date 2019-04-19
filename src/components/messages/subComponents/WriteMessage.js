import React,{Component} from 'react';
import {connect} from 'react-redux';
import {history} from '../../../routes/history';

import uuid from 'uuid';

import ToUserPreview from './ToUserPreview';
import Modal from '../modal/Modal';
import Input from '../../controls/input';
import { createRequestAction } from '../../../actions';
import DragAndDrop from '../../DragAndDrop';

import Messages from '../../../requestor/messages';

class WriteMessage extends Component{
  state = { 
    recepients: [], 
    observers: [], 
    subject: '',
    messageBody: '',
    messagesBeenSent: false,
    modal: false,
    dragAndDrop: false,
    draft: false
  };

  async componentDidMount(){
    try{
      if((this.props.id && window.previousLocation === 'draft') || window.previousLocation === undefined){
        let message = await Messages.getMessage(this.props.id);
        const files = await Messages.getFiles(this.props.id);
        message.files = files.results;
        this.setState({ 
          subject: message.subject,
          messageBody: message.content,
          draft: message
        });
      }
    }catch(e){
      console.log(e);
      console.log('Can not preload message.');
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(this.state.messagesBeenSent)
      history.push('/messages/all');
  }
  componentWillUnmount(){
    if(this.state.messageBody !== this.state.draft.content || this.state.subject !== this.state.draft.subject){
      Messages.saveDraft({ subject: this.state.subject, content: this.state.messageBody, message_id: this.props.id })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    }
  }

  localSave = ({name, value, checked}) => {
    this.setState({ [name]: value });
  }

  pullUsers = (userList) => {
    switch(this.state.modal){
    case 'recepients':
      this.setState({ recepients: userList });
      break;
    case 'observers':
      this.setState({ observers: userList });
      break;
    }
    this.setState({modal: false});
  }

  toggleModal = (who) => {
    this.setState({ modal: who });
  }
  toggleDragAndDrop = () => {
    this.setState({ dragAndDrop: !this.state.dragAndDrop });
  }

  saveDraftBeforeSend = () => {
    if(!this.state.draft){
      Messages.saveDraft({ subject: this.state.subject, content: this.state.messageBody })
      .then(res => this.setState({ draft: res })).catch(err => console.log(err));
    }
  }

  makeVisibleAndSend = (message_id) => {
    let promises = this.state.recepients.map((user) => 
      Messages.sendMessage({ message_id: message_id, user_id_to: user.id }).then(res => res));
    promises = promises.concat(this.state.observers.map((user) => 
      Messages.makeVisibleMessage({ message_id: message_id, user_id_to: user.id }).then(res => res)));

    Promise.all(promises).then( (arr) => {
      console.log(arr);
      this.setState({ messagesBeenSent: !this.state.messagesBeenSent });
    });
  }

  initSend = () => {
    if(!this.state.draft){
      Messages.saveDraft({ subject: this.state.subject, content: this.state.messageBody }).then((res) => this.makeVisibleAndSend(res.message_id));
    }else{
      this.makeVisibleAndSend(this.state.draft.message_id);
    }
  }

  ceChange = () => {
    this.localSave({name: "messageBody", value: this._messageBody.innerHTML});
  }

  createMarkup = () => {
    return {__html: this.state.draft.content};
  }

  render(){
    return (
      <div className="write-mail-body">
      {/* {this.state.} */}
        <div className="write-mail">
          <form>
            <div className="editable">
              <div className="editable-head">
                <span className="">TO</span>
              </div>
              {this.state.modal && <Modal pullUsers={this.pullUsers} localSave={this.localSave} toggleModal={this.toggleModal} />}
              <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {this.state.recepients.map(recepient => <ToUserPreview user={recepient} key={uuid()} />)}
              </div>
              <input id='recepients_input' type="text" className="editable__input" onFocus={() => this.toggleModal('recepients')} />
              
              <div className="editable-form" style={{marginTop: 0}}>
                <div className="box-field box-field_editable">
                  <label className="editable__label">SUBJECT</label>
                  <Input 
                    value={this.state.subject ? this.state.subject : ''}
                    simple={true} 
                    className="editable__input" 
                    onChange={this.localSave} 
                    name='subject' />
                </div>
                <div className="box-field box-field_editable">
                  <label className="editable__label">Visible to:</label>
                  <div className="editable__visible">
                    {this.state.observers.map(observer => <span>{observer.name} </span>)}
                  </div>
                  <textarea id='observers_texarea' className="editable__input" onFocus={() => this.toggleModal('observers')}></textarea>
                </div>
                <div className="box-field box-field_editable">
                  <div 
                    ref={(node) => { this._messageBody = node }} 
                    dangerouslySetInnerHTML={this.createMarkup()}
                    contentEditable 
                    placeholder='Type something...' 
                    className="editable__input editable__textarea" 
                    rows='10' 
                    name='messageBody' 
                    onInput={() => this.ceChange()}>
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-icons">
            {this.state.dragAndDrop 
              && 
            <DragAndDrop 
              message={this.props.id || this.state.draft.id}
              toggleDragAndDrop={this.toggleDragAndDrop} 
              saveDraftBeforeSend={this.saveDraftBeforeSend} 
            />}
              <span className="edit-icons__item" onClick={this.toggleDragAndDrop}><i className="icon-office-pin"></i></span>
              <span className="edit-icons__item"><i className="icon-letter"></i></span>
              <span className="edit-icons__item"><i className="icon-link"></i></span>
              <span className="edit-icons__item"><i className="icon-menu"></i></span>
              <span className="edit-icons__item"><i className="icon-smile"></i></span>
            </div>
            <div className="editable-btn">
              <input type="button" value="Send" className="btn" onClick={this.initSend} />
            </div>
          </form>
          {this.state.messagesBeenSent && <h1>Message has been sent</h1>}
        </div>
      </div>
    )}
}

const mapStateToProps = ({messages}) => ({
  draft: messages.draft,
  sentMessage: messages.sentMessage
});

export default connect(mapStateToProps,
  (dispatch) => ({
    saveDraft: (draft) => dispatch(createRequestAction('messages', 'saveDraft', [draft])),
    sendMessage: (data) => dispatch(createRequestAction('messages', 'sendMessage', [data]))
  }))(WriteMessage);