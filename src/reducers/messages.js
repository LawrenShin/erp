import ApiDefiner, {getDefaultResponse} from './apiRequestDefiner';
import { commaListsOr } from 'common-tags';

const countUnreadMessages = (inbox) => {
  const unread = inbox.data.filter((i) => !i.is_viewed);
  inbox['unread'] = unread.length;
  return inbox;
}

export default (state = { 
  inbox: getDefaultResponse(),
  flagged: getDefaultResponse(),
  trash: getDefaultResponse(),
  sent: getDefaultResponse(),
  drafts: getDefaultResponse(),
  users: {data: []},
  selectedMessages: []
}, action) => {
  const {payload, type} = action;

  switch(type){
    case 'TOGGLE_SELECT_MESSAGE':
      const presenseId = state.selectedMessages.indexOf(payload);
      if(presenseId < 0){
        return { ...state, selectedMessages: [...state.selectedMessages, payload] };
      }else{
        return { ...state, selectedMessages: state.selectedMessages.filter(i => i != payload) };
      }
    case 'CLEAR_USERS_MODAL':
      return { ...state, users: {data: []} };

    case 'API_REQUEST':
    case 'API_REQUEST_FAIL':
    case 'API_REQUEST_READY':
      return new ApiDefiner()
        .define(action, state, 'messages', 'getAllMessages')
          .request( (requestState) => ({...state, inbox: {data: [], state: requestState}}))
          .ready( (payload, requestState) => ({ ...state, inbox: countUnreadMessages({data: payload.data, state: requestState})}))
          .fail( (payload, requestState) => ({...state, inbox: {err: payload.err, state: requestState}}))
        .define(action, state, 'messages', 'getDraftMessages')
          .request( (requestState) => ({...state, drafts: {data: [], state: requestState}}))
          .ready( (payload, requestState) => ({ ...state, drafts: {data: payload.data, state: requestState}}))
          .fail( (payload, requestState) => ({...state, drafts: {err: payload.err, state: requestState}}))
        .define(action, state, 'messages', 'getFlaggedMessages')
          .request( (requestState) => ({...state, flagged: {data: [], state: requestState}}))
          .ready( (payload, requestState) => ({ ...state, flagged: {data: payload.data, state: requestState}}))
          .fail( (payload, requestState) => ({...state, flagged: {err: payload.err, state: requestState}}))
        .define(action, state, 'messages', 'getSentMessages')
          .request( (requestState) => ({...state, sent: {data: [], state: requestState}}))
          .ready( (payload, requestState) => ({ ...state, sent: {data: payload.data, state: requestState}}))
          .fail( (payload, requestState) => ({...state, sent: {err: payload.err, state: requestState}}))
        .define(action, state, 'messages', 'getTrashMessages')
          .request( (requestState) => ({...state, trash: {data: [], state: requestState}}))
          .ready( (payload, requestState) => ({ ...state, trash: {data: payload.data, state: requestState}}))
          .fail( (payload, requestState) => ({...state, trash: {err: payload.err, state: requestState}}))

        .define(action, state, 'messages', 'lookupUser')
          .request( (requestState) => ({...state, users: {data: [], state: requestState}}))
          .ready( (payload, requestState) => ({ ...state, users: {data: payload.data, state: requestState}}))
          .fail( (payload, requestState) => ({...state, users: {err: payload.err, state: requestState}}))
        .define(action, state, 'messages', 'saveDraft')
          .request( (requestState) => ({...state, draft: {data: [], state: requestState}}))
          .ready( (payload, requestState) => ({ ...state, draft: {data: payload.data, state: requestState}}))
          .fail( (payload, requestState) => ({...state, draft: {err: payload.err, state: requestState}}))
        .define(action, state, 'messages', 'sendMessage')
          .request( (requestState) => ({...state, sentMessage: {data: [], state: requestState}}))
          .ready( (payload, requestState) => ({ ...state, sentMessage: {data: payload.data, state: requestState}}))
          .fail( (payload, requestState) => ({...state, sentMessage: {err: payload.err, state: requestState}}))

        .run();
  default:
    return state;
  }
}