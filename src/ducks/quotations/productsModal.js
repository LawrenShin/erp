import ProductsApi from '../../requestor/product'
import QuotationsApi from '../../requestor/quotations'

import { put, call, select } from 'redux-saga/effects'
import { getDefaultOptions, createOptionsSelector, QUOTATIONS_OPTION_P } from './index'

export const SET_QUOTATIONS_OPTION_P = 'SET_QUOTATIONS_OPTION_P'
export const CLEAR_QUOTATIONS_OPTION_P = 'CLEAR_QUOTATIONS_OPTION_P'

export const REFRESH_MODAL_PRODUCTS = 'REFRESH_MODAL_PRODUCTS'
export const REFRESH_MODAL_PRODUCTS_START = 'REFRESH_MODAL_PRODUCTS_START'
export const REFRESH_MODAL_PRODUCTS_DONE = 'REFRESH_MODAL_PRODUCTS_DONE'
export const REFRESH_MODAL_PRODUCTS_ERROR = 'REFRESH_MODAL_PRODUCTS_ERROR'

export const QUOTATIONS_ADD_PRODUCT = 'QUOTATIONS_ADD_PRODUCT'



export function* productsModalSaga({ type, payload }){
  if(type === QUOTATIONS_OPTION_P){
    if(payload) {
      yield put({ type: SET_QUOTATIONS_OPTION_P, payload })
      if(payload.filterName !== 'offset') yield put({ type: SET_QUOTATIONS_OPTION_P, payload: {
          filterName: 'offset',
          value: '',
        } })
    }
    if(!payload) yield put({ type: CLEAR_QUOTATIONS_OPTION_P, payload: getDefaultOptions('products') })
    
    if(payload && 'filterName' in payload && payload.filterName === 'offset'){
      yield put({ type: REFRESH_MODAL_PRODUCTS, payload: 'concat' })
    }else{
      yield put({ type: REFRESH_MODAL_PRODUCTS })
    }
  }

  if(type === REFRESH_MODAL_PRODUCTS){
    const concat = yield payload === 'concat' ? true : false
    yield put({ type: REFRESH_MODAL_PRODUCTS_START })
    try{
      const options = yield select(createOptionsSelector('products'))
      const list = yield call(QuotationsApi.getProductsForQuotation, options)
      yield put({ type: REFRESH_MODAL_PRODUCTS_DONE, payload: {list, concat} })
    }catch(e){
      yield put({ type: REFRESH_MODAL_PRODUCTS_ERROR, payload: e.message })
    }
  }

  if(type === QUOTATIONS_ADD_PRODUCT){
    try{
      yield call(QuotationsApi.addProductToQuotation, payload)
    }catch(e){
      yield console.log(e)
    }
  }
}