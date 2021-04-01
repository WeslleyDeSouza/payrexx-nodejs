import PayRexx from "../index";
import { PayrexxActions } from "./payrexx.actions";
import { payrexxCurrency } from "./payrexx.currency";

const axios = require("axios");
const qs = require("qs");

export interface ISubscription {
  userId: string;
  //The contact id you got from webhook.

  psp: string;
  //The ID of the psp to use.

  amount: string;
  //The amount of the payment to fire in cents.

  currency: payrexxCurrency;
  //The ISO code of the currency of the payment.

  purpose: string;
  //The payment purpose. What is the payer paying for?

  paymentInterval: string;
  //The payment interval as string. (see PHP documentation of date interval for format)

  period: string;
  //The subscription's period as string. (see PHP documentation of date interval for format)

  cancellationInterval: string;
  //The interval of cancellation as string. (see PHP documentation of date interval for format)

  referenceId?: string;
  //The internal reference id. (Will be sent back with Webhook, can be used as identification)

  ApiSignature?: any;
}

export interface ISubscriptionResponse {
  id: number;
  status: string;
  start: string;
  end: boolean;
  valid_until: string;
  invoice: {
    number: string;
    amount: number;
    currency: string;
    referenceId: string;
    paymentRequestId: any;
    paymentLink: string;
  };
  contact: {
    id: number;
    title: string;
    firstname: string;
    lastname: string;
    company: string;
    street: string;
    zip: string;
    place: string;
    country: string;
    countryISO: string;
    phone: string;
    email: string;
    date_of_birth: string;
  };
}

/**
 * This class represents all Subscriptions Actions
 * https://developers.payrexx.com/reference#autologin
 * https://developers.payrexx.com/reference#subscription
 *
 * @2020 Weslley De Souza
 * */
export class SubscriptionsActions extends PayrexxActions<
  ISubscription,
  ISubscriptionResponse
> {
  constructor(protected rex: PayRexx) {
    super();
  }

  async log(id) {
    let params = { userId: id };
    params["ApiSignature"] = this.rex.auth.buildSignature(qs.stringify(params));

    const response = await axios.post(this.getEndPoint(), qs.stringify(params));
    return response.data.data[0];
  }

  async get(id: number): Promise<ISubscriptionResponse> {
    let params = {};
    params["ApiSignature"] = this.rex.auth.buildSignature("");

    const response = await axios.get(
      this.getEndPoint(`${id}/`) + "&" + qs.stringify(params)
    );
    return response.data.data[0];
  }

  async create(params: ISubscription): Promise<ISubscriptionResponse> {
    let data = qs.stringify(params);
    params.ApiSignature = this.rex.auth.buildSignature(data);
    data = qs.stringify(params);

    const response = await axios.post(this.getEndPoint(), data);
    return response.data.data[0];
  }

  async delete(id: number) {
    let params = {};
    params["ApiSignature"] = this.rex.auth.buildSignature("");
    const { data } = await axios.delete(this.getEndPoint(`${id}/`), {
      data: qs.stringify(params),
    });
    return data;
  }

  private getEndPoint(path = "") {
    return `${this.rex.getEndPoint()}AuthToken/${path}?${this.rex.auth.buildUrl(
      {
        instance: this.rex.auth.getCredential().instance,
      }
    )}`;
  }
}
