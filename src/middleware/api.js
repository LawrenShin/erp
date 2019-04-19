import {Auth, Common, Customer, Product, Supplier, Dashboard, Messages, Quotation, Order} from '../requestor';

export default class Api {
    static create(type, method, params = []) {

        const map = {
            'auth': Auth,
            'common': Common,
            'customer': Customer,
            'product': Product,
            'supplier': Supplier,
            'dashboard': Dashboard,
            'messages': Messages,
            'quotation': Quotation,
            'order': Order
        }

        return map[type][method](...params);
    }
}