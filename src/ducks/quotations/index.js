import { combineReducers } from 'redux'
import { fork, takeLatest, takeEvery, put, call, all, select } from 'redux-saga/effects'
import { createSelector } from 'reselect'

import QuotationsApi from '../../requestor/quotations'

import { productsModalSaga, SET_QUOTATIONS_OPTION_P, CLEAR_QUOTATIONS_OPTION_P, REFRESH_MODAL_PRODUCTS, REFRESH_MODAL_PRODUCTS_START, REFRESH_MODAL_PRODUCTS_DONE, REFRESH_MODAL_PRODUCTS_ERROR, QUOTATIONS_ADD_PRODUCT } from './productsModal'
import { createQuotationSaga } from './createQuotation'
import currentQuotationReducer,
{ currentQuotationSaga, 
  historySaga,
  addedProductsSaga, 
  addedSuppliersSaga, 
  distributedRelationsSaga, 
  invitationStatusSaga, 
  pauseProductSaga } from './currentQuotation'
import createQuotationReducer from './createQuotation'
import { commentsSaga, commentsReducer as comments } from './commentsSaga'
import supplierPart, { saga as supplierQuotationsSaga } from './supplierPart'

//init state
export const getDefaultOptions = (listName) => { 
    switch(listName){
      case 'quotations': 
        return { 
          collection: '',
          name__icontains: '',
          products_amount: '',
          status: '',
          suppliers_amount: '',
        }
      case 'products': 
        return { 
          year: '',
          trade_mark: '',
          season: '',
          theme: '',
          nomenclature_group: '',
          gender: '',
          category: '',
          age: '',
          style: '',
          color: '',
          additional_nomenclature_description__icontains: '',
          target_price: '',
          shell_fabric_1: '',
          shell_fabric_1_weight: '',
          padding: '',
          lining: '',
       }
      case 'suppliers': 
        return { 
          name__icontains: '',
          supplier_code_1c__icontains: '',
          status: '',
          categories: '',
          legal_country: '',
        }
        default: break;
    }
 }
export const init = () => ({
  filters: {
    quotations: {
      loading: false,
      data: null,
      error: ''
    },
    suppliers: {
      loading: false,
      data: null,
      error: ''
    },
    products: {
      loading: false,
      data: null,
      error: ''
    }
  },
  lists: {
    quotations: {
      loading: false,
      data: null,
      options: getDefaultOptions('quotations'),
      error: ''
    },
    suppliers: {
      loading: false,
      data: null,
      options: getDefaultOptions('suppliers'),
      error: ''
    },
    products: {
      loading: false,
      data: null,
      options: getDefaultOptions('products'),
      error: ''
    }
  }
})

// action types
const LOAD_Q_HISTORY = 'LOAD_Q_HISTORY'
const LOAD_COMMENTS = 'LOAD_COMMENTS'
const POST_COMMENT = 'POST_COMMENT'

const SEND_INVITATION = 'SEND_INVITATION'
const PAUSE_PRODUCT = 'PAUSE_PRODUCT'

const GET_INVITATION_STATUS = 'GET_INVITATION_STATUS'
const REMIND_SUPPLIER = 'REMIND_SUPPLIER'
const GET_SUPPLIER_IN_QUOTATION = 'GET_SUPPLIER_IN_QUOTATION'

const REQUEST_FILTERS_Q = 'REQUEST_FILTERS_Q'
const REQUEST_FILTERS_Q_START = 'REQUEST_FILTERS_Q_START'
const REQUEST_FILTERS_Q_ERROR = 'REQUEST_FILTERS_Q_ERROR'
const REQUEST_FILTERS_Q_DONE = 'REQUEST_FILTERS_Q_DONE'

const REQUEST_LIST_Q = 'REQUEST_LIST_Q'
const REQUEST_LIST_Q_START = 'REQUEST_LIST_Q_START'
const REQUEST_LIST_Q_ERROR = 'REQUEST_LIST_Q_ERROR'
const REQUEST_LIST_Q_DONE = 'REQUEST_LIST_Q_DONE'

const INIT_SINGLE_Q = 'INIT_SINGLE_Q'
const REFRESH_ADDED_PRODUCTS_Q = 'REFRESH_ADDED_PRODUCTS_Q'
const REFRESH_ADDED_SUPPLIERS_Q = 'REFRESH_ADDED_SUPPLIERS_Q'
const REFRESH_DISTRIBUTED_RELATIONS_Q = 'REFRESH_DISTRIBUTED_RELATIONS_Q'

