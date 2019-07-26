import { takeEvery, put, takeLatest, call, select, take } from 'redux-saga/effects'
import QuotationsApi from '../../../requestor/quotations'

const triggerDownload = (response, name) => {
  const url = window.URL.createObjectURL(new Blob([response]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `all_tech_pack_${name.replace(' ', '_')}.zip`);
  document.body.appendChild(link);
  link.click();
}

export function* allTechPackSaga({ type, payload: {name, id} }){
    const response = yield call(QuotationsApi.allTechFetch, id)
    yield console.log(response)
    if(response.status === 404) yield put({ type: 'ALL_TECH_PACK_DOWNLOAD_ERROR', payload: response.statusText })
    if(response.status === 200) yield triggerDownload(response, name)
}