import {IGatewayCreate, IPayRex} from "../types";
import {PayrexxActions} from "./payrexx.actions";
var qs = require('qs');
var axios = require('axios');





/**
 * This class represents all Gateway Actions
 * https://developers.payrexx.com/reference#gateway
 *
 * @2020 Weslley De Souza
 * */
export class GatewayActions extends PayrexxActions{


    constructor(protected rex:IPayRex){
        super()
    }

    get(id:number){
        let params = {}
        params['ApiSignature'] = this.rex.auth.buildSignature('')

        return   axios.get (this.getEndPoint(`${id}/`)+'&'+qs.stringify(params))
            .then(response=> this.successHandler(response,'get'))
            .catch(err => this.errorHandler(err));
    }

    create(params:IGatewayCreate):Promise<any[]>{
        if (!params.amount) {
            throw new Error('Amount required!')
        }
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
        return  this.rex.getEndPoint()+'Gateway/'+ path +'?'+this.rex.auth.buildUrl({instance:this.rex.auth.getCredential().instance})
    }

}
