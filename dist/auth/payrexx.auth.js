"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enc_base64_1 = require("crypto-js/enc-base64");
const enc_base64_2 = require("crypto-js/enc-base64");
/**
 * Auth helper class
 * @Weslley De Souza 2020
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
        return enc_base64_1.default.stringify(enc_base64_2.default(query, secret));
    }
    buildUrl(json, qUri = '', escape = false) {
        for (const key in json) {
            qUri += escape ? encodeURI(`${key}=${json[key]}&`) : `${key}=${json[key]}&`;
        }
        return qUri.substr(0, qUri.length - 1);
    }
}
exports.AuthHelper = AuthHelper;
