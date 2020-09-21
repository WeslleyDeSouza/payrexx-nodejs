"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const payrexx_actions_1 = require("./payrexx.actions");
const qs_1 = require("qs");
const axios_1 = require("axios");
/**
 * This class represents all Gateway Actions
 * https://developers.payrexx.com/reference#gateway
 *
 * @2020 Weslley De Souza
 * */
class GatewayActions extends payrexx_actions_1.PayrexxActions {
    constructor(rex) {
        super();
        this.rex = rex;
    }
    get(id) {
        let params = {};
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return axios_1.default.get(this.getEndPoint(`${id}/`) + '&' + qs_1.default.stringify(params))
            .then(response => this.successHandler(response, 'get'))
            .catch(err => this.errorHandler(err));
    }
    create(params) {
        if (!params.amount) {
            throw new Error('Amount required!');
        }
        let data = qs_1.default.stringify(params);
        params.ApiSignature = this.rex.auth.buildSignature(data);
        data = qs_1.default.stringify(params);
        return axios_1.default.post(this.getEndPoint(), data)
            .then(response => this.successHandler(response, 'create'))
            .catch(err => this.errorHandler(err));
    }
    delete(id) {
        let params = {};
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return axios_1.default.delete(this.getEndPoint(`${id}/`), { data: qs_1.default.stringify(params) })
            .then(response => this.successHandler(response, 'delete'))
            .catch(err => this.errorHandler(err));
    }
    getEndPoint(path = '') {
        return this.rex.getEndPoint() + 'Gateway/' + path + '?' + this.rex.auth.buildUrl({ instance: this.rex.auth.getCredential().instance });
    }
}
exports.GatewayActions = GatewayActions;
