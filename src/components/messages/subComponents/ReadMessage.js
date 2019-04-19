import React,{Component} from 'react';
import {connect} from 'react-redux';
import {history} from '../../../routes/history';
import moment from 'moment';

import Modal from '../modal/Modal';
import {CreateRequestAction, createRequestAction} from '../../../actions/index';
import Messages from '../../../requestor/messages';
import Input from '../../controls/input';

class ReadMessage extends Component{
  state = {
    message: '',
    reply: '',
    author: '',
    observers: '',
    modal: false
  }

  async componentDidMount(){
    const message = await Messages.getMessage(this.props.id);
    const author = await Messages.getUser(message.get_author);
    if(window.previousLocation !== 'draft'){
      try{
        const toReadUsers = await Messages.getMessageForUser(this.props.id);
        let observers = toReadUsers.observers.map((observer) => Messages.getUser(observer));
        Promise.all(observers).then((res) => this.setState({ observers: res }));
      }
      catch(e){
        console.log(e);
      }
    }
    this.setState({message, author});
  }
  componentWillUnmount(){
    if(this.state.reply){
      this.saveDraft();
    }
  }

  saveDraft = () => {
    Messages.saveDraft({ subject: this.state.message.subject, content: this.state.reply, parent_id: this.props.id })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  toggleModal = () => this.setState({ modal: !this.state.modal });

  renderNames = (names) => {
    return names.map((name, index) => {
      const i = index + 1;
      if(i !== names.length){
        if(!name.first_name || !name.last_name) return `${name.name},`;
        return `${name.first_name} ${name.last_name},`;
      }else{
        if(!name.first_name || !name.last_name) return `${name.name}.`;
        return `${name.first_name} ${name.last_name}.`;
      }
    }).join(' ');
  }

  pullUsers = (userList) => {
    this.setState(prev => {
      let oldObservers = prev.observers;
      userList = userList.filter(user => oldObservers.indexOf(user) === -1);
      this.addObservers(userList);
      return { modal: !prev.modal, observers: [...oldObservers, ...userList] };
    });
  }

  addObservers = (newObservers) => {
    let requests = newObservers.map(newObserver => Messages.makeVisibleMessage({ message_id: this.props.id, user_id_to: newObserver.id }));
    Promise.all(requests).then(res => alert(`u just added some people who can see this message. ${requests.length} in total.`));
  }

  hanleChange = (e) => {
    this.setState({ reply: e.target.value });
  }

  handleReply = () => {
    history.push('/messages/all');
  }

  render(){
    return (
      <>
        {this.state.modal && <Modal pullUsers={this.pullUsers} toggleModal={this.toggleModal} />}
        <div className="mail-body">
          <div className="mail-box">
            <div className="message-head">
              <div className="message-heading">
                <h1 className="message-title">{this.state.message.subject}</h1>
                <div className="item-upload item-attach">
                  <div className="item-upload-input"><i className="icon-attach"></i><input type="file" /></div>
                </div>
              </div>
              <div className="message-date">{moment(this.state.message.created_at).format("MMM DD YYYY, hh:mm a")}</div>
            </div>
            <div className="messages-details">
              <div className="messages-details__item">{this.state.author.first_name} {this.state.author.last_name} &#60;{this.state.author.email}&#62;</div>
              <div className="messages-details__item">To: Aleksandar Djuric</div>
              <div className="messages-details__item">
                <span className="message-visible">Visible to:</span> 
                {this.state.observers ? this.renderNames(this.state.observers) : ''}
                <a className="visible-add"><i className="icon-add-button" onClick={this.toggleModal}></i></a></div>
            </div>
            <div className="messages-details__item">
              <span className="message-visible">Description:</span>
            </div>
            <div className="message-description" dangerouslySetInnerHTML={{__html: this.state.message.content}}>
            </div>
            <div className="message-attaches-files">
              <div className="message-attaches-files__line">
                <div className="message-attaches-files__col col-icon">
                  <span className="view-doc"><i className="icon-zip"></i></span>
                </div>
                <div className="message-attaches-files__col">
                  <span className="col-strong">JohnSmith_archive.zip
                  </span>
                </div>
                <div className="message-attaches-files__col col-links">
                  <a className="attaches-icon-link"><i className="attaches-icon icon-eye"></i></a>
                  <a href="#" download className="attaches-icon-link"><i className="attaches-icon icon-file"></i></a>
                </div>
              </div>
            </div>
            <div className="message-form">
              <form>
                <label className="message-form__label">To: <span className="respond">Jack Dorsey</span></label>
                <textarea placeholder="Enter the text" onChange={this.hanleChange}></textarea>
                <div className="btn-message">
                  <input type="button" className="btn" value="Reply" onClick={this.handleReply}/>
                  <div className="item-upload item-attach">
                    <div className="item-upload-input"><i className="icon-attach"></i><input type="file" /></div>
                  </div>
                </div>
              </form>
            </div>
            <div className="message-nav">
              <a href="#" className="message-nav__arrow message-nav__arrow_prev"><i className="icon-arrow-left"></i>Welcome to the iTunes Store, App Store and Apple Books</a>
              <a href="#" className="message-nav__arrow message-nav__arrow_next">Welcome to the iTunes Store, App Store and Apple Books<i className="icon-arrow-right"></i></a>
            </div>
          </div>
          <div className="mail-aside">
            <div className="mail-aside__head">
              <a><i className="icon-arrow-left messages-prev"></i></a>
              Letters on the subject
              <a><i className="icon-arrow-right messages-next"></i></a>
            </div>
            <div className="messages-list">
              <a className="messages-list__item">
                <div className="messages-list__head">
                  <span className="messages-list__title">UI Chest</span>
                  <span className="messages-list__date">Nov, 29</span>
                </div>
                <div className="messages-list__description">We’ve noticed that you downloaded Android for. ree and we hope that it will be of great help.</div>
              </a>
              <a className="messages-list__item">
                <div className="messages-list__head">
                  <span className="messages-list__title">UI Chest</span>
                  <span className="messages-list__date">Nov, 29</span>
                </div>
                <div className="messages-list__description">We’ve noticed that you downloaded Android for. ree and we hope that it will be of great help.</div>
              </a>
              <a className="messages-list__item">
                <div className="messages-list__head">
                  <span className="messages-list__title">UI Chestd eterwt sfragfdsg dghsdf</span>
                  <span className="messages-list__date">Nov, 29</span>
                </div>
                <div className="messages-list__description">We’ve noticed that you downloaded Android for. ree and we hope that it will be of great help.</div>
              </a>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = () => ({

});

export default connect(mapStateToProps)(ReadMessage);