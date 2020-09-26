import {IPayCreation, IPayRex} from "../types";
import {PayrexxActions} from "./payrexx.actions";

var qs = require('qs');
var axios = require('axios');

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

            if(params.title.includes(' ')){
                console.warn('title','SPACE NOT ALLOWED')
            }
            if(params.description.includes(' ')){
                console.warn('description','WHITESPACE NOT ALLOWED')
            }

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
