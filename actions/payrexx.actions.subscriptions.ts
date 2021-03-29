import {PayRexx} from "../index";
import {PayrexxActions} from "./payrexx.actions";
const axios = require('axios');
const qs    = require('qs');


interface ISubscription {
    userId:string
    //The contact id you got from webhook.

    psp:string
    //The ID of the psp to use.

    amount:string
    //The amount of the payment to fire in cents.

    currency:string
    //The ISO code of the currency of the payment.

    purpose:string
    //The payment purpose. What is the payer paying for?

    paymentInterval:string
    //The payment interval as string. (see PHP documentation of date interval for format)

    period:string
    //The subscription's period as string. (see PHP documentation of date interval for format)

    cancellationInterval:string
    //The interval of cancellation as string. (see PHP documentation of date interval for format)

    referenceId?:string
    //The internal reference id. (Will be sent back with Webhook, can be used as identification)

    ApiSignature?:any
}

/**
 * This class represents all Subscriptions Actions
 * https://developers.payrexx.com/reference#autologin
 * https://developers.payrexx.com/reference#subscription
 *
 * @2020 Weslley De Souza
 * */
export class SubscriptionsActions extends PayrexxActions{


    constructor(protected rex:PayRexx){
        super()
    }

    log(id){
        let params = {userId:id}
            params['ApiSignature'] = this.rex.auth.buildSignature(qs.stringify(params));

        return   axios.post (this.getEndPoint(),qs.stringify(params))
            .then(response=> this.successHandler(response,'get'))
            .catch(err => this.errorHandler(err));
    }

    get(id:number){
        let params = {}
        params['ApiSignature'] = this.rex.auth.buildSignature('')

        return   axios.get (this.getEndPoint(`${id}/`)+'&'+qs.stringify(params))
            .then(response=> this.successHandler(response,'get'))
            .catch(err => this.errorHandler(err));
    }

    create(params:ISubscription):Promise<any[]>{

        let data             =  qs.stringify(params);
        params.ApiSignature  = this.rex.auth.buildSignature(data);
        data                 = qs.stringify(params);

        return   axios.post (this.getEndPoint(),  data)
            .then(response=>this.successHandler(response,'create'))
            .catch(err=> this.errorHandler(err))

    }

    delete(id:number){
        let params             = {};
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return   axios.delete (this.getEndPoint(`${id}/`),{data:qs.stringify(params)})
            .then(response=> this.successHandler(response,'delete'))
            .catch(err => this.errorHandler(err));
    }


    private getEndPoint(path = ''){
        return  this.rex.getEndPoint()+'AuthToken/'+ path +'?'+this.rex.auth.buildUrl({instance:this.rex.auth.getCredential().instance})
    }

}


