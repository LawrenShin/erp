import Api, { Swisskit } from './api'

const getQuotationFilters = () => Api.get('introspect/inspect_filters/?url=/api/quotations/quotation/')
// const getQuotationProductFilters = () => Api.get('introspect/inspect_filters/?url=/api/quotations/product/')
// const getQuotationSupplierFilters = () => Api.get('introspect/inspect_filters/?url=/api/quotations/supplier/')

const createQuotation = (params) => Api.post(`quotations/quotation/`, true, params)

const addProductToQuotation = (params) => Api.post(`quotations/product_item/`, true, params)
const deleteProductFromQuotation = (id) => Api.delete(`quotations/product_item/${id}/`)
const getProductsInQuotation = (id) => Api.get(`quotations/product_item/?quotation=${id}`)

const getSuppliersInQuotation = (id) => Api.get(`quotations/supplier_item/?quotation=${id}`)
const deleteSupplierFromQuotation = (id) => Api.delete(`quotations/supplier_item/${id}/`)
const addSupplierToQuotation = (params) => Api.post(`quotations/supplier_item/`, true, params)

const distributeSupplierToProduct = (params) => Api.post(`quotations/distribution/`, true, params)
const getDistributedSuppliers = (id) => Api.get(`quotations/distribution/?quotation=${id}`)

const getQuotationsList = (options) => Api.get(`quotations/quotation/${Swisskit.gatherParameters(options)}`)

const getProductsForQuotation = (options) => Api.get(`quotations/product/${Swisskit.gatherParameters(options)}`)
const getSuppliersForQuotation = (options) => Api.get(`quotations/supplier/${Swisskit.gatherParameters(options)}`)

const introspectFilters = (kind) => {
  if(kind === 'products') kind = '/api/quotations/product/'
  if(kind === 'suppliers') kind = '/api/quotations/supplier/'

  return Api.get(`introspect/inspect_filters/?url=${kind}`)
}

export default {
  getQuotationFilters,
  // getQuotationProductFilters,
  // getQuotationSupplierFilters,
  getQuotationsList,
  createQuotation,
  introspectFilters,
  addProductToQuotation,
  deleteProductFromQuotation,
  getProductsInQuotation,
  getSuppliersInQuotation,
  deleteSupplierFromQuotation,
  addSupplierToQuotation,
  getDistributedSuppliers,
  distributeSupplierToProduct,
  getProductsForQuotation,
  getSuppliersForQuotation,
}