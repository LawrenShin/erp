import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { call, put, takeEvery } from 'redux-saga/effects'

import ProductApi from '../../requestor/product'

import generalReducer from './general'
import designReducer from './design'
import technicalReducer from './technical'
import logisticsReducer from './logistics'

import { saga as generalSaga } from './general'
import { saga as designSaga } from './design'
import { saga as technicalSaga } from './technical'
import { saga as logisticsSaga } from './logistics'

export const initialState = () => ({
  response: false,
  loading: false,
  error: ''
})

export function requestReducer(state = initialState(), action){
  const { type, payload } = action
  switch(type){
    case 'CREATE_PRODUCT_REQUEST_START':
      return { ...state, loading: true, error: '' }
    case 'CREATE_PRODUCT_REQUEST_DONE':
      return { ...state, loading: false, response: { ...payload }, error: '' }
    case 'CREATE_PRODUCT_REQUEST_ERROR':
      return { ...state, loading: false, error: payload }

    default:
      return state
  }
}

export default combineReducers({
  requestReducer,
  generalReducer,
  designReducer,
  technicalReducer,
  logisticsReducer
})

 //sagas

export function* createProductRequestSaga({ payload }){
  yield put({ type: 'CREATE_PRODUCT_REQUEST_START' })
  
  try{
    const createResponse = yield call(ProductApi.createProduct, payload)
    yield put({ type: 'CREATE_PRODUCT_REQUEST_DONE', payload: createResponse })
  }catch(e){
    const { response, message } = e
    yield put({ type: 'CREATE_PRODUCT_REQUEST_ERROR', payload: {message, response: response.data} })
  }
}

export function* saga(){
  yield takeEvery('GENERAL', generalSaga)
  yield takeEvery('DESIGN', designSaga)
  yield takeEvery('TECHNICAL', technicalSaga)
  yield takeEvery('TECHNICAL_CHECKBOX', technicalSaga)
  yield takeEvery('LOGISTICS', logisticsSaga)
  yield takeEvery('CREATE_PRODUCT_REQUEST', createProductRequestSaga)
}

/**
 * Selectors
 * */

export const createProductStore = (state) => state.createProduct
export const generalStore = createSelector(
  createProductStore,
  (store) => store.generalReducer
)
export const designStore = createSelector(
  createProductStore,
  (store) => store.designReducer
)
export const technicalStore = createSelector(
  createProductStore,
  (store) => store.technicalReducer
)
export const logisticsStore = createSelector(
  createProductStore,
  (store) => store.logisticsReducer
)
export const requestErrors = createSelector(
  createProductStore,
  (store) => store.requestReducer.error
)
export const createProductStoreForRequest = createSelector(
  generalStore,
  designStore,
  technicalStore,
  logisticsStore,
  (general, design, technical, logistics) => ({
    ...general,
    ...design, 
    ...technical,
    ...logistics
  })
)