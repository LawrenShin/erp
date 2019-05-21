import { all } from 'redux-saga/effects'
import { saga as createProductSaga } from '../ducks/createProduct/index'
import { saga as quotationsSaga } from '../ducks/quotations'

export default function* rootSaga(){
  yield all([ createProductSaga(), quotationsSaga() ])
}