const Base64     = require('crypto-js/enc-base64')
const hmacSHA256 = require('crypto-js/hmac-sha256')

/**
 * Auth helper class
 * @Weslley De Souza 2020
 * */
export class AuthHelper {

    constructor(private _instance,private _secret){}

    getCredential(){
        return {
            instance:this._instance,
            secret:this._secret,
        }
    }

    buildSignature(query , secret=this._secret , digTo = 'base64') {
        return Base64.stringify(hmacSHA256(query, secret))
    }

    buildUrl      (json  , qUri = '',escape = false) {
        for(const key in json){

            qUri+= escape ? encodeURI(`${key}=${json[key]}&`) :`${key}=${json[key]}&`
        }
        return qUri.substr(0,qUri.length-1);
    }

}
