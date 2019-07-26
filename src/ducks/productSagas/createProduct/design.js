import { take, takeEvery, put, call } from 'redux-saga/effects'
import { createAction } from '../../../actions'

export const initialState = () => ({
  nomenclature_group: null,
  color: null,
  decor: null,
  style: null,
  wearing_occasion: null,
  print_mood: null,
  age: null,
  gender: null,
  designer: null
});

export default function reducer(state = initialState(), action){
  const { type, payload } = action;
  
  switch(type){
    case 'SET_NOMENCLATURE_GROUP':
      return {...state, nomenclature_group: payload};
    case 'SET_COLOR':
      return {...state, color: payload};
    case 'SET_DECOR':
      return {...state, decor: payload};
    case 'SET_STYLE':
      return {...state, style: payload};
    case 'SET_WEARING_OCCASION': 
      return {...state, wearing_occasion: payload};
    case 'SET_PRINT_MOOD': 
      return {...state, print_mood: payload};
    case 'SET_AGE':
      return {...state, age: payload};
    case 'SET_GENDER':
      return {...state, gender: payload};
    case 'SET_DESIGNER':
      return {...state, designer: payload};
    default:
      return state
  }
}

export function* saga({payload}){
  const {name, data} = payload

  yield put(createAction(`SET_${name.toUpperCase()}`, data))
}