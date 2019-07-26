import { take, fork, put, all, call, select } from 'redux-saga/effects'
import QuotationsAPI from './../../requestor/quotations'
import { createOptionsSelector } from './index'

const init = () => ({
  addedProductsRelations: {
    loading: false,
    data: false,
    error: false,
  },
  currentQuotation: {
    loading: false,
    data: false,
    error: false,
  },
  addedProducts: {
    loading: false,
    data: false,
    error: false,
  }, 
  addedSuppliers: {
    loading: false,
    data: false,
    error: false,
  }, 
  distributedRelations: {
    loading: false,
    data: false,
    error: false,
  },
  invitationStatus: {
    loading: false,
    data: false,
    error: false,
    justSent: false,
  },
  history: {
    loading: false,
    data: false,
    error: false,
  },
})
const addedProductsSelector = state => state.quotations.currentQuotationReducer.addedProducts
export const quotationIdSelector = state => state.quotations.currentQuotationReducer.currentQuotation.data.id


export default function reducer(state = init(), action){
  if(action){
    const { type, payload } = action
    switch(type){        
      case 'INIT_SINGLE_Q_START': 
        return {
          ...state,
          addedProductsRelations: { ...state.addedProductsRelations, loading: true },
          currentQuotation: { ...state.currentQuotation, loading: true },
          addedProducts: { ...state.addedProducts, loading: true },
          addedSuppliers: { ...state.addedSuppliers, loading: true },
          distributedRelations: { ...state.distributedRelations, loading: true },
        }
      case 'INIT_SINGLE_Q_DONE':
        return {
          ...state,
          addedProductsRelations: { ...state.addedProductsRelations, loading: false, data: payload.addedProductsRelations.results },
          currentQuotation: { ...state.currentQuotation, loading: false, data: {...payload.currentQuotation} },
          addedProducts: { ...state.addedProducts, loading: false, data: payload.addedProducts.results },
          addedSuppliers: { ...state.addedSuppliers, loading: false, data: payload.addedSuppliers.results },
          distributedRelations: { ...state.distributedRelations, loading: false, data: payload.distributedRelations.results }
        }
      case 'INIT_SINGLE_Q_ERROR':
        return {
          ...state,
          addedProductsRelations: { ...state.addedProductsRelations, loading: false, error: payload },
          currentQuotation: { ...state.currentQuotation, loading: false, error: payload },
          addedProducts: { ...state.addedProducts, loading: false, error: payload },
          addedSuppliers: { ...state.addedSuppliers, loading: false, error: payload },
          distributedRelations: { ...state.distributedRelations, loading: false, error: payload },
        }
        
      case 'REFRESH_ADDED_PRODUCTS_Q_START':
        return { ...state, addedProducts: { ...state.addedProducts, loading: true }, currentQuotation: { ...state.currentQuotation,  } }
      case 'REFRESH_ADDED_PRODUCTS_Q_DONE':
        return { ...state, 
          addedProducts: { 
            ...state.addedProducts, loading: false, data: payload.addedProducts.results 
          },
          currentQuotation: { ...state.currentQuotation, loading: false, data: payload.currentQuotation },
        }
      case 'REFRESH_ADDED_PRODUCTS_Q_ERROR':
        return { ...state, addedProducts: { ...state.addedProducts, loading: false, error: payload }, }
      
      case 'REFRESH_ADDED_SUPPLIERS_Q_START':
        return { ...state, addedSuppliers: { ...state.addedSuppliers, loading: true }, }
      case 'REFRESH_ADDED_SUPPLIERS_Q_DONE':
        return { ...state, 
          addedSuppliers: { ...state.addedSuppliers, loading: false, data: payload.addedSuppliers.results }, 
          currentQuotation: { ...state.currentQuotation, loading: false, data: payload.currentQuotation },
        }
      case 'REFRESH_ADDED_SUPPLIERS_Q_ERROR':
        return { ...state, addedSuppliers: { ...state.addedSuppliers, loading: false, error: payload }, }
      
      case 'REFRESH_DISTRIBUTED_RELATIONS_Q_START':
        return { ...state, distributedRelations: { ...state.distributedRelations, loading: true }, }
      case 'REFRESH_DISTRIBUTED_RELATIONS_Q_DONE':
        return { ...state, 
          distributedRelations: { ...state.distributedRelations, loading: false, data: payload.distributedRelations.results },
          currentQuotation: { ...state.currentQuotation, loading: false, data: payload.currentQuotation },
        }
      case 'REFRESH_DISTRIBUTED_RELATIONS_Q_ERROR':
        return { ...state, distributedRelations: { ...state.distributedRelations, loading: false, error: payload }, }

      case 'GET_INVITATION_STATUS_START':
        return { ...state, invitationStatus: { ...state.invitationStatus, loading: true } }
      case 'GET_INVITATION_STATUS_DONE':
        return { ...state, invitationStatus: { ...state.invitationStatus, loading: false, data: payload } }
      case 'GET_INVITATION_STATUS_ERROR':
        return { ...state, invitationStatus: { ...state.invitationStatus, loading: false, error: payload } }
      
      case 'LOAD_Q_HISTORY_START':
        return { ...state, history: { ...state.history, loading: true } }
      case 'LOAD_Q_HISTORY_DONE':
        return { ...state, history: { ...state.history, loading: false, data: payload } }
      case 'LOAD_Q_HISTORY_ERROR':
        return { ...state, history: { ...state.history, loading: false, error: payload } }
      
      case 'REFRESH_QUOTATION_DONE':
        return { ...state, currentQuotation: { ...state.currentQuotation, loading: false, data: payload } }
      case 'REFRESH_QUOTATION_ERROR':
        return { ...state, currentQuotation: { ...state.currentQuotation, loading: false, error: payload } }

      default: 
        return state
    }
  }
}




