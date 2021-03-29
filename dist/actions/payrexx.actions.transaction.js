"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionActions = void 0;
const payrexx_actions_1 = require("./payrexx.actions");
var qs = require('qs');
var axios = require('axios');
/**
 * This class represents all Transactions Actions
 * https://developers.payrexx.com/reference#transaction
 * Not tested yed
 * @2020 Weslley De Souza
 * */
class TransactionActions extends payrexx_actions_1.PayrexxActions {
    constructor(rex) {
        super();
        this.rex = rex;
    }
    // TRANSACTION get Retrieve a Transaction(s)
    get(id, single = true) {
        let params = {};
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return axios.get(this.getEndPoint(`${single ? id : ''}/`) + '&' + qs.stringify(params))
            .then(response => this.successHandler(response, 'get'))
            .catch(err => this.errorHandler(err));
    }
    create(params) {
        return new Promise(resolve => {
            console.log('create Transaction not implemented');
            resolve(null);
        });
    }
    capture(id, params = {}) {
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return axios.post(this.getEndPoint(`${id}/capture`), { data: qs.stringify(params) })
            .then(response => this.successHandler(response, 'create'))
            .catch(err => this.errorHandler(err));
    }
    charge(id, params = {}) {
        let data = qs.stringify(params);
        params.ApiSignature = this.rex.auth.buildSignature(data);
        data = qs.stringify(params);
        return axios.post(this.getEndPoint(), data)
            .then(response => this.successHandler(response, 'create'))
            .catch(err => this.errorHandler(err));
    }
    refund(id, params = {}) {
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return axios.post(this.getEndPoint(`${id}/refund`), { data: qs.stringify(params) })
            .then(response => this.successHandler(response, 'create'))
            .catch(err => this.errorHandler(err));
    }
    delete(id) {
        let params = {};
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return axios.delete(this.getEndPoint(`${id}/capture`), { data: qs.stringify(params) })
            .then(response => this.successHandler(response, 'delete'))
            .catch(err => this.errorHandler(err));
    }
    getEndPoint(path = '') {
        return this.rex.getEndPoint() + 'Transaction/' + path + '?' + this.rex.auth.buildUrl({ instance: this.rex.auth.getCredential().instance });
    }
}
exports.TransactionActions = TransactionActions;
//# sourceMappingURL=payrexx.actions.transaction.js.map