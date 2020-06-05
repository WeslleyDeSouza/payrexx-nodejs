import {SubscriptionsActions} from "./actions/payrexx.actions.subscriptions";

const axios     = require('axios');
import {IPayRex} from "./types";

import {AuthHelper} from "./auth/payrexx.auth";

import {PaymentActions} from "./actions/payrexx.actions.payment";
import {GatewayActions} from "./actions/payrexx.actions.gateway";

export class PayRexx implements IPayRex{

    private endPoint;

    public auth:AuthHelper        = new AuthHelper(this._instance,this._secret);

    /**
     * actions
     * */
    public payment:PaymentActions             = new PaymentActions(this);
    public gateway:GatewayActions             = new GatewayActions(this);
    public subscriptions:SubscriptionsActions = new SubscriptionsActions(this);


    constructor(private _instance,private _secret,private _v = 'v1.0'){
        this.endPoint = `https://api.payrexx.com/${_v}/`;
    }

    /*
   * returns Base EndPoint
   * */
    getEndPoint(){
        return this.endPoint;
    }

    /*
* This endpoint can be used to verify the INSTANCE_API_SECRET to be correct.
* In case it is not correct, you get log of the error status.
* */
    checkSignature():Promise<boolean>{

        let queryParams:any  = {};

        queryParams.instance     = this._instance;
        queryParams.ApiSignature = this.auth.buildSignature('',this._secret);

        return     axios.get (this.getEndPoint()+'SignatureCheck/?'+this.auth.buildUrl(queryParams), {})
            .then(result=> (result.data.status))
            .catch(err=> console.log(err))
    }

}