const REQUEST_MODALS_DATA = 'REQUEST_MODALS_DATA'
const MODALS_DATA_START = 'MODALS_DATA_START'
const MODALS_DATA_DONE = 'MODALS_DATA_DONE'
const MODALS_DATA_ERROR = 'MODALS_DATA_ERROR'

const QUOTATIONS_OPTION = 'QUOTATIONS_OPTION'
const QUOTATION_SET_OPTION = 'QUOTATION_SET_OPTION'
const QUOTATION_CLEAR_OPTION = 'QUOTATION_CLEAR_OPTION' // implement this one

export const QUOTATIONS_OPTION_P = 'QUOTATIONS_OPTION_P'

const CREATE_QUOTATION = 'CREATE_QUOTATION'

export default combineReducers({
  mainQuotationReducer,
  createQuotationReducer,
  currentQuotationReducer,
  comments,
  supplierPart,
})

//reducer
export function mainQuotationReducer(state = init(), action){
  if(action){
    const {type, payload} = action
    let filterName, value
    if(payload){
      filterName = payload.filterName
      value = payload.value
    }
    let newOptions = null

    switch(type){
      case REQUEST_FILTERS_Q_START:
        return { ...state, filters: { ...state.filters, quotations: { ...state.filters.quotations, loading: true } } }
      case REQUEST_FILTERS_Q_DONE: 
        return { ...state, filters: { ...state.filters, quotations: { ...state.filters.quotations, data: payload, loading: false } } }
      case REQUEST_FILTERS_Q_ERROR: 
        return { ...state, filters: { ...state.filters, quotations: { ...state.filters.quotations, error: payload, loading: false } } }
      
      case REQUEST_LIST_Q_START:
        return { ...state, lists: { ...state.lists, quotations: { ...state.lists.quotations, loading: true } } }
      case REQUEST_LIST_Q_DONE: 
        return { ...state, lists: { ...state.lists, quotations: { ...state.lists.quotations, data: payload, loading: false } } }
      case REQUEST_LIST_Q_ERROR: 
        return { ...state, lists: { ...state.lists, quotations: { ...state.lists.quotations, error: payload, loading: false } } }

      case MODALS_DATA_START: 
        return { ...state, lists: { ...state.lists, 
            products: { 
              ...state.lists.products, 
              loading: true
            },
            suppliers: { 
              ...state.lists.suppliers, 
              loading: true
            }
          }}
      case MODALS_DATA_DONE: 
        return { ...state, 
          lists: { ...state.lists, 
            products: { 
              ...state.lists.products, 
              loading: false,
              data: payload.productsList
            },
            suppliers: { 
              ...state.lists.suppliers, 
              loading: false,
              data: payload.suppliersList
            }
          },
          filters: {
            ...state.filters,
            products: {
              ...state.filters.products, 
              loading: false,
              data: payload.productsFilters
            },
            suppliers: {
              ...state.filters.suppliers, 
              loading: false,
              data: payload.suppliersFilters
            }
          }
        }
      case MODALS_DATA_ERROR: 
        return { ...state, 
          lists: { ...state.lists, 
            products: { 
              ...state.lists.products, 
              loading: false,
              error: payload
            },
            suppliers: { 
              ...state.lists.suppliers, 
              loading: false,
              error: payload
            },
          filters: { ...state.filters,
            products: { 
              ...state.filters.products, 
              loading: false,
              error: payload
            },
            suppliers: { 
              ...state.filters.suppliers, 
              loading: false,
              error: payload
            }
          }
        }}

      case REFRESH_MODAL_PRODUCTS_START:
        return { ...state, lists: { ...state.lists, products: { ...state.lists.products, loading: true } } }
      case REFRESH_MODAL_PRODUCTS_DONE:
        return { ...state, lists: { ...state.lists, products: { ...state.lists.products, loading: false, data: payload } } }
      case REFRESH_MODAL_PRODUCTS_ERROR:
        return { ...state, lists: { ...state.lists, products: { ...state.lists.products, loading: false, error: payload } } }
      
      case QUOTATION_SET_OPTION:
        newOptions = {...state.lists.quotations.options}
        newOptions[filterName] = value
        return { ...state, lists: { ...state.lists, quotations: { ...state.lists.quotations, options: { ...newOptions } } } }
      case SET_QUOTATIONS_OPTION_P:
        newOptions = {...state.lists.products.options}
        newOptions[filterName] = value
        return { ...state, lists: { ...state.lists, products: { ...state.lists.products, options: { ...newOptions } } } }
      
      case CLEAR_QUOTATIONS_OPTION_P:
        const options = getDefaultOptions('products')
        return { ...state, lists: { ...state.lists, products: { ...state.lists.products, options } } }

      default: return state
    }
  }
}

