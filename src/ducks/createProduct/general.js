import { take, takeEvery, put, call } from 'redux-saga/effects'
import { createAction } from '../../actions'

const SET_TRADE_MARK = 'SET_TRADE_MARK'
const SET_TARGET_PRICE = 'SET_TARGET_PRICE'
const SET_SEASON = 'SET_SEASON'
const SET_COLLECTION = 'SET_COLLECTION'
const SET_MOQ = 'SET_MOQ'
const SET_YEAR = 'SET_YEAR'
const SET_BUYING_MANAGER = 'SET_BUYING_MANAGER'
const SET_PACKAGE = 'SET_PACKAGE'

const initialState = () => ({
  code: 0, // 1c
  vendor_code: 0,
  trade_mark: '',
  season: 'SS',
  target_price: 0,
  year: 2018,
  collection: '',
  MOQ: {
    from: 0,
    to: 0
  },
  buying_manager: '',
  package: false
})

export default function reducer(state = initialState(), action){
  const { type, payload } = action

  switch(type){
    case SET_TRADE_MARK:
      return {...state, trade_mark: payload}
    case SET_TARGET_PRICE:
      return {...state, target_price: payload}
    case SET_MOQ:
      return {...state, MOQ: payload}
    case SET_COLLECTION:
      return {...state, collection: payload}
    case SET_BUYING_MANAGER:
      return {...state, buying_manager: payload}
    case SET_SEASON:
      return {...state, season: payload}
    case SET_YEAR:
      return {...state, year: payload}
    default:
      return state
  }
}

export function* saga({payload}){
  const {name, data} = payload
  
  yield put(createAction(`SET_${name.toUpperCase()}`, data))
}