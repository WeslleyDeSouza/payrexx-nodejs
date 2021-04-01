import PayRexx from "../index";
import { DeleteResponse, PayrexxActions } from "./payrexx.actions";
import { payrexxCurrency } from './payrexx.currency';

const qs = require('qs');
const axios = require('axios');

// Request interface
export interface IPayCreation {

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

    currency:payrexxCurrency
    //The currency of the payment.

    sku?:string
    //Product stock keeping unit

    preAuthorization?:boolean
    //Whether charge payment manually at a later date (type authorization).

    reservation?:any
    //Whether charge payment manually at a later date (type reservation).

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

type IPayLinkResponseFields = {
    "title":FieldOption,
    "forename":FieldOption,
    "surname":FieldOption,
    "company":FieldOption,
    "street":FieldOption,
    "postcode":FieldOption,
    "place":FieldOption,
    "country":FieldOption,
    "phone":FieldOption,
    "email":FieldOption,
    "date_of_birth":FieldOption,
    "terms":FieldOption,
    "privacy_policy":FieldOption,
    "custom_field_1":NamedFieldOption,
    "custom_field_2":NamedFieldOption<boolean>,
    "custom_field_3":NamedFieldOption<boolean>
};

export type PayLinkStatus = 'waiting' | 'confirmed' | 'authorized' | 'reserved';

export interface IPayLinkResponse {
    "id":number;
    "hash":string;
    "status"?:PayLinkStatus;
    "referenceId":string;
    "link":string;
    "invoices":any[];
    "preAuthorization":number;
    "reservation":number;
    "name":string,
    "api":boolean,
    "fields":IPayLinkResponseFields,
    "psp":number,
    "pm":any[],
    "purpose":string,
    "amount":number,
    "vatRate":number,
    "currency":string,
    "sku":string,
    "subscriptionState":boolean,
    "subscriptionInterval":string,
    "subscriptionPeriod":string,
    "subscriptionPeriodMinAmount":string,
    "subscriptionCancellationInterval":string,
    "createdAt":number
}

export class Payment implements IPayLinkResponse {

    amount:number;
    api:boolean;
    createdAt:number;
    currency:payrexxCurrency;
    fields:{ title:{ active:boolean; mandatory:boolean }; forename:{ active:boolean; mandatory:boolean }; surname:{ active:boolean; mandatory:boolean }; company:{ active:boolean; mandatory:boolean }; street:{ active:boolean; mandatory:boolean }; postcode:{ active:boolean; mandatory:boolean }; place:{ active:boolean; mandatory:boolean }; country:{ active:boolean; mandatory:boolean }; phone:{ active:boolean; mandatory:boolean }; email:{ active:boolean; mandatory:boolean }; date_of_birth:{ active:boolean; mandatory:boolean }; terms:{ active:boolean; mandatory:boolean }; privacy_policy:{ active:boolean; mandatory:boolean }; custom_field_1:{ active:boolean; mandatory:boolean; names:any }; custom_field_2:{ active:boolean; mandatory:boolean; names:boolean }; custom_field_3:{ active:boolean; mandatory:boolean; names:boolean } };
    hash:string;
    id:number;
    invoices:any[];
    link:string;
    name:string;
    pm:any[];
    preAuthorization:number;
    psp:number;
    purpose:string;
    referenceId:string;
    reservation:number;
    sku:string;
    status:"waiting" | "confirmed" | "authorized" | "reserved";
    subscriptionCancellationInterval:string;
    subscriptionInterval:string;
    subscriptionPeriod:string;
    subscriptionPeriodMinAmount:string;
    subscriptionState:boolean;
    vatRate:number;

    private data:IPayLinkResponse;

    constructor(data:IPayLinkResponse, protected action:PayLinkActions) {
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
    public getData():IPayLinkResponse {
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

    private setData(data:IPayLinkResponse):void {
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
 * This class represents all PayLink Actions
 * https://developers.payrexx.com/reference#invoices-1
 *
 * @2020 Weslley De Souza
 * */
export class PayLinkActions extends PayrexxActions<IPayCreation, IPayLinkResponse> {

    constructor(protected rex:PayRexx) {
        super()
    }

    /**
     * Retrieve a payment link
     * endpoint:  https://api.payrexx.com/v1.0/Invoice/id/
     * */
    public get(id:number):Promise<Payment> {
        let params = {};
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return axios.get(this.getEndPoint(`${id}/`) + '&' + qs.stringify(params))
            .then(response => this.successHandler(response, 'get'))
            .then(payment => new Payment(payment, this))
            .catch(err => this.errorHandler(err));
    }

    /**
     * Create a payment link
     * @params :IPayCreation
     * TODO: return interface
     * */
    public create(params:IPayCreation):Promise<Payment> {

        if (params.title && params.title.includes(' '))
            console.warn('Escape white spaces')

        let data = qs.stringify(params);
        params.ApiSignature = this.rex.auth.buildSignature(data);
        data = qs.stringify(params);

        return axios.post(this.getEndPoint(), data)
            .then(response => this.successHandler(response, 'create', 0))
            .then(payment => new Payment(payment, this))
            .catch(err => this.errorHandler(err))

    }

    /**
     * Remove a payment link
     * */
    public delete(id:number):Promise<DeleteResponse> {
        let params = {};
        params['ApiSignature'] = this.rex.auth.buildSignature('');
        return axios.delete(this.getEndPoint(`${id}/`), {data: qs.stringify(params)})
            .then(response => this.successHandler(response, 'delete'))
            .catch(err => this.errorHandler(err));

    }

    private getEndPoint(path:string = '', instance:boolean = true) {
        return this.rex.getEndPoint() + 'Invoice/' + path
            + (instance ? ('?' + this.rex.auth.buildUrl({instance: this.rex.auth.getCredential().instance})) : '')
    }

}
