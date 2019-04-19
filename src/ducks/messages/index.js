import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { takeEvery } from 'redux-saga/effects'

import MessagesApi from '../../requestor/messages'

const initialState = () => ({
  inbox: {
    data: [],
    state: loaded,
    unread: 0
  },
  flagged: {
    data: [],
    state: loaded
  },
  trash: {
    data: [],
  },
  sent: {
    data: [],
    state: loaded
  },
  drafts: {
    data: [],
    state: loaded
  },
  users: [],
  selectedMessages: ''
})

export function reducer(state = initialState(), action){
  const { type, payload } = action
  switch(type){
    case ''

    default:
      return state
  }
}

// combine reducers

// handle sagas

// gather selectors