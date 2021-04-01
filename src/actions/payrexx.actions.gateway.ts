import PayRexx from "../index";
import { DeleteResponse, PayrexxActions } from "./payrexx.actions";
import { payrexxCurrency } from './payrexx.currency';

const axios = require('axios');
const qs = require('qs');

// Request interface
export interface IGatewayCreate {
    amount:number
    //Amount of payment in cents.

    vatRate?:number
    //VAT Rate Percentage

    currency:payrexxCurrency
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

export type FieldOption = {
    "active":boolean,
    "mandatory":boolean
};

export type NamedFieldOption<T = any> = {
    "active":boolean,
    "mandatory":boolean
    "names":T
};

export interface IGatewayResponseFields {
    title:FieldOption;
    forename:FieldOption;
    surname:FieldOption;
    company:FieldOption;
    street:FieldOption;
    postcode:FieldOption;
    place:FieldOption;
    country:FieldOption;
    phone:FieldOption;
    email:FieldOption;
    text:FieldOption;
    "date_of_birth":NamedFieldOption
}

export interface IGatewayResponse {
    "id":number,
    "status"?:'waiting' | 'confirmed' | 'authorized' | 'reserved';
    "hash":string,
    "referenceId":string,
    "link":string,
    "invoices":any[],
    "preAuthorization":number,
    "fields":IGatewayResponseFields,
    "psp":any[],
    "pm":any [],
    "amount":number,
    "vatRate":number,
    "currency":string,
    "sku":string,
    "createdAt":number
}

export type GatewayStatus = "waiting" | "confirmed" | "authorized" | "reserved";

export class Gateway implements IGatewayResponse {

    amount:number;
    createdAt:number;
    currency:payrexxCurrency;
    fields:IGatewayResponseFields;
    hash:string;
    id:number;
    invoices:any[];
    link:string;
    pm:any[];
    preAuthorization:number;
    psp:any[];
    referenceId:string;
    sku:string;
    status:GatewayStatus;
    vatRate:number;

    private data:IGatewayResponse;

    constructor(data:IGatewayResponse, protected action:GatewayActions) {
        this.setData(data);
    }


    public hasId():boolean {
        return this.getId() !== undefined;
    }

    public getId() {
        return this.id;
    }

    /**
     * get the raw json data
     */
    public getData():IGatewayResponse {
        return this.data;
    }

    public async reload():Promise<this> {
        if (this.hasId()) {
            const data = await this.action.get(this.getId());
            this.setData(data);
        }
        return this;
    }

    public delete():Promise<DeleteResponse> {
        return this.action.delete(this.getId())
    }

    private setData(data:IGatewayResponse):void {
        this.data = data;
        this.initUsingData();
    }

    private initUsingData() {
        if (this.data) {
            Object.assign(this, this.data);
        }
    }
}

/**
 * This class represents all Gateway Actions
 * https://developers.payrexx.com/reference#gateway
 *
 * @2020 Weslley De Souza
 * */
export class GatewayActions extends PayrexxActions<IGatewayCreate, IGatewayResponse> {

    constructor(protected rex:PayRexx) {
        super()
    }

    get(id:number):Promise<Gateway> {
        let params = {}
        params['ApiSignature'] = this.rex.auth.buildSignature('')

        return axios.get(this.getEndPoint(`${id}/`) + '&' + qs.stringify(params))
            .then(response => this.successHandler(response, 'get', 0))
            .then((gateway) => new Gateway(gateway, this))
            .catch(err => this.errorHandler(err));
    }

    create(params:IGatewayCreate):Promise<Gateway> {
        if (!params.amount) {
            throw new Error('Amount required!')
        }
        let data = qs.stringify(params);
        params.ApiSignature = this.rex.auth.buildSignature(data);
        data = qs.stringify(params);

        return axios.post(this.getEndPoint(), data)
            .then(response => this.successHandler(response, 'create', 0))
            .then((gateway) => new Gateway(gateway, this))
            .catch(err => this.errorHandler(err))

    }

    delete(id:number):Promise<DeleteResponse> {
        let params = {};
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return axios.delete(this.getEndPoint(`${id}/`), {data: qs.stringify(params)})
            .then(response => this.successHandler(response, 'delete'))
            .catch(err => this.errorHandler(err));
    }

    private getEndPoint(path = '') {
        return this.rex.getEndPoint() + 'Gateway/' + path + '?' + this.rex.auth.buildUrl({instance: this.rex.auth.getCredential().instance})
    }

}
