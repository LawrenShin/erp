import { takeEvery, put, take, call, select } from 'redux-saga/effects'
import QuotationsApi from '../../../requestor/quotations'
import { history } from '../../../routes/history'

const init = () => ({
  invitedQuotations: {
    loading: false,
    data: false,
    error: false,
  },
  viewedQuotation: {
    products: {
      loading: false,
      data: false,
      error: false,
    },
    requestedChanges: {
      loading: false,
      data: false,
      error: false,
    },
    id: null,
  }
})

const quotationIdSelector = (state) => state.quotations.supplierPart.viewedQuotation.id

export default function reducer(state = init(), action){
  if(action){
    const {type, payload} = action

    switch(type){
      case 'MEMORIZE_QUOTATION':
        return { ...state, viewedQuotation: { ...state.viewedQuotation, id: payload } }
      case 'LOAD_Q_LIST_FOR_SUPPLIER_START':
        return { ...state, invitedQuotations: { ...state.invitedQuotations, loading: true } }
      case 'LOAD_Q_LIST_FOR_SUPPLIER_DONE':
        return { ...state, invitedQuotations: { ...state.invitedQuotations, loading: false, data: payload } }
      case 'LOAD_Q_LIST_FOR_SUPPLIER_ERROR':
        return { ...state, invitedQuotations: { ...state.invitedQuotations, loading: false, error: payload } }
      
      case 'GET_REQUEST_CHANGES_START':
        return { ...state, viewedQuotation: {
          ...state.viewedQuotation,
          requestedChanges: {
            ...state.viewedQuotation.requestedChanges, loading: true 
          } 
        } 
      }
      case 'GET_REQUEST_CHANGES_DONE':
        return { ...state, viewedQuotation: {
          ...state.viewedQuotation,
          requestedChanges: {
            ...state.viewedQuotation.requestedChanges, loading: false, data: payload 
          } 
        } 
      }
      case 'GET_REQUEST_CHANGES_ERROR':
        return { ...state, viewedQuotation: {
          ...state.viewedQuotation,
          requestedChanges: {
            ...state.viewedQuotation.requestedChanges, loading: false, error: payload 
          } 
        } 
      }
      
      case 'LOAD_PRODUCTS_FOR_SUPPLIER_START':
        return { ...state,
          viewedQuotation: {
            ...state.viewedQuotation,
            products: {
             ...state.viewedQuotation.products,
             loading: true
            }}}
      case 'LOAD_PRODUCTS_FOR_SUPPLIER_DONE':
        return { ...state,
          viewedQuotation: {
            ...state.viewedQuotation,
            products: {
             ...state.viewedQuotation.products,
             loading: false,
             data: payload
            }}}
      case 'LOAD_PRODUCTS_FOR_SUPPLIER_ERROR':
        return { ...state,
          viewedQuotation: {
            ...state.viewedQuotation,
            products: {
              ...state.viewedQuotation.products,
              loading: false,
              error: payload
            }}}
      
      default: 
        return state
    }
  }
}

export function* saga(){
  yield takeEvery('LOAD_Q_LIST_FOR_SUPPLIER', quotationsListSaga)
  yield takeEvery(['DECIDE_ON_QUOTATION', 'DECLINE_PRODUCTS_FOR_SUPPLIER', 'NEW_PRICE_FROM_SUPPLIER'], decisionSaga)
  yield takeEvery('LOAD_PRODUCTS_FOR_SUPPLIER', loadProductsSaga)
  yield takeEvery('GET_REQUEST_CHANGES', requestChangesSaga)
}

export function* requestChangesSaga({ payload }){
    const quotationId = yield select(quotationIdSelector)
    yield put({ type: 'GET_REQUEST_CHANGES_START' })
    yield put({ type: 'LOAD_COMMENTS', payload: quotationId })
  try{
    const requestChanges = yield call(QuotationsApi.requestChanges, quotationId)
    yield put({ type: 'GET_REQUEST_CHANGES_DONE', payload: requestChanges })
  }catch(e){
    yield put({ type: 'GET_REQUEST_CHANGES_ERROR', payload: e.message })
  }
}
export function* quotationsListSaga(){
  yield put({ type: 'LOAD_Q_LIST_FOR_SUPPLIER_START' })
  try{
    const quotationsList = yield call(QuotationsApi.getQuotationsForSupplier)
    yield put({ type: 'LOAD_Q_LIST_FOR_SUPPLIER_DONE', payload: quotationsList })
  }catch(e){
    yield put({ type: 'LOAD_Q_LIST_FOR_SUPPLIER_ERROR', payload: e.message })
  }
}

export function* decisionSaga({ type, payload }){
  if(type === 'DECIDE_ON_QUOTATION'){
    try{
      const decisionRes = yield call(QuotationsApi.decideOnQuotation, payload)
      yield history.push(`/quotations/view/${payload.quotation_id}`)
      yield put({ type: 'LOAD_Q_LIST_FOR_SUPPLIER', payload: payload.quotation_id })
    }catch(e){
      console.log('____decisionSaga___error__', e)
    }
  }

  if(type === 'DECLINE_PRODUCTS_FOR_SUPPLIER'){
    try{
      const declineRes = yield call(QuotationsApi.declineProduct, { distribution_id: payload.distributionId })
      yield put({ type: 'LOAD_PRODUCTS_FOR_SUPPLIER', payload: payload.quotationId })
    }catch(e){
      console.log('____decisionSaga___error__', e)
    }
  }

  if(type === 'NEW_PRICE_FROM_SUPPLIER'){
    try{
      const setPriceRes = yield call(QuotationsApi.sendPrice, { 
          distribution_id: payload.distributionId,
          comment_id: payload.commentId,
          price: payload.price,
        })
      yield put({ type: 'LOAD_PRODUCTS_FOR_SUPPLIER', payload: payload.quotationId })
      yield put({ type: 'GET_REQUEST_CHANGES', payload: payload.quotationId })
    }catch(e){
      console.log('____decisionSaga___error__', e)
    }
  }
}
export function* loadProductsSaga({ payload }){
  yield put ({ type: 'LOAD_PRODUCTS_FOR_SUPPLIER_START' })
  yield put({ type: 'MEMORIZE_QUOTATION', payload })
  try{
    const products = yield call(QuotationsApi.productsListForSupplierQuotation, payload)
    yield put ({ type: 'LOAD_PRODUCTS_FOR_SUPPLIER_DONE', payload: products })
  }catch(e){
    yield put ({ type: 'LOAD_PRODUCTS_FOR_SUPPLIER_ERROR', payload: e.message })
  }
}