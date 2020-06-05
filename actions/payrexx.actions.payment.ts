import {IPayRex} from "../types";
import {PayrexxActions} from "./payrexx.actions";
const qs    = require('qs');
const axios = require('axios');

interface IPayCreation {

    title:string
    //This is the page title which will be shown on the payment page.

    description:string
    //This is a description which will be shown on the payment page.

    psp?:any
    //The psp which should be used for the payment. (Can be an array of integers.)

    referenceId:string
    //An internal reference id used by your system.

    purpose:string
    //The purpose of the payment.

    amount:number
    //The amount of the payment in cents.

    vatRate:number
    //VAT rate percentage (double)

    currency: string
    //The currency of the payment.

    sku?:string
    //Product stock keeping unit

    preAuthorization?:boolean
    //Whether charge payment manually at a later date (type authorization).

    reservation?:any
    //Whether charge payment manually at a later date (type reservation).

    ApiSignature?:any
}

/**
 * This class represents all Payment Actions
 * https://developers.payrexx.com/reference#invoices-1
 *
 * @2020 Weslley De Souza
 * */
export class PaymentActions extends PayrexxActions{

    constructor(protected rex:IPayRex){
        super()
    }

    /**
     * Retrieve a payment link
     * endpoint:  https://api.payrexx.com/v1.0/Invoice/id/
     * */
    public get(id:number){
        let params = {};
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return   axios.get (this.getEndPoint(`${id}/`)+'&'+qs.stringify(params))
            .then(response=> this.successHandler(response,'get'))
            .catch(err => this.errorHandler(err));
    }

    /**
     * Create a payment link
     * @params :IPayCreation
     *
     * */
    public create(params:IPayCreation){

            let data             = qs.stringify(params);
            params.ApiSignature  = this.rex.auth.buildSignature(data);
            data                 = qs.stringify(params);

          return  axios.post (this.getEndPoint(),  data)
              .then(response=>this.successHandler(response,'create'))
                      .catch(err=> this.errorHandler(err))

    }

    /**
     * Remove a payment link
     * */
    public delete(id:number){
        let params             = {};
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return   axios.delete (this.getEndPoint(`${id}/`),{data:qs.stringify(params)})
            .then(response=> this.successHandler(response,'delete'))
             .catch(err => this.errorHandler(err));

    }

    private getEndPoint(path = '',instance = true){
        return  this.rex.getEndPoint()+'Invoice/'+ path
            + (instance ? ('?'+this.rex.auth.buildUrl({instance:this.rex.auth.getCredential().instance})):'')
    }

}
