import { all, fork, cancel, take } from 'redux-saga/effects'
// import { LOCATION_CHANGE } from 'react-router-redux';
import { saga as productSaga } from '../ducks/productSagas/productSaga'
import { saga as quotationsSaga } from '../ducks/quotations'
import { saga as supplierSaga } from '../ducks/supplierSaga'

export function* rootSaga(){
  yield all([ productSaga(), quotationsSaga(), supplierSaga() ])
  // const watchers = [
  //   yield fork(productSaga),
  //   yield fork(quotationsSaga),
  //   yield fork(supplierSaga),
  // ]
  // yield take(LOCATION_CHANGE)
  // watchers.forEach(cancel)
}
export default rootSaga