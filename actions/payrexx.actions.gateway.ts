import PayRexx from "../index";
import {PayrexxActions} from "./payrexx.actions";

const axios = require('axios');
const qs    = require('qs');

// Request interface
interface IGatewayCreate {
    amount:number
    //Amount of payment in cents.

    vatRate?:number
    //VAT Rate Percentage

    currency: string
    //Currency of payment (ISO code).

    sku?:string
    //Product stock keeping unit

    purpose?:string
    //The purpose of the payment.

    successRedirectUrl?:string

    //URL to redirect to after successful payment.

    failedRedirectUrl?:string
    //URL to redirect to after failed payment.

    cancelRedirectUrl?:string
    //URL to redirect to after manual cancellation by shopper.

    psp?:number[];
    //List of PSPs to provide for payment. If empty all available PSPs are provied.


    pm?:string[];
    //List of payment mean names to display


    preAuthorization?:boolean
    //Whether charge payment manually at a later date (type authorization)

    chargeOnAuthorization?:boolean
    //preAuthorization needs to be "true". This will charge the authorization during the first payment.

    reservation?:any
    //Whether charge payment manually at a later date (type reservation)

    referenceId?:string
    //An internal reference id used by your system.

    fields?:string
    //The contact data fields which should be stored along with payment

    concardisOrderId?:string
    //Only available for Concardis PSP and if the custom ORDERID option is activated in PSP settings in Payrexx administration. This ORDERID will be transferred to the Payengine.

    skipResultPage?:string
    //Skip result page and directly redirect to success or failed URL

    validity?:number
    //Gateway validity in minutes.

    buttonText?:string
    //Custom pay button text.

    successMessage?:string
    //Custom success message on result page.

    ApiSignature?:any
}
interface IGatewayResponse  {
    "id":number,
    "status"?: 'waiting' | 'confirmed' | 'authorized' | 'reserved';
    "hash":string,
    "referenceId":string,
    "link":string,
    "invoices":any[],
    "preAuthorization":number,
    "fields":{
        "title":{
            "active":boolean,
            "mandatory":boolean
        },
        "forename":{
            "active":boolean,
            "mandatory":boolean
        },
        "surname":{
            "active":boolean,
            "mandatory":boolean
        },
        "company":{
            "active":boolean,
            "mandatory":boolean
        },
        "street":{
            "active":boolean,
            "mandatory":boolean
        },
        "postcode":{
            "active":boolean,
            "mandatory":boolean
        },
        "place":{
            "active":boolean,
            "mandatory":boolean
        },
        "country":{
            "active":boolean,
            "mandatory":boolean
        },
        "phone":{
            "active":boolean,
            "mandatory":boolean
        },
        "email":{
            "active":boolean,
            "mandatory":boolean
        },
        "date_of_birth":{
            "active":boolean,
            "mandatory":boolean,
            "names":any
        },
        "text":{
            "active":boolean,
            "mandatory":boolean,
            "names":any
        }
    },
    "psp":any[],
    "pm":any [],
    "amount":number,
    "vatRate":number,
    "currency":string,
    "sku":string,
    "createdAt":number
}

class Gateway implements IGatewayResponse {

    amount: number;
    createdAt: number;
    currency: string;
    fields: { title: { active: boolean; mandatory: boolean }; forename: { active: boolean; mandatory: boolean }; surname: { active: boolean; mandatory: boolean }; company: { active: boolean; mandatory: boolean }; street: { active: boolean; mandatory: boolean }; postcode: { active: boolean; mandatory: boolean }; place: { active: boolean; mandatory: boolean }; country: { active: boolean; mandatory: boolean }; phone: { active: boolean; mandatory: boolean }; email: { active: boolean; mandatory: boolean }; date_of_birth: { active: boolean; mandatory: boolean; names: any }; text: { active: boolean; mandatory: boolean; names: any } };
    hash: string;
    id: number;
    invoices: any[];
    link: string;
    pm: any[];
    preAuthorization: number;
    psp: any[];
    referenceId: string;
    sku: string;
    status: "waiting" | "confirmed" | "authorized" | "reserved";
    vatRate: number;

    constructor(params ,protected action:GatewayActions) {
        params ?
            this.initialise(params):
            null
    }

    private initialise(params){
        for(let k in params){
            this[k] = params[k];
        }
        return this;
    }

    public getId(){
        return this.id;
    }

    public reload(){
        return new Promise(resolve => {
            !this.id ? resolve(this)
                : this.action.get(this.id)
                    .then(this.initialise)
                    .then(resolve)
        })
    }

    public delete(){
        return this.action.delete(this.getId())
    }
}


/**
 * This class represents all Gateway Actions
 * https://developers.payrexx.com/reference#gateway
 *
 * @2020 Weslley De Souza
 * */
export class GatewayActions extends PayrexxActions{

    constructor(protected rex:PayRexx){
        super()
    }

    get(id:number):Promise<Gateway>{
        let params = {}
        params['ApiSignature'] = this.rex.auth.buildSignature('')

        return   axios.get (this.getEndPoint(`${id}/`)+'&'+qs.stringify(params))
            .then(response=> this.successHandler(response,'get',0))
             .then((gateway)=>new Gateway(gateway,this))
              .catch(err => this.errorHandler(err));
    }

    create(params:IGatewayCreate):Promise<Gateway>{
        if (!params.amount) {
            throw new Error('Amount required!')
        }
        let data             =  qs.stringify(params);
        params.ApiSignature  = this.rex.auth.buildSignature(data);
        data                 = qs.stringify(params);

        return   axios.post (this.getEndPoint(),  data)
            .then(response=>this.successHandler(response,'create',0))
            .then((gateway)=>new Gateway(gateway,this))
            .catch(err=> this.errorHandler(err))

    }

    delete(id:number):Promise<{ "status": string, "data": [ { "id": number } ] }>{
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