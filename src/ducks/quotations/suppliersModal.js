import QuotationsApi from '../../requestor/quotations'

import { put, call, select } from 'redux-saga/effects'
import { getDefaultOptions, createOptionsSelector, QUOTATIONS_OPTION_S } from './index'

export const SET_QUOTATIONS_OPTION_S = 'SET_QUOTATIONS_OPTION_S'
export const CLEAR_QUOTATIONS_OPTION_S = 'CLEAR_QUOTATIONS_OPTION_S'

export const REFRESH_MODAL_SUPPLIERS = 'REFRESH_MODAL_SUPPLIERS'
export const REFRESH_MODAL_SUPPLIERS_START = 'REFRESH_MODAL_SUPPLIERS_START'
export const REFRESH_MODAL_SUPPLIERS_DONE = 'REFRESH_MODAL_SUPPLIERS_DONE'
export const REFRESH_MODAL_SUPPLIERS_ERROR = 'REFRESH_MODAL_SUPPLIERS_ERROR'

export const QUOTATIONS_ADD_PRODUCT = 'QUOTATIONS_ADD_PRODUCT'



export function* suppliersModalSaga({ type, payload }){
  if(type === QUOTATIONS_OPTION_S){
    if(payload) {
      yield put({ type: SET_QUOTATIONS_OPTION_S, payload })
      if(payload.filterName !== 'offset') yield put({ type: SET_QUOTATIONS_OPTION_S, payload: {
          filterName: 'offset',
          value: '',
        } })
    }
    if(!payload) yield put({ type: CLEAR_QUOTATIONS_OPTION_S, payload: getDefaultOptions('suppliers') })
    
    if(payload && 'filterName' in payload && payload.filterName === 'offset'){
      yield put({ type: REFRESH_MODAL_SUPPLIERS, payload: 'concat' })
    }else{
      yield console.log('should have worked')
      yield put({ type: REFRESH_MODAL_SUPPLIERS })
    }
  }

  if(type === REFRESH_MODAL_SUPPLIERS){
    const concat = yield payload === 'concat' ? true : false
    yield put({ type: REFRESH_MODAL_SUPPLIERS_START })
    try{
      const options = yield select(createOptionsSelector('suppliers'))
      const list = yield call(QuotationsApi.getSuppliersForQuotation, options)
      yield put({ type: REFRESH_MODAL_SUPPLIERS_DONE, payload: {list, concat} })
    }catch(e){
      yield put({ type: REFRESH_MODAL_SUPPLIERS_ERROR, payload: e.message })
    }
  }

}