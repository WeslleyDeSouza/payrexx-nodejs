import PayRexx from "../index";
import { DeleteResponse, PayrexxActions } from "./payrexx.actions";
import {payrexxTypesCurrency} from "../types/payrexx.types.currency";

const qs = require("qs");
const axios = require("axios");

// Request interface
export interface IPayCreation {
  title: string;
  //This is the page title which will be shown on the payment page.

  description: string;
  //This is a description which will be shown on the payment page.

  psp?: any;
  //The psp which should be used for the payment. (Can be an array of integers.)

  referenceId: string;
  //An internal reference id used by your system.

  purpose: string;
  //The purpose of the payment.

  amount: number;
  //The amount of the payment in cents.

  vatRate: number;
  //VAT rate percentage (double)

  currency: payrexxTypesCurrency;
  //The currency of the payment.

  sku?: string;
  //Product stock keeping unit

  preAuthorization?: boolean;
  //Whether charge payment manually at a later date (type authorization).

  reservation?: any;
  //Whether charge payment manually at a later date (type reservation).

  ApiSignature?: any;
}

export type FieldOption = {
  active: boolean;
  mandatory: boolean;
};

export type NamedFieldOption<T = any> = {
  active: boolean;
  mandatory: boolean;
  names: T;
};

type IPayLinkResponseFields = {
  title: FieldOption;
  forename: FieldOption;
  surname: FieldOption;
  company: FieldOption;
  street: FieldOption;
  postcode: FieldOption;
  place: FieldOption;
  country: FieldOption;
  phone: FieldOption;
  email: FieldOption;
  date_of_birth: FieldOption;
  terms: FieldOption;
  privacy_policy: FieldOption;
  custom_field_1: NamedFieldOption;
  custom_field_2: NamedFieldOption<boolean>;
  custom_field_3: NamedFieldOption<boolean>;
};

export type PayLinkStatus = "waiting" | "confirmed" | "authorized" | "reserved";

export interface IPayLinkResponse {
  id: number;
  hash: string;
  status?: PayLinkStatus;
  referenceId: string;
  link: string;
  invoices: any[];
  preAuthorization: number;
  reservation: number;
  name: string;
  api: boolean;
  fields: IPayLinkResponseFields;
  psp: number;
  pm: any[];
  purpose: string;
  amount: number;
  vatRate: number;
  currency: string;
  sku: string;
  subscriptionState: boolean;
  subscriptionInterval: string;
  subscriptionPeriod: string;
  subscriptionPeriodMinAmount: string;
  subscriptionCancellationInterval: string;
  createdAt: number;
}

export class Payment implements IPayLinkResponse {
  amount: number;
  api: boolean;
  createdAt: number;
  currency: payrexxTypesCurrency;
  fields: IPayLinkResponseFields;
  hash: string;
  id: number;
  invoices: any[];
  link: string;
  name: string;
  pm: any[];
  preAuthorization: number;
  psp: number;
  purpose: string;
  referenceId: string;
  reservation: number;
  sku: string;
  status: PayLinkStatus;
  subscriptionCancellationInterval: string;
  subscriptionInterval: string;
  subscriptionPeriod: string;
  subscriptionPeriodMinAmount: string;
  subscriptionState: boolean;
  vatRate: number;

  private data: IPayLinkResponse;

  constructor(data: IPayLinkResponse, protected action: PayLinkActions) {
    this.setData(data);
  }

  public hasId(): boolean {
    return this.getId() !== undefined;
  }

  public getId() {
    return this.id;
  }

  /**
   * get the raw json data
   */
  public getData(): IPayLinkResponse {
    return this.data;
  }

  public async reload(): Promise<this> {
    if (this.hasId()) {
      const data = await this.action.get(this.getId());
      this.setData(data);
    }
    return this;
  }

  public delete(): Promise<DeleteResponse> {
    return this.action.delete(this.getId());
  }

  private setData(data: IPayLinkResponse): void {
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
export class PayLinkActions extends PayrexxActions<
  IPayCreation,
  IPayLinkResponse
> {
  constructor(protected rex: PayRexx) {
    super();
  }

  /**
   * Retrieve a payment link
   * endpoint:  https://api.payrexx.com/v1.0/Invoice/id/
   * */
  public async get(id: number): Promise<Payment> {
    let params = {};
    params["ApiSignature"] = this.rex.auth.buildSignature("");
    const response = await axios.get(
      this.getEndPoint(`${id}/`) + "&" + qs.stringify(params)
    );
    const payloadData = response.data.data[0];
    return new Payment(payloadData, this);
  }

  /**
   * Create a payment link
   * @params :IPayCreation
   * TODO: return interface
   * */
  public async create(params: IPayCreation): Promise<Payment> {
    if (params.title && params.title.includes(" "))
      console.warn("Escape white spaces");

    let data = qs.stringify(params);
    params.ApiSignature = this.rex.auth.buildSignature(data);
    data = qs.stringify(params);

    const response = await axios.post(this.getEndPoint(), data);
    const payloadData = response.data.data[0];
    return new Payment(payloadData, this);
  }

  /**
   * Remove a payment link
   * */
  public async delete(id: number): Promise<DeleteResponse> {
    let params = {};
    params["ApiSignature"] = this.rex.auth.buildSignature("");
    const { data } = await axios.delete(this.getEndPoint(`${id}/`), {
      data: qs.stringify(params),
    });
    return data;
  }

  private getEndPoint(path: string = "", hasInstance: boolean = true) {
    let credentials = hasInstance ? `?${this.getCredentialsParams()}` : "";
    return `${this.rex.getEndPoint()}Invoice/${path}${credentials}`;
  }

  private getCredentialsParams() {
    const instance = this.rex.auth.getCredential().instance;
    return this.rex.auth.buildUrl({
      instance,
    });
  }
}
