"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentActions = void 0;
const payrexx_actions_1 = require("./payrexx.actions");
var qs = require('qs');
var axios = require('axios');
/**
 * This class represents all Payment Actions
 * https://developers.payrexx.com/reference#invoices-1
 *
 * @2020 Weslley De Souza
 * */
class PaymentActions extends payrexx_actions_1.PayrexxActions {
    constructor(rex) {
        super();
        this.rex = rex;
    }
    /**
     * Retrieve a payment link
     * endpoint:  https://api.payrexx.com/v1.0/Invoice/id/
     * */
    get(id) {
        let params = {};
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return axios.get(this.getEndPoint(`${id}/`) + '&' + qs.stringify(params))
            .then(response => this.successHandler(response, 'get'))
            .catch(err => this.errorHandler(err));
    }
    /**
     * Create a payment link
     * @params :IPayCreation
     *
     * */
    create(params) {
        let data = qs.stringify(params);
        params.ApiSignature = this.rex.auth.buildSignature(data);
        data = qs.stringify(params);
        return axios.post(this.getEndPoint(), data)
            .then(response => this.successHandler(response, 'create'))
            .catch(err => this.errorHandler(err));
    }
    /**
     * Remove a payment link
     * */
    delete(id) {
        let params = {};
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return axios.delete(this.getEndPoint(`${id}/`), { data: qs.stringify(params) })
            .then(response => this.successHandler(response, 'delete'))
            .catch(err => this.errorHandler(err));
    }
    getEndPoint(path = '', instance = true) {
        return this.rex.getEndPoint() + 'Invoice/' + path
            + (instance ? ('?' + this.rex.auth.buildUrl({ instance: this.rex.auth.getCredential().instance })) : '');
    }
}
exports.PaymentActions = PaymentActions;
