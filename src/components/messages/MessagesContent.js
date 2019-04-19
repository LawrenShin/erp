import React,{Component} from 'react';
import {connect} from 'react-redux';

import {createRequestAction} from '../../actions';
import TableComponent from './TableComponent';
import WriteMessage from './subComponents/WriteMessage';
import ReadMessage from './subComponents/ReadMessage';
import Files from './subComponents/filesComponent/Files';

class MessagesContent extends Component{

  componentDidMount(){
    switch(this.props.section){
      case 'flagged':
        this.props.getFlaggedMessages(); break;
      case 'sent':
        this.props.getSentMessages(); break;
      case 'draft':
        this.props.getDraftMessages(); break;
      case 'trash': 
        this.props.getTrashMessages(); break;
    }
  }

  render(){
    let table = false;
    switch(this.props.section){
        case 'all':
        case 'flagged':
        case 'sent':
        case 'draft':
        case 'trash': 
          table = true;
          break;
    }
    const {inbox, sent, drafts, trash, flagged} = this.props;
    const map = {
        'all': inbox,
        'flagged': flagged,
        'sent': sent,
        'draft': drafts,
        'trash': trash
    }
    const items = map[this.props.section];
    
    return (
      <div className="messages-body">
        {table && <TableComponent items={items} section={this.props.section} />}
        {this.props.section === 'write' && <WriteMessage id={this.props.type} />}
        {this.props.section === 'files' && <Files />}
        {(this.props.type && this.props.section === 'read') && <ReadMessage id={this.props.type} />}
      </div>
    )
  }
}

const mapStateToProps = ({messages}) => ({
  selectedMessages: messages.selectedMessages,
  inbox: messages.inbox,
  sent: messages.sent,
  drafts: messages.drafts,
  trash: messages.trash,
  flagged: messages.flagged
});

export default connect(mapStateToProps,
  (dispatch) => ({
    getSentMessages: () => dispatch(createRequestAction("messages", "getSentMessages")),
    getDraftMessages: () => dispatch(createRequestAction("messages", "getDraftMessages")),
    getTrashMessages: () => dispatch(createRequestAction("messages", "getTrashMessages")),
    getFlaggedMessages: () => dispatch(createRequestAction("messages", "getFlaggedMessages")),
  }))(MessagesContent);