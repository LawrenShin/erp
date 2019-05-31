import { takeEvery, put, call, fork } from 'redux-saga/effects'
import SuppliersApi from '../../requestor/supplier'

const GET_UPLOADED_CONTRACT = 'GET_UPLOADED_CONTRACT'
const DELETE_UPLOADED_CONTRACT = 'DELETE_UPLOADED_CONTRACT'

const GET_UPLOADED_CONTRACT_START = 'GET_UPLOADED_CONTRACT_START'
const GET_UPLOADED_CONTRACT_DONE = 'GET_UPLOADED_CONTRACT_DONE'
const GET_UPLOADED_CONTRACT_ERROR = 'GET_UPLOADED_CONTRACT_ERROR'

const DELETE_UPLOADED_CONTRACT_START = 'DELETE_UPLOADED_CONTRACT_START'
const DELETE_UPLOADED_CONTRACT_DONE = 'DELETE_UPLOADED_CONTRACT_DONE'
const DELETE_UPLOADED_CONTRACT_ERROR = 'DELETE_UPLOADED_CONTRACT_ERROR'



export function* saga(){
  yield takeEvery(GET_UPLOADED_CONTRACT, getSaga)
  yield takeEvery(DELETE_UPLOADED_CONTRACT, deleteSaga)
}

export function* getSaga({ payload }){
  yield put({ type: GET_UPLOADED_CONTRACT_START })
  try{
    const response = yield call(SuppliersApi.getUploadedContract, payload)
    yield put({ type: GET_UPLOADED_CONTRACT_DONE, payload: response.results })
  }catch(e){
    yield put({ type: GET_UPLOADED_CONTRACT_ERROR, payload: e.message })
  }
}
export function* deleteSaga({ payload }){
  yield put({ type: DELETE_UPLOADED_CONTRACT_START })
  try{
    const response = yield call(SuppliersApi.deleteUploadedContract, payload.fileId)
    yield put({ type: DELETE_UPLOADED_CONTRACT_DONE, payload: response })
    yield put({ type: GET_UPLOADED_CONTRACT, payload: payload.supplierId })
  }catch(e){
    yield put({ type: DELETE_UPLOADED_CONTRACT_ERROR, payload: e.message })
  }
}