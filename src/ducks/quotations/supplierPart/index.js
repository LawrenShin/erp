import { takeEvery, put, takeLatest, call, select, take } from 'redux-saga/effects'
import QuotationsApi from '../../../requestor/quotations'
import { history } from '../../../routes/history'

const init = () => ({
  notifications: {
    loading: false,
    data: false,
    error: false,
  },
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
      isAvailableAllTeckPack: false,
    },
    requestedChanges: {
      loading: false,
      data: false,
      error: false,
    },
    id: null,
  },
  localPrices: [],
})

const quotationIdSelector = (state) => state.quotations.supplierPart.viewedQuotation.id

export default function reducer(state = init(), action){
  if(action){
    const {type, payload} = action

    switch(type){
      case 'REGISTER_LOCAL_PRICE':
        return { ...state, localPrices: [...state.localPrices.filter(lp => lp.product !== payload.product), payload] }
      case 'MEMORIZE_QUOTATION':
        return { ...state, viewedQuotation: { ...state.viewedQuotation, id: payload } }

      case 'GET_SUPPLIER_NOTIFICATIONS_START':
        return { ...state, notifications: { ...state.notifications, loading: true } }
      case 'GET_SUPPLIER_NOTIFICATIONS_DONE':
        return { ...state, notifications: { ...state.notifications, loading: false, data: payload } }
      case 'GET_SUPPLIER_NOTIFICATIONS_ERROR':
        return { ...state, notifications: { ...state.notifications, loading: false, error: payload } }
      
      case 'LOAD_Q_LIST_FOR_SUPPLIER_START':
        return { ...state, invitedQuotations: { ...state.invitedQuotations, loading: true } }
      case 'LOAD_Q_LIST_FOR_SUPPLIER_DONE':{
        return { ...state, invitedQuotations: { ...state.invitedQuotations, loading: false, data: payload } }
      }
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
             data: payload,
             isAvailableAllTeckPack: payload.filter(p => p.get_is_available_download_tech_files === false)[0] === undefined ? true : false,
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
  yield takeLatest(['GET_SUPPLIER_NOTIFICATIONS', 'READ_NOTIFICATION'], notificationsSaga)
  yield takeEvery(['REQUEST_SAMPLES', 'ACCEPT_SAMPLES'], samplesSaga)
}

export function* notificationsSaga({ type, payload }){
  if(type === 'GET_SUPPLIER_NOTIFICATIONS'){
    yield put({ type: 'GET_SUPPLIER_NOTIFICATIONS_START' })
    try{
      const notifications = yield call(QuotationsApi.getNotifications)
      yield put({ type: 'GET_SUPPLIER_NOTIFICATIONS_DONE', payload: notifications })
    }catch(e){
      yield put({ type: 'GET_SUPPLIER_NOTIFICATIONS_ERROR', payload: e.message })
    }
  }
  if(type === 'READ_NOTIFICATION'){
    try{
      const isReaded = yield call(QuotationsApi.readNotification, payload)
      yield put({ type: 'GET_SUPPLIER_NOTIFICATIONS' })
    }catch(e){
      yield put({ type: 'READ_NOTIFICATION_ERROR', payload: e.message })
    }
  }
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
      
      if(payload.decision === 'accepted'){
        yield history.push(`/quotations/view/${payload.quotation_id}`)
        yield put({ type: 'LOAD_Q_LIST_FOR_SUPPLIER', payload: payload.quotation_id })
      }
      if(payload.decision === 'declined'){
        yield put({ type: 'LOAD_Q_LIST_FOR_SUPPLIER' })
        yield history.push(`/quotations`)
      }
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
  yield put({ type: 'GET_REQUEST_CHANGES', payload })
  try{
    const products = yield call(QuotationsApi.productsListForSupplierQuotation, payload)
    yield put ({ type: 'LOAD_PRODUCTS_FOR_SUPPLIER_DONE', payload: products })
  }catch(e){
    yield put ({ type: 'LOAD_PRODUCTS_FOR_SUPPLIER_ERROR', payload: e.message })
  }
}
export function* samplesSaga({ type, payload }){
  if(type === 'REQUEST_SAMPLES'){
    try{
      const res = yield call(QuotationsApi.requestSamples, payload)
      yield put({ type: 'REQUEST_SAMPLES_DONE', payload: res })
      yield put({ type: 'REFRESH_QUOTATION', payload })
    }catch(e){
      yield console.log('an error accured in select supplier saga', e)
    }
  }
  if(type === 'ACCEPT_SAMPLES'){
    try{
      const res = yield call(QuotationsApi.acceptSamples, payload)
      yield put({ type: 'ACCEPT_SAMPLES_DONE', payload: res })
      yield put({ type: 'LOAD_Q_LIST_FOR_SUPPLIER' })
    }catch(e){
      yield console.log('an error accured in select supplier saga', e)
    }
  }
}