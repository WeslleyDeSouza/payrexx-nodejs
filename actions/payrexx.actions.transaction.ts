import {IPayRex} from "../types";
import {PayrexxActions} from "./payrexx.actions";
const axios = require('axios');
const qs    = require('qs');


/**
 * This class represents all Transactions Actions
 * https://developers.payrexx.com/reference#transaction
 * Not tested yed
 * @2020 Weslley De Souza
 * */
export class TransactionActions extends PayrexxActions{


    constructor(protected rex:IPayRex){
        super()
    }

    // TRANSACTION get Retrieve a Transaction(s)
    public get(id:number,single=true){
        let params = {}
        params['ApiSignature'] = this.rex.auth.buildSignature('')

        return   axios.get (this.getEndPoint(`${single ? id :''}/`)+'&'+qs.stringify(params))
            .then(response=> this.successHandler(response,'get'))
            .catch(err => this.errorHandler(err));
    }

    public create(params: any) {
        console.log('create not implemented')
    }

    public capture(id,params={}) {
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return  axios.post (this.getEndPoint(`${id}/capture`),  {data:qs.stringify(params)})
            .then(response=>this.successHandler(response,'create'))
            .catch(err=> this.errorHandler(err))

    }

    public charge(id,params:any={}) {

        let data             = qs.stringify(params);
        params.ApiSignature  = this.rex.auth.buildSignature(data);
        data                 = qs.stringify(params);

        return  axios.post (this.getEndPoint(),  data)
            .then(response=>this.successHandler(response,'create'))
             .catch(err=> this.errorHandler(err))

    }

    public refund(id,params={})  {
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return  axios.post (this.getEndPoint(`${id}/refund`),  {data:qs.stringify(params)})
            .then(response=>this.successHandler(response,'create'))
            .catch(err=> this.errorHandler(err))

    }

    public delete(id:number){
        let params             = {};
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return   axios.delete (this.getEndPoint(`${id}/capture`),{data:qs.stringify(params)})
            .then(response=> this.successHandler(response,'delete'))
            .catch(err => this.errorHandler(err));
    }



    private getEndPoint(path = ''){
        return  this.rex.getEndPoint()+'Transaction/'+ path +'?'+this.rex.auth.buildUrl({instance:this.rex.auth.getCredential().instance})
    }


}
