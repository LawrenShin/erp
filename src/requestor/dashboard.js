import Api from './api';
import {collectOptions} from './common';

//products
const getFilters = () => Api.get(`dashboard/get_dashboard_filters/`);

const list = (options = '') => Api.get(`dashboard/dashboard/${collectOptions(options)}`);

const getRaiting = (query) => Api.post(`supplier/get_dashboard_suppliers_financial_rating/`, true, { query });

const getPackingList = (options = '') => {
    console.log( options )
    return Api.get(`supplier/get_dashboard_packing_list/${collectOptions(options)}`)
};

//stuff dashboard
const getWeeklyPayments = () => Api.get('dashboards/payment_manager_weekly_payments/');
const getReconsiderTerms = () => Api.get('dashboards/payment_manager_reconsider_payment_terms/');

//sourcing manager
const getTestSuppliers = () => Api.get('dashboards/sourcing_manager_suppliers_with_test_status/');
const getTop30Suppliers = (name) => Api.post('dashboards/sourcing_manager_top_30_suppliers/', true, {query: name});
const getNlgCapacityChart = () => Api.get('dashboards/sourcing_manager_ngl_capacity/');


export default {
    getFilters,
    list,
    getRaiting,
    getPackingList,
    getTestSuppliers,
    getTop30Suppliers,
    getWeeklyPayments,
    getReconsiderTerms,
    getNlgCapacityChart
}