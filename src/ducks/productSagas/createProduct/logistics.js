import { put} from 'redux-saga/effects'
import { createAction } from '../../../actions'
import { nameProperly } from './technical'

export const initialState = () => ({
  number_gtd: '',
  vat_rate: 0,
  country: ''
});

export default function reducer(state = initialState(), action){
  const { type, payload } = action;
  
  switch(type){
    case 'SET_NUMBER_GTD': 
      return {...state, number_gtd: payload === false ? '' : payload};
    case 'SET_VAT_RATE': 
      return {...state, vat_rate: payload === false ? 0 : payload};
    case 'SET_CODE_TNVED': 
      return {...state, code_tnved: payload};
    case 'SET_COUNTRY':
      return {...state, country: payload};

    default:
      return state
  }
}

export function* saga({payload}){
  const {name, data} = payload;
  const rename = nameProperly(name);
  yield put(createAction(`SET_${rename}`, data));
}