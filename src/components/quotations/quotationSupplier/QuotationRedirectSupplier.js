import React from 'react'
import { history } from '../../../routes/history'

const QuotationRedirectSupplier = (props) => {
  const {decision , id} = props.match.params
  if(decision === 'accepted') history.push(`/quotations/view/${id}`)
  if(decision === 'waiting') history.push(`/quotations/decide/${id}`)
  return <></>
}

export default QuotationRedirectSupplier