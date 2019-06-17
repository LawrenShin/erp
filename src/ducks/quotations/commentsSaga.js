import { put, call, select } from 'redux-saga/effects'
import QuotationsApi from '../../requestor/quotations'

const init = () => ({
  loading: false,
  data: false,
  error: false,
})

export function commentsReducer(state = init(), action){
  if(action){
    const { type, payload } = action
    switch(type){
      case 'LOAD_COMMENTS_START':
        return { ...state, loading: true }
      case 'LOAD_COMMENTS_DONE':
        return { ...state, loading: false, data: payload }
      case 'LOAD_COMMENTS_ERROR':
        return { ...state, loading: false, error: payload }

      default: 
        return state
    }
  }
}

const quotationIdSelector = (state) => state.quotations.currentQuotationReducer.currentQuotation.data.id

export function* commentsSaga({ type, payload }){
  if(type === 'POST_COMMENT'){
    try{
      const postRes = yield call(QuotationsApi.postComment, payload)
      const quotationId = yield select(quotationIdSelector)
      yield put({ type: 'LOAD_COMMENTS', payload: quotationId })
    }catch(e){
      yield put({ type: 'POST_ERROR', payload: e.message })
    }
  }

  if(type === 'LOAD_COMMENTS'){
    yield put({ type: 'LOAD_COMMENTS_START' })
    try{
      const res = yield call(QuotationsApi.getComments, payload)
      yield put({ type: 'LOAD_COMMENTS_DONE', payload: res.results })
    }catch(e){
      yield put({ type: 'LOAD_COMMENTS_ERROR', payload: e.message })
    }
  }
}