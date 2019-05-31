import { all } from 'redux-saga/effects'
import { saga as productSaga } from '../ducks/productSagas/productSaga'
import { saga as quotationsSaga } from '../ducks/quotations'
import { saga as supplierSaga } from '../ducks/supplierSaga'

export default function* rootSaga(){
  yield all([ productSaga(), quotationsSaga(), supplierSaga() ])
}