import { take, takeEvery, put, call } from 'redux-saga/effects'
import { createAction } from '../../../actions'

export const initialState = () => ({
  groups: '',
  colors: '',
  decors: '',
  styles: '',
  wearing_occasion: '',
  print_mood: ''
})

export default function reducer(state = initialState(), action){
  const { type, payload } = action
  
  switch(type){
    case 'SET_GROUPS': 
      return {...state, groups: payload}
    case 'SET_COLORS': 
      return {...state, colors: payload}
    case 'SET_DECORS': 
      return {...state, decors: payload}
    case 'SET_STYLES': 
      return {...state, styles: payload}
    case 'SET_WEARING_OCCASION': 
      return {...state, wearing_occasion: payload}
    case 'SET_PRINT_MOOD': 
      return {...state, print_mood: payload}
    default:
      return state
  }
}

export function* saga({payload}){
  const {name, data} = payload

  yield put(createAction(`SET_${name.toUpperCase()}`, data))
}