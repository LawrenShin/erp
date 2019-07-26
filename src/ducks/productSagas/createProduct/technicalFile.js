import { take, takeEvery, put, call } from 'redux-saga/effects'
import { createAction } from '../../../actions'

const SET_ML = 'SET_ML';
const SET_DESC = 'SET_DESC';
const SET_SPEC = 'SET_SPEC';

const initialState = () => ({
  ml: false,
  desc: false,
  spec: false
});

export default function reducer(state = initialState(), action){
  const { type, payload } = action

  switch(type){
    case SET_ML:
      return {...state, ml: payload};
    case SET_DESC:
      return {...state, desc: payload};
    case SET_SPEC:
      return {...state, spec: payload};
    default:
      return state
  }
}

export function* saga({payload}){
  const {name, data} = payload;

  yield put(createAction(`SET_${name.toUpperCase()}`, data))
}