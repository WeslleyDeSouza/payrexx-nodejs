const Base64     = require('crypto-js/enc-base64');
const hmacSHA256 = require('crypto-js/hmac-sha256');
import axios from "axios";

/**
 * Auth helper class
 * @Author: Weslley De Souza 2020
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
        for(const key in json) qUri+= escape ? encodeURI(`${key}=${json[key]}&`) :`${key}=${json[key]}&`
        return qUri.substr(0,qUri.length-1);
    }

    checkSignature(endPointV:string):Promise<boolean>{

        let queryParams:any      = {};
        queryParams.instance     = this._instance;
        queryParams.ApiSignature = this.buildSignature('',this._secret);

        return axios.get (endPointV + 'SignatureCheck/?'+this.buildUrl(queryParams), {})
                     .then(result=> (result.data.status))
                      .catch(err=> console.log(err))
    }

}
