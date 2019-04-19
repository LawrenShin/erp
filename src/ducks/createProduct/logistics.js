import { put} from 'redux-saga/effects'
import { createAction } from '../../actions'
import { nameProperly } from './technical'

export const initialState = () => ({
  number_gtd: '',
  vat_rate: 0,
  code_tnved: '',
  country_origin_id: ''
})

export default function reducer(state = initialState(), action){
  const { type, payload } = action
  
  switch(type){
    case 'SET_NUMBER_GTD': 
      return {...state, number_gtd: payload}
    case 'SET_VAT_RATE': 
      return {...state, vat_rate: payload}
    case 'SET_CODE_TNVED': 
      return {...state, code_tnved: payload}
    case 'SET_COUNTRY_ORIGIN_ID': 
      return {...state, country_origin_id: payload}
      
    default:
      return state
  }
}

export function* saga({payload}){
  const {name, data} = payload
  const rename = nameProperly(name)
  yield put(createAction(`SET_${rename}`, data))
}