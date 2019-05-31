import { all } from 'redux-saga/effects'
import { saga as editProductSaga } from './editProduct/editProduct'
import { saga as createProductSaga } from './createProduct/index'

export function* saga(){
  yield all([ editProductSaga(), createProductSaga() ])
}