export function* quotationDetailsSaga({ payload }){
  yield put({ type: 'REFRESH_QUOTATION_START' })
  try{
    const res = yield call(QuotationsAPI.getQuotation, payload)
    yield put({ type: 'REFRESH_QUOTATION_DONE', payload: res })
  }catch(e){
    yield put({ type: 'REFRESH_QUOTATION_ERROR', payload: e.message })
  }
}
export function* currentQuotationSaga ({ payload }){
  yield put({ type: 'INIT_SINGLE_Q_START' })
  const optionsD = yield select(createOptionsSelector('distribution'))
  const optionsI = yield select(createOptionsSelector('invitationStatus'))
  try{
    const [ addedProductsRelations, addedProducts, addedSuppliers, currentQuotation, distributedRelations ] = yield all([
      call(QuotationsAPI.getAddedProductsRelation, payload),
      call(QuotationsAPI.getAddedProducts, {id: payload, options: optionsD}),
      call(QuotationsAPI.getAddedSuppliers, payload),
      call(QuotationsAPI.getQuotation, payload),
      call(QuotationsAPI.getDistributedRelations, payload),
    ])
    yield put({ type: 'INIT_SINGLE_Q_DONE', 
      payload: { 
        addedProductsRelations, 
        addedProducts, 
        addedSuppliers, 
        currentQuotation, 
        distributedRelations 
      } 
    })
    // init history 
    yield put({ type: 'REFRESH_MODAL_HISTORY' })
    yield put({ type: 'REFRESH_MODAL_INVITATIONSTATUS' })
  }catch(e){
    yield put({ type: 'INIT_SINGLE_Q_ERROR', payload: e.message })
  }
}
export function* addedProductsSaga ({ payload }){
  yield put({ type: 'REFRESH_ADDED_PRODUCTS_Q_START' })
  yield put({ type: 'REFRESH_MODAL_DISTRIBUTION' })
  try{ 
    const [ addedProducts, currentQuotation ] = yield all([
      call(QuotationsAPI.getAddedProducts, {id: payload}),
      call(QuotationsAPI.getQuotation, payload),
    ])
    yield put({ type: 'REFRESH_ADDED_PRODUCTS_Q_DONE', payload: { addedProducts, currentQuotation } })
  }catch(e){
    yield put({ type: 'REFRESH_ADDED_PRODUCTS_Q_ERROR', payload: e.message })
  }
}
export function* addedSuppliersSaga ({ payload }){
  yield put({ type: 'REFRESH_ADDED_SUPPLIERS_Q_START' })
  try{
    const [ addedSuppliers, currentQuotation ] = yield all([
      call(QuotationsAPI.getAddedSuppliers, payload),
      call(QuotationsAPI.getQuotation, payload),
    ])
    yield put({ type: 'REFRESH_ADDED_SUPPLIERS_Q_DONE', payload: { addedSuppliers, currentQuotation } })
    yield put({ type: 'REFRESH_MODAL_INVITATIONSTATUS' })
  }catch(e){
    yield put({ type: 'REFRESH_ADDED_SUPPLIERS_Q_ERROR', payload: e.message })
  }
}
export function* distributedRelationsSaga ({ payload }){
  yield put({ type: 'REFRESH_DISTRIBUTED_RELATIONS_Q_START' })
  try{
    const [ distributedRelations, currentQuotation ] = yield all([
      call(QuotationsAPI.getDistributedRelations, payload),
      call(QuotationsAPI.getQuotation, payload),
    ])
    yield put({ type: 'REFRESH_DISTRIBUTED_RELATIONS_Q_DONE', payload: { distributedRelations, currentQuotation } })
  }catch(e){
    yield put({ type: 'REFRESH_DISTRIBUTED_RELATIONS_Q_ERROR', payload: e.message })
  }
}
export function* invitationStatusSaga({ type, payload }){
  if(type === 'SEND_INVITATION'){
    try{
      yield call(QuotationsAPI.sendInvitation, { quotation_id: payload })
    }catch(e){
      yield put({ type: 'SEND_INVITATION_FAIL', payload: e.message })
    }
    yield put ({ type: 'GET_INVITATION_STATUS', payload: {id: payload} })
    yield put ({ type: 'REFRESH_QUOTATION', payload })
  }
  if(type === 'REMIND_SUPPLIER') yield call(QuotationsAPI.remindSupplier, payload)

  if(type === 'GET_SUPPLIER_IN_QUOTATION'){
    yield call(QuotationsAPI.getSupplierInQuotation, payload)
    yield put({ type: 'GET_INVITATION_STATUS', payload: {id: payload.quotation_id} })
    yield put ({ type: 'REFRESH_QUOTATION', payload: payload.quotation_id })
    yield put ({ type: 'REFRESH_MODAL_INVITATIONSTATUS' })
  }

  if(type === 'GET_INVITATION_STATUS'){
    yield put({ type: 'GET_INVITATION_STATUS_START' })
    try{
      const status = yield call(QuotationsAPI.getInvitationStatus, payload)
      yield put({ type: 'GET_INVITATION_STATUS_DONE', payload: status.results })
    }catch(e){
      yield put({ type: 'GET_INVITATION_STATUS_ERROR', payload: e.message })
    }
  }
}

