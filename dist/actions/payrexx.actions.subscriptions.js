"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsActions = void 0;
const payrexx_actions_1 = require("./payrexx.actions");
const axios = require('axios');
const qs = require('qs');
/**
 * This class represents all Subscriptions Actions
 * https://developers.payrexx.com/reference#autologin
 * https://developers.payrexx.com/reference#subscription
 *
 * @2020 Weslley De Souza
 * */
class SubscriptionsActions extends payrexx_actions_1.PayrexxActions {
    constructor(rex) {
        super();
        this.rex = rex;
    }
    log(id) {
        let params = { userId: id };
        params['ApiSignature'] = this.rex.auth.buildSignature(qs.stringify(params));
        return axios.post(this.getEndPoint(), qs.stringify(params))
            .then(response => this.successHandler(response, 'get'))
            .catch(err => this.errorHandler(err));
    }
    get(id) {
        let params = {};
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return axios.get(this.getEndPoint(`${id}/`) + '&' + qs.stringify(params))
            .then(response => this.successHandler(response, 'get'))
            .catch(err => this.errorHandler(err));
    }
    create(params) {
        let data = qs.stringify(params);
        params.ApiSignature = this.rex.auth.buildSignature(data);
        data = qs.stringify(params);
        return axios.post(this.getEndPoint(), data)
            .then(response => this.successHandler(response, 'create'))
            .catch(err => this.errorHandler(err));
    }
    delete(id) {
        let params = {};
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return axios.delete(this.getEndPoint(`${id}/`), { data: qs.stringify(params) })
            .then(response => this.successHandler(response, 'delete'))
            .catch(err => this.errorHandler(err));
    }
    getEndPoint(path = '') {
        return this.rex.getEndPoint() + 'AuthToken/' + path + '?' + this.rex.auth.buildUrl({ instance: this.rex.auth.getCredential().instance });
    }
}
exports.SubscriptionsActions = SubscriptionsActions;
//# sourceMappingURL=payrexx.actions.subscriptions.js.map