"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
const payrexx_auth_1 = require("./auth/payrexx.auth");
const payrexx_actions_payment_1 = require("./actions/payrexx.actions.payment");
const payrexx_actions_gateway_1 = require("./actions/payrexx.actions.gateway");
const payrexx_actions_subscriptions_1 = require("./actions/payrexx.actions.subscriptions");
class PayRexx {
    constructor(_instance, _secret, _v = 'v1.0') {
        this._instance = _instance;
        this._secret = _secret;
        this._v = _v;
        this.auth = new payrexx_auth_1.AuthHelper(this._instance, this._secret);
        /**
         * actions
         * */
        this.payment = new payrexx_actions_payment_1.PaymentActions(this);
        this.gateway = new payrexx_actions_gateway_1.GatewayActions(this);
        this.subscriptions = new payrexx_actions_subscriptions_1.SubscriptionsActions(this);
        this.endPoint = `https://api.payrexx.com/${_v}/`;
    }
    /*
     *  URL EndPoint
     * */
    getEndPoint() {
        return this.endPoint;
    }
    getApiSignature(query = '') {
        return this.auth.buildSignature(query, this._secret);
    }
    /*
* This endpoint can be used to verify the INSTANCE_API_SECRET to be correct.
* In case it is not correct, you get log of the error status.
* */
    checkSignature() {
        let queryParams = {};
        queryParams.instance = this._instance;
        queryParams.ApiSignature = this.getApiSignature();
        return axios.get(this.getEndPoint() + 'SignatureCheck/?' + this.auth.buildUrl(queryParams), {})
            .then(result => (result.data.status))
            .catch(err => console.log(err));
    }
}
exports.default = PayRexx;
//# sourceMappingURL=index.js.map