import Api from './api';
import axios from 'axios';
import {collectOptions} from './common';

//gets
const getAllMessages = () => {
  return Api.get('messaging/get_messages_inbox/', true);
}
const getFlaggedMessages = () => {
  return Api.get('messaging/get_messages_flagged/', true);
}
const getSentMessages = () => {
  return Api.get('messaging/get_messages_sent/', true);
}
const getDraftMessages = () => {
  return Api.get('messaging/get_messages_draft/', true);
}
const getTrashMessages = () => {
  return Api.get('messaging/get_messages_trash/', true);
}
const lookupUser = (query) => {
  return Api.post('messaging/lookup_user/', true, query, false);
}
const getMessage = (id) => {
  if(id)
    return Api.get(`messaging/message/${id}`);
}
const getMessageForUser = (id) => {
  return Api.post('messaging/get_message_for_user/', true, {message_id: id});
}
const getUser = (id) => {
  return Api.get(`main/user/${id}`);
}
const getFiles = (message) => {
  return Api.get('messaging/file/', true, {message}, false);
}


//actions
const uploadFile = (data) => {
  let bodyFormData = new FormData();
  bodyFormData.append('file', data.file);
  bodyFormData.append('message', data.message);
  return Api.post('messaging/file/', true, bodyFormData, false, false, {'Content-Type': 'multipart/form-data' });
}
const saveDraft = (data) => {
  return Api.post('messaging/save_message_draft/', true, data, false);
}
const sendMessage = (data) => {
  return Api.post('messaging/send_message/', true, data, false);
}
const forwardMessage = (data) => {
  return Api.post('messaging/forward_message/', true, data, false);
}
const makeVisibleMessage = (data) => {
  return Api.post('messaging/visible_message/', true, data, false);
}
const flagMessage = (id) => {
  return Api.post('messaging/toggle_message_flagged/', true, {message_id: id}, false);
}
const deleteMessage = (id) => {
  return Api.post('messaging/toggle_message_deleted/', true, {message_id: id}, false);
}
const toggleReadMessage = (id) => {
  return Api.post('messaging/toggle_message_visibled/', true, {message_id: id}, false);
}

export default {
  getAllMessages,
  getDraftMessages,
  lookupUser,
  saveDraft,
  sendMessage,
  makeVisibleMessage,
  forwardMessage,
  flagMessage,
  getFlaggedMessages,
  getSentMessages,
  deleteMessage,
  getMessage,
  getUser,
  getTrashMessages,
  toggleReadMessage,
  uploadFile,
  getMessageForUser,
  getFiles
};