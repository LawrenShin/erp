import { all } from 'redux-saga/effects'
import { saga as createProductSaga } from '../ducks/createProduct/index'

export default function* rootSaga(){
  yield all([ createProductSaga() ])
}