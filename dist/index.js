"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayRexx = void 0;
const payrexx_actions_subscriptions_1 = require("./actions/payrexx.actions.subscriptions");
const payrexx_auth_1 = require("./auth/payrexx.auth");
const payrexx_actions_payment_1 = require("./actions/payrexx.actions.payment");
const payrexx_actions_gateway_1 = require("./actions/payrexx.actions.gateway");
const axios_1 = require("axios");
const payrexx_actions_transaction_1 = require("./actions/payrexx.actions.transaction");
class PayRexx {
    // _instance:	The Payrexx instance name
    // _secret: 	The Payrexx api secret
    // _v:          REST API Version
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
        this.transactions = new payrexx_actions_transaction_1.TransactionActions(this);
        this.endPoint = `https://api.payrexx.com/${_v}/`;
    }
    /*
   * returns Base EndPoint
   * */
    getEndPoint() {
        return this.endPoint;
    }
    /*
* This endpoint can be used to verify the INSTANCE_API_SECRET to be correct.
* In case it is not correct, you get log of the error status.
* */
    checkSignature() {
        let queryParams = {};
        queryParams.instance = this._instance;
        queryParams.ApiSignature = this.auth.buildSignature('', this._secret);
        return axios_1.default.get(this.getEndPoint() + 'SignatureCheck/?' + this.auth.buildUrl(queryParams), {})
            .then(result => (result.data.status))
            .catch(err => console.log(err));
    }
}
exports.PayRexx = PayRexx;
