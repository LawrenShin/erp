import { take, takeEvery, put, call } from 'redux-saga/effects'
import { createAction } from '../../../actions'

const SET_NAME = 'SET_NAME';
const SET_THEME = 'SET_THEME';
const SET_TRADE_MARK = 'SET_TRADE_MARK';
const SET_TARGET_PRICE = 'SET_TARGET_PRICE';
const SET_SEASON = 'SET_SEASON';
const SET_COLLECTION = 'SET_COLLECTION';
const SET_MOQ = 'SET_MOQ';
const SET_YEAR = 'SET_YEAR';
const SET_BUING_MANAGER = 'SET_BUING_MANAGER';
const SET_CODE = 'SET_CODE';
const SET_VENDOR_CODE = 'SET_VENDOR_CODE';
const SET_PACKAGE = 'SET_PACKAGE';
const SET_ML = 'SET_ML';
const SET_DESC = 'SET_DESC';
const SET_SPEC = 'SET_SPEC';
const SET_MAIN_IMAGE = 'SET_MAIN_IMAGE';
const SET_DEPARTMENT = 'SET_DEPARTMENT';

const initialState = () => ({
  code: null, // 1c
  vendor_code: null,
  trade_mark: null,
  season: null,
  target_price: '',
  year: null,
  collection: null,
  moq: 0,
  buing_manager: null,
  ml: null,
  desc: null,
  spec: null
});

export default function reducer(state = initialState(), action){
  const { type, payload } = action

  switch(type){
    case SET_NAME:
      return {...state, name: payload};
    case SET_THEME:
      return {...state, theme: payload};
    case SET_TRADE_MARK:
      return {...state, trade_mark: payload};
    case SET_TARGET_PRICE:
      return {...state, target_price: payload};
    case SET_MOQ:
      return {...state, moq: payload};
    case SET_COLLECTION:
      return {...state, collection: payload};
    case SET_BUING_MANAGER:
      return {...state, buing_manager: payload};
    case SET_SEASON:
      return {...state, season: payload};
    case SET_YEAR:
      return {...state, year: payload};
    case SET_CODE:
      return {...state, code: payload};
    case SET_VENDOR_CODE:
      return {...state, vendor_code: payload};
    case SET_ML:
      return {...state, ml: payload};
    case SET_DESC:
      return {...state, desc: payload};
    case SET_PACKAGE:
      return {...state, package: payload};
    case SET_SPEC:
      return {...state, spec: payload};
    case SET_MAIN_IMAGE:
      return {...state, main_image: payload};
    case SET_DEPARTMENT:
      return {...state, department: payload};
    default:
      return state
  }
}

export function* saga({payload}){
  const {name, data} = payload;
  
  yield put(createAction(`SET_${name.toUpperCase()}`, data))
}