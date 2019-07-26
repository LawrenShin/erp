import QuotationsApi from '../../requestor/quotations'

import { put, call, select } from 'redux-saga/effects'
import { getDefaultOptions, createOptionsSelector } from './index'
import { quotationIdSelector } from './currentQuotation';

export const SET_QUOTATIONS_OPTION_ = 'SET_QUOTATIONS_OPTION_'
export const CLEAR_QUOTATIONS_OPTION_ = 'CLEAR_QUOTATIONS_OPTION_'

export const REFRESH_MODAL_ = 'REFRESH_MODAL_'
export const REFRESH_MODAL__START = 'REFRESH_MODAL__START'
export const REFRESH_MODAL__DONE = 'REFRESH_MODAL__DONE'
export const REFRESH_MODAL__ERROR = 'REFRESH_MODAL__ERROR'

export function* genericModalSaga({ type, payload }){
  if(type.match(/QUOTATIONS_OPTION/gm)){
    const optionType = yield type.match(/\w$/)[0]
    const defaultsName = optionType === 'D' ? 'distribution' : optionType === 'I' ? 'invitationStatus' : 'history'
    const currentOptions = yield select(createOptionsSelector(defaultsName))
    if(defaultsName){
      if(payload) {
        yield put({ type: `SET_QUOTATIONS_OPTION_${optionType}`, payload })
        if(payload.filterName !== 'offset' && currentOptions.offset) yield put({ type: `SET_QUOTATIONS_OPTION_${optionType}`, payload: {
            filterName: 'offset',
            value: '',
          } })
      }
      if(!payload) yield put({ type: `CLEAR_QUOTATIONS_OPTION_${optionType}`, payload: getDefaultOptions(defaultsName) })
      
      if(payload && 'filterName' in payload && payload.filterName === 'offset'){
        yield put({ type: `REFRESH_MODAL_${defaultsName.toUpperCase()}`, payload: 'concat' })
      }else{
        yield put({ type: `REFRESH_MODAL_${defaultsName.toUpperCase()}` })
      }
    }
  }
  if(type.match(/REFRESH_MODAL_/gm)){
    const matched = yield type.match(/\_[A-Z]+$/gm)
    const optionsName = yield matched[0].replace('_', '').toLowerCase()
    const concat = yield payload === 'concat' ? true : false
    const quotationId = yield select(quotationIdSelector)
    yield put({ type: `REFRESH_MODAL${matched[0]}_START` })
    try{
      const options = yield select(createOptionsSelector(optionsName === 'invitationstatus' ? 'invitationStatus' : optionsName))
      let list = false
      
      if(optionsName === 'distribution') list = yield call(QuotationsApi.getAddedProducts, {id: quotationId, options})
      if(optionsName === 'invitationstatus') list = yield call(QuotationsApi.getInvitationStatus, {id: quotationId, options})
      if(optionsName === 'history') list = yield call(QuotationsApi.quotationHistory, {...options, distribution__quotation__id: quotationId})
      
      yield put({ type: `REFRESH_MODAL${matched[0]}_DONE`, payload: {list, concat} })
    }catch(e){
      yield put({ type: `REFRESH_MODAL${matched[0]}_ERROR`, payload: e.message })
    }
  }
}