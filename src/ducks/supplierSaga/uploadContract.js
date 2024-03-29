import { put, call, all } from 'redux-saga/effects'
import SuppliersApi from '../../requestor/supplier'

const UPLOAD_CONTRACT_START = 'UPLOAD_CONTRACT_START'
const UPLOAD_CONTRACT_DONE = 'UPLOAD_CONTRACT_DONE'
const UPLOAD_CONTRACT_ERROR = 'UPLOAD_CONTRACT_ERROR'

export function* saga({ type, payload }){
  yield put({ type: UPLOAD_CONTRACT_START })
  try{
    const allCalls = payload.files.map(p => call(SuppliersApi.uploadContract, { supplier: payload.supplier, file: p }))
    const response = yield all(allCalls)
    yield put({ type: UPLOAD_CONTRACT_DONE, payload: response })
    yield put({ type: 'GET_UPLOADED_CONTRACT', payload: payload.supplier })
  }catch(e){
    yield put({ type: UPLOAD_CONTRACT_ERROR, payload: e.message })
  }
}