const findRelationYouNeed = (payload, products) => {
  for(let r of Object.keys(products)){
    if(products[r].product_id === payload) return products[r]
  }
}
export function* pauseProductSaga({ payload }){
  const addedProducts = yield select(addedProductsSelector)
  const relation = yield findRelationYouNeed(payload, addedProducts.data)
  try{
    const res = yield call(QuotationsAPI.pauseProductsRelation, relation)
    yield put({ type: 'REFRESH_ADDED_PRODUCTS_Q', payload: relation.quotation_id })
  }catch(e){
    yield console.log('an error accured in pause product saga', e)
  }
}
export function* historySaga({ payload }){
  yield put({ type: 'LOAD_Q_HISTORY_START' })
  try{
    const history = yield call(QuotationsAPI.quotationHistory, payload)
    yield put({ type: 'LOAD_Q_HISTORY_DONE', payload: history })
  }catch(e){
    yield put({ type: 'LOAD_Q_HISTORY_ERROR', payload: e.message })
  }
}
export function* selectSupplierSaga({ payload }){
  const quotationId = yield select(quotationIdSelector)
  try{
    const res = yield call (QuotationsAPI.selectSupplier, payload)
    yield put({ type: 'SELECT_SUPPLIER_DONE', payload: res })
    yield put({ type: 'REFRESH_DISTRIBUTED_RELATIONS_Q', payload: quotationId })
  }catch(e){
    yield console.log('an error accured in select supplier saga', e)
  }
}