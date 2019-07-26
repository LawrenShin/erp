import { takeEvery, put, call, select } from 'redux-saga/effects'
import QuotationsApi from '../../requestor/quotations'
import { createSelector } from 'reselect'
import { history } from '../../routes/history'

const init = () => ({
  error: '',
  loading: '',
  response: '',
  created: ''
})

const CREATE_Q_START = 'CREATE_Q_START'
const CREATE_Q_DONE = 'CREATE_Q_DONE'
const CREATE_Q_ERROR = 'CREATE_Q_ERROR'

const REQUEST_LIST_Q = 'REQUEST_LIST_Q'

export default function reducer(state = init(), action){
  if(action){
    const {type, payload} = action

    switch(type){
      case CREATE_Q_START:
        return { ...state, loading: true }
      case CREATE_Q_DONE:
        return { ...state, loading: false, response: payload, created: true }
      case CREATE_Q_ERROR:
        return { ...state, loading: false, error: payload }

      default: 
        return state
    }
  }
}

export const createQuotationState = state => state.quotations.createQuotationReducer

export function* createQuotationSaga({ type, payload }){
  yield put({ type: CREATE_Q_START })
  try{
    const createdQ = yield call( QuotationsApi.createQuotation, payload )
    yield put({ type: CREATE_Q_DONE, payload: createdQ })
    yield history.push(`/quotations/${createdQ.id}`)
    yield put({ type: REQUEST_LIST_Q })
  }catch(e){
    yield put({ type: CREATE_Q_ERROR, payload: e.message })
  }
}