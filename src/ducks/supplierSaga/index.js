import { takeEvery, fork, all } from 'redux-saga/effects'

import { saga as uploadContractSaga } from './uploadContract'
import { getSaga, deleteSaga } from './uploadedContract'

const UPLOAD_CONTRACT = 'UPLOAD_CONTRACT'
// const GET_UPLOADED_CONTRACT = 'GET_UPLOADED_CONTRACT'
// const DELETE_UPLOADED_CONTRACT = 'DELETE_UPLOADED_CONTRACT'

const init = () => ({
  uploaded: {
    status: '',
    data: false,
    error: '',
    supplier: '',
  },
  loading: {
    status: '',
    error: '',
    bar: '',
  }
})

export default function filesReducer(state = init(), action){
  if(action){
    const { type, payload } = action
    switch(type){
      case 'REFRESH_CONTRACT':
        return init()

      case 'GET_UPLOADED_CONTRACT_START': 
        return { ...state, uploaded: { ...state.uploaded, status: 'loading', supplier: payload } }
      case 'GET_UPLOADED_CONTRACT_DONE': 
        return { ...state, uploaded: { ...state.uploaded, status: 'loaded', data: payload } }
      case 'GET_UPLOADED_CONTRACT_ERROR': 
        return { ...state, uploaded: { ...state.uploaded, status: 'failed', error: payload } }
      
      case 'UPLOAD_CONTRACT_START': 
        return { ...state, loading: { ...state.loading, status: 'loading' } }
      case 'UPLOAD_CONTRACT_DONE': 
        return { ...state, loading: { ...state.loading, status: 'loaded' } }
      case 'UPLOAD_CONTRACT_ERROR': 
        return { ...state, loading: { ...state.loading, status: 'failed', error: payload.message } }
      
      default: 
        return state
    }
  }
}

export function* saga(action){
  yield console.log('from supplier index saga', action)
  yield takeEvery(UPLOAD_CONTRACT, uploadContractSaga)
  yield takeEvery('GET_UPLOADED_CONTRACT', getSaga)
  yield takeEvery('DELETE_UPLOADED_CONTRACT', deleteSaga)
  // yield fork(uploadedContractSaga)
}