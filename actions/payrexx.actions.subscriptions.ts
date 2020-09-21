import {IPayRex, ISubscription} from "../types";
import {PayrexxActions} from "./payrexx.actions";

var qs = require('qs');
var axios = require('axios');



/**
 * This class represents all Subscriptions Actions
 * https://developers.payrexx.com/reference#autologin
 * https://developers.payrexx.com/reference#subscription
 *
 * @2020 Weslley De Souza
 * */
export class SubscriptionsActions extends PayrexxActions{


    constructor(protected rex:IPayRex){
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