// selectors
export const mainQuotationState = state => state.quotations.mainQuotationReducer
export const quotationsFilters = createSelector(
  mainQuotationState,
  state => state.filters.quotations
)

export const createOptionsSelector = (fromHere) => createSelector(
  mainQuotationState,
  state => state.lists[fromHere].options
)
export const createListsSelector = (fromHere) => createSelector(
  mainQuotationState,
  state => state.lists[fromHere].data
  )
  export const createFiltersSelector = (fromHere) => createSelector(
  mainQuotationState,
  state => state.filters[fromHere].data
)

export const quotationsList = createSelector(
  mainQuotationState,
  state => state.lists.quotations
)


export const modalsDataPresence = createSelector(
  mainQuotationState,
  state => {
    const {filters, lists} = state
    if(filters.products.data && filters.suppliers.data && lists.products.data && lists.suppliers.data) return true
    return false
  }
)
//write selector

// sagas

export function* quotationsFiltersSaga(){
  yield put({ type: REQUEST_FILTERS_Q_START })
  try{
    const QFilters = yield call( QuotationsApi.getQuotationFilters )
    yield put({ type: REQUEST_FILTERS_Q_DONE, payload: QFilters })
  }catch(e){
    yield put({ type: REQUEST_FILTERS_Q_ERROR, payload: e.message })
  }
}

export function* quotationsListSaga(){
  yield put({ type: REQUEST_LIST_Q_START })
  const options = yield select(createOptionsSelector('quotations'))
  try{
    const QList = yield call( QuotationsApi.getQuotationsList, options )
    yield put({ type: REQUEST_LIST_Q_DONE, payload: QList })
  }catch(e){
    yield put({ type: REQUEST_LIST_Q_ERROR, payload: e.message })
  }
}

export function* modalsDataSaga(){
  yield put({ type: MODALS_DATA_START })
  
  const suppliersOptionsSelector = createOptionsSelector('suppliers')
  const productsOptionsSelector = createOptionsSelector('products')
  const suppliersOptions = yield select(suppliersOptionsSelector)
  const productsOptions = yield select(productsOptionsSelector)
  
  try{
    const [ suppliersList, suppliersFilters, productsList, productsFilters ] = yield all([
      call(QuotationsApi.getSuppliersForQuotation, suppliersOptions),
      call(QuotationsApi.introspectFilters, 'suppliers'),
      call(QuotationsApi.getProductsForQuotation, productsOptions),
      call(QuotationsApi.introspectFilters, 'products'),
    ])
    yield put({ type: MODALS_DATA_DONE, payload: { suppliersList, suppliersFilters, productsList, productsFilters } })
  }catch(e){
    yield put({ type: MODALS_DATA_ERROR, payload: e.message })
  }
}

export function* quotationsOptionsSaga({ payload }){
  yield put({ type: QUOTATION_SET_OPTION, payload })
  yield put({ type: REQUEST_LIST_Q })
}

export function* saga(){
  yield takeEvery(REQUEST_FILTERS_Q, quotationsFiltersSaga)
  yield takeEvery(REQUEST_LIST_Q, quotationsListSaga)
  yield takeEvery(QUOTATIONS_OPTION, quotationsOptionsSaga)
  yield takeEvery(CREATE_QUOTATION, createQuotationSaga)
  yield takeEvery(REQUEST_MODALS_DATA, modalsDataSaga)
  yield takeEvery([ 
    QUOTATIONS_OPTION_P, 
    REFRESH_MODAL_PRODUCTS, 
    QUOTATIONS_ADD_PRODUCT], productsModalSaga)
  yield takeEvery(INIT_SINGLE_Q, currentQuotationSaga)
  yield takeEvery(REFRESH_ADDED_PRODUCTS_Q, addedProductsSaga)
  yield takeEvery(REFRESH_ADDED_SUPPLIERS_Q, addedSuppliersSaga)
  yield takeEvery(REFRESH_DISTRIBUTED_RELATIONS_Q, distributedRelationsSaga)
  yield takeEvery([
    SEND_INVITATION,
    REMIND_SUPPLIER,
    GET_INVITATION_STATUS,
    GET_SUPPLIER_IN_QUOTATION,
  ], invitationStatusSaga)
  yield takeEvery(PAUSE_PRODUCT, pauseProductSaga)
  yield takeEvery(LOAD_COMMENTS, commentsSaga)
  yield takeEvery(LOAD_Q_HISTORY, historySaga)
  yield takeLatest(POST_COMMENT, commentsSaga)
  yield fork(supplierQuotationsSaga)
}