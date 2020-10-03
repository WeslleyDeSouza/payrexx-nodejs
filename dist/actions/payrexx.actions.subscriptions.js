"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsActions = void 0;
const payrexx_actions_1 = require("./payrexx.actions");
var qs = require('qs');
var axios = require('axios');
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
    /**
     * Login a Subscription Customer
     * @Param id:int32 The contact id you received through webhook data.
     * */
    login(id) {
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
    /**
     * Create a New Subscription
     * */
    create(params) {
        /**
         https://www.php.net/manual/de/dateinterval.construct.php
         Y	Jahre
         M	Monate
         D	Tage
         W	Wochen. Diese werden in Tage umgerechnet und können daher nicht mit D kombiniert werden.
         H	Stunden
         M	Minuten
         S	Sekunden

         once a month = P1M
         * */
        let data = qs.stringify(params);
        params.ApiSignature = this.rex.auth.buildSignature(data);
        data = qs.stringify(params);
        return axios.post(this.getEndPoint(), data)
            .then(response => this.successHandler(response, 'create'))
            .catch(err => this.errorHandler(err));
    }
    /**
     * update a Subscription
     * */
    update(id, params) {
        let data = qs.stringify(params);
        params.ApiSignature = this.rex.auth.buildSignature(data);
        data = qs.stringify(params);
        return axios.post(this.getEndPoint(id), data)
            .then(response => this.successHandler(response, 'create'))
            .catch(err => this.errorHandler(err));
    }
    /**
     * Remove a Subscription
     * @Param id:number
     * */
    delete(id) {
        let params = {};
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return axios.delete(this.getEndPoint(`${id}/`), { data: qs.stringify(params) })
            .then(response => this.successHandler(response, 'delete'))
            .catch(err => this.errorHandler(err));
    }
    getEndPoint(path = '') {
        return this.rex.getEndPoint() + 'Subscription/' + path + '?' + this.rex.auth.buildUrl({ instance: this.rex.auth.getCredential().instance });
    }
}
exports.SubscriptionsActions = SubscriptionsActions;
