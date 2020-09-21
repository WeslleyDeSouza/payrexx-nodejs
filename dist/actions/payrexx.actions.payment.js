"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const payrexx_actions_1 = require("./payrexx.actions");
const qs_1 = require("qs");
const axios_1 = require("axios");
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
        return axios_1.default.get(this.getEndPoint(`${id}/`) + '&' + qs_1.default.stringify(params))
            .then(response => this.successHandler(response, 'get'))
            .catch(err => this.errorHandler(err));
    }
    /**
     * Create a payment link
     * @params :IPayCreation
     *
     * */
    create(params) {
        let data = qs_1.default.stringify(params);
        params.ApiSignature = this.rex.auth.buildSignature(data);
        data = qs_1.default.stringify(params);
        return axios_1.default.post(this.getEndPoint(), data)
            .then(response => this.successHandler(response, 'create'))
            .catch(err => this.errorHandler(err));
    }
    /**
     * Remove a payment link
     * */
    delete(id) {
        let params = {};
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return axios_1.default.delete(this.getEndPoint(`${id}/`), { data: qs_1.default.stringify(params) })
            .then(response => this.successHandler(response, 'delete'))
            .catch(err => this.errorHandler(err));
    }
    getEndPoint(path = '', instance = true) {
        return this.rex.getEndPoint() + 'Invoice/' + path
            + (instance ? ('?' + this.rex.auth.buildUrl({ instance: this.rex.auth.getCredential().instance })) : '');
    }
}
exports.PaymentActions = PaymentActions;
