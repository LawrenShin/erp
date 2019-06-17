import Api, { Swisskit } from './api'

// all quotations
const getQuotationsList = (options) => Api.get(`quotations/quotation/${Swisskit.gatherParameters(options)}`)
const getQuotationFilters = () => Api.get('introspect/inspect_filters/?url=/api/quotations/quotation/')
const createQuotation = (params) => Api.post(`quotations/quotation/`, true, params)
const getQuotation = (id) => Api.get(`quotations/quotation/${id}/`)

// lists for selection in modals
const getProductsForQuotation = (options) => Api.get(`quotations/product/${Swisskit.gatherParameters(options)}`)
const getSuppliersForQuotation = (options) => Api.get(`quotations/supplier/${Swisskit.gatherParameters(options)}`)

// filters for modals
const introspectFilters = (kind) => {
  if(kind === 'products') kind = '/api/quotations/product/'
  if(kind === 'suppliers') kind = '/api/quotations/supplier/'

  return Api.get(`introspect/inspect_filters/?url=${kind}`)
}

// MODALS BELOW

// list of relations to display what were added
const getAddedProductsRelation = (id) => Api.get(`quotations/product_item/?quotation=${id}`)
const pauseProductsRelation = ({ id, pause, product_id, quotation_id }) => {
  return Api.put(`quotations/product_item/${id}/`, true, { id, pause: !pause, product: product_id, quotation: quotation_id })
}
// add / delete relations
const addProductToQuotation = (params) => Api.post(`quotations/product_item/`, true, params)
const deleteProductFromQuotation = (params) => Api.post(`quotations/delete_product_from_quotation/`, true, params)

// list of relations to display what were added
const getAddedSuppliersRelation = (id) => Api.get(`quotations/supplier_item/?quotation=${id}`)
// add / delete relations
const deleteSupplierFromQuotation = (params) => Api.post(`quotations/delete_supplier_from_quotation/`, true, params)
const addSupplierToQuotation = (params) => Api.post(`quotations/supplier_item/`, true, params)

// list of products for distribution modal and main table in quotation item)
const getAddedProducts = (id) => Api.get(`quotations/distribution_product/?quotation=${id}`)
const getAddedSuppliers = (id) => Api.get(`quotations/distribution_supplier/?quotation=${id}`)

const distributeSupplierToProduct = (params) => Api.post(`quotations/distribution/`, true, params)
const deleteSupplierFromProduct = (params) => Api.post(`quotations/delete_distribution_from_quotation/`, true, params)
const getDistributedRelations = (id) => Api.get(`quotations/distribution/?quotation=${id}`)
// get list of suppliers for invitation modal
const getInvitationStatus = (id) => Api.get(`quotations/invitation_status/?quotation=${id}`)
// actions of invitation modal
const sendInvitation = (params) => Api.post(`quotations/send_invitation/`, true, params)
const remindSupplier = (params) => Api.post(`quotations/supplier_remind_quotation/`, true, params)
const getSupplierInQuotation = (params) => Api.post(`quotations/supplier_get_in_quotation/`, true, params)
// comments
const postComment = (params) => Api.post(`quotations/product_item_comment/`, true, params)
const getComments = () => Api.get(`quotations/product_item_comment/`)
// history
const quotationHistory = (id) => Api.get(`quotations/quotations_history/?distribution__quotation__id=${id}`)
// SUPPLIER
const getNotifications = () => Api.get(`notifications/get_notifications`)
const getQuotationsForSupplier = () => Api.get(`quotations_supplier/quotations`)
const decideOnQuotation = (params) => Api.post(`quotations_supplier/supplier_decision/`, true, params)
const productsListForSupplierQuotation = (id) => Api.get(`quotations_supplier/get_product_list?quotation_id=${id}`)
const declineProduct = (params) => Api.post(`quotations_supplier/distribution_decline`, true, params)
const sendPrice = (params) => {
  console.log(params)
  return Api.post(`quotations_supplier/change_price`, true, params)
}
const requestChanges = (id) => Api.get(`quotations_supplier/get_request_changes?quotation_id=${id}`)

export default {
  getNotifications,
  sendPrice,
  getQuotationFilters,
  getQuotationsList,
  createQuotation,
  introspectFilters,
  addProductToQuotation,
  deleteProductFromQuotation,
  getAddedProductsRelation,
  getAddedSuppliersRelation,
  deleteSupplierFromQuotation,
  addSupplierToQuotation,
  distributeSupplierToProduct,
  getProductsForQuotation,
  getSuppliersForQuotation,
  getAddedSuppliers,
  getAddedProducts,
  getQuotation,
  getDistributedRelations,
  deleteSupplierFromProduct,
  getInvitationStatus,
  sendInvitation,
  remindSupplier,
  getSupplierInQuotation,
  pauseProductsRelation,
  postComment,
  getComments,
  getQuotationsForSupplier,
  decideOnQuotation,
  productsListForSupplierQuotation,
  declineProduct,
  quotationHistory,
  requestChanges,
}