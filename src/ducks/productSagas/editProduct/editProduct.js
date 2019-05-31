import { call, put, takeEvery } from 'redux-saga/effects'


const EDIT_PRODUCT = 'EDIT_PRODUCT'

function* editProductSaga(action){
  yield put({ type: 'EDIT_PRODUCT_accepted' })
}

export function* saga(){
  yield takeEvery( EDIT_PRODUCT, editProductSaga )
}