"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHelper = void 0;
const Base64 = require('crypto-js/enc-base64');
const hmacSHA256 = require('crypto-js/hmac-sha256');
const axios_1 = require("axios");
/**
 * Auth helper class
 * @Author: Weslley De Souza 2020
 * */
class AuthHelper {
    constructor(_instance, _secret) {
        this._instance = _instance;
        this._secret = _secret;
    }
    getCredential() {
        return {
            instance: this._instance,
            secret: this._secret,
        };
    }
    buildSignature(query, secret = this._secret, digTo = 'base64') {
        return Base64.stringify(hmacSHA256(query, secret));
    }
    buildUrl(json, qUri = '', escape = false) {
        for (const key in json)
            qUri += escape ? encodeURI(`${key}=${json[key]}&`) : `${key}=${json[key]}&`;
        return qUri.substr(0, qUri.length - 1);
    }
    checkSignature(endPointV) {
        let queryParams = {};
        queryParams.instance = this._instance;
        queryParams.ApiSignature = this.buildSignature('', this._secret);
        return axios_1.default.get(endPointV + 'SignatureCheck/?' + this.buildUrl(queryParams), {})
            .then(result => (result.data.status))
            .catch(err => console.log(err));
    }
}
exports.AuthHelper = AuthHelper